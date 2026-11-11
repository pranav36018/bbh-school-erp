import { UserSessionPayload } from "./types";

export interface TenantContext {
  institutionId?: string;
  groupId?: string;
  campusId?: string;
  isPlatformOwner: boolean;
  isDirector: boolean;
}

/**
 * Derives verified tenant scoping context from authenticated session.
 * NEVER trust institutionId passed from client query parameters or request bodies.
 */
export function getTenantContext(session: UserSessionPayload): TenantContext {
  const isPlatformOwner = session.role === "PLATFORM_OWNER";
  const isDirector = session.role === "DIRECTOR";

  return {
    institutionId: session.institutionId || undefined,
    groupId: session.groupId || undefined,
    campusId: session.campusId || undefined,
    isPlatformOwner,
    isDirector,
  };
}

/**
 * Enforces that non-platform-owner users can only query their own institution.
 */
export function enforceTenantFilter(
  session: UserSessionPayload,
  requestedInstitutionId?: string
): { institutionId: string } {
  // If user is Platform Owner, they may query any institution if specified
  if (session.role === "PLATFORM_OWNER") {
    if (!requestedInstitutionId && !session.institutionId) {
      throw new Error("Institution ID is required for this operation.");
    }
    return { institutionId: requestedInstitutionId || (session.institutionId as string) };
  }

  // Directors may access institutions within their group; for single-school scope, use assigned school
  if (!session.institutionId) {
    throw new Error("Unauthorized: Session is not associated with any active institution.");
  }

  // If a specific institution is requested, verify the user belongs to it
  if (requestedInstitutionId && requestedInstitutionId !== session.institutionId && !session.groupId) {
    throw new Error("Security Violation: Access to cross-tenant institution data is forbidden.");
  }

  return { institutionId: session.institutionId };
}

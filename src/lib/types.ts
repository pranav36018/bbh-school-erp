// Core Domain & Session Types for India Unified School ERP

export type PortalType = "director" | "admin" | "teacher" | "student";

export type RoleType =
  | "PLATFORM_OWNER"
  | "DIRECTOR"
  | "SCHOOL_ADMIN"
  | "TEACHER"
  | "STUDENT"
  | "PARENT"
  | "ACCOUNTANT"
  | "LIBRARIAN"
  | "STAFF";

export interface UserSessionPayload {
  userId: string;
  humanId: string;
  email: string;
  role: RoleType;
  institutionId?: string | null;
  groupId?: string | null;
  campusId?: string | null;
  firstName: string;
  lastName: string;
}

export interface BoardGradingRule {
  grade: string;
  minPercentage: number;
  maxPercentage: number;
  gradePoint: number;
  description: string;
}

export interface BoardConfigSchema {
  boardType: string;
  version: string;
  gradingRules: BoardGradingRule[];
  assessmentPattern: {
    terms: {
      name: string;
      weightage: number;
      components: { name: string; maxMarks: number }[];
    }[];
  };
  languageScheme: {
    firstLanguage: string[];
    secondLanguage: string[];
    thirdLanguage: string[];
  };
  coScholasticCriteria?: {
    activities: string[];
    gradingScale: string[];
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

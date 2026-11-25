import LoginForm from "@/components/auth/LoginForm";

export default function StateDirectorLoginPage() {
  return (
    <LoginForm
      portal="director"
      title="State Director Portal"
      subtitle="Karnataka State Board Multi-Campus Trust Governance"
      badge="Executive MD & Trustees"
      themeColor="amber"
      board="state"
    />
  );
}

import LoginForm from "@/components/auth/LoginForm";

export default function DirectorLoginPage() {
  return (
    <LoginForm
      portal="director"
      title="Director Executive Portal"
      subtitle="Multi-Institution Strategic Governance & Group Analytics"
      badge="Executive Login"
      themeColor="amber"
      defaultEmail="director@indiaunifiederp.edu.in"
      defaultPass="Director@2026"
    />
  );
}

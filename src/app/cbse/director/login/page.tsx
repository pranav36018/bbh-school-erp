import LoginForm from "@/components/auth/LoginForm";

export default function CBSEDirectorLoginPage() {
  return (
    <LoginForm
      portal="director"
      title="CBSE Director Portal"
      subtitle="CBSE Multi-Campus Governance & Academic Benchmarking"
      badge="Executive MD & Trustees"
      themeColor="amber"
      board="cbse"
    />
  );
}

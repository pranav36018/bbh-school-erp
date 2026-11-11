import LoginForm from "@/components/auth/LoginForm";

export default function AdminLoginPage() {
  return (
    <LoginForm
      portal="admin"
      title="School Admin Portal"
      subtitle="Campus Management, Admissions, Staff & Fee Operations"
      badge="Administrative Login"
      themeColor="blue"
      defaultEmail="admin.dps@indiaunifiederp.edu.in"
      defaultPass="Admin@2026"
    />
  );
}

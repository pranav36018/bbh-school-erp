import LoginForm from "@/components/auth/LoginForm";

export default function StateAdminLoginPage() {
  return (
    <LoginForm
      portal="admin"
      title="State School Admin Portal"
      subtitle="KSEAB Admissions, State CCE Grading & Staff Management"
      badge="State Board Principal & Admin"
      themeColor="emerald"
      board="state"
    />
  );
}

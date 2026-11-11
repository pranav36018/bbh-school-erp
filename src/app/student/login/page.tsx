import LoginForm from "@/components/auth/LoginForm";

export default function StudentLoginPage() {
  return (
    <LoginForm
      portal="student"
      title="Student & Parent Portal"
      subtitle="Digital ID, Timetable, Academic Progress & UPI Fee Payments"
      badge="Student Login"
      themeColor="purple"
      defaultEmail="student.aarav@indiaunifiederp.edu.in"
      defaultPass="Student@2026"
    />
  );
}

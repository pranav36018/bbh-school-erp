import LoginForm from "@/components/auth/LoginForm";

export default function StateStudentLoginPage() {
  return (
    <LoginForm
      portal="student"
      title="State Student & Parent Portal"
      subtitle="CCE Progress Reports, SSLC Preparation & Timetables"
      badge="State Board Students & Guardians"
      themeColor="purple"
      board="state"
    />
  );
}

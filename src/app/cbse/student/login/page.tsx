import LoginForm from "@/components/auth/LoginForm";

export default function CBSEStudentLoginPage() {
  return (
    <LoginForm
      portal="student"
      title="CBSE Student & Parent Portal"
      subtitle="CBSE 9-Point Grade Cards, Class Timetable & Live Transit GPS"
      badge="CBSE Students & Guardians"
      themeColor="purple"
      board="cbse"
    />
  );
}

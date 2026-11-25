import LoginForm from "@/components/auth/LoginForm";

export default function TeacherLoginPage() {
  return (
    <LoginForm
      portal="teacher"
      title="Teacher Academic Portal"
      subtitle="Classroom Schedule, Attendance, Marks & AI Lesson Diary"
      badge="Faculty Login"
      themeColor="emerald"
    />
  );
}

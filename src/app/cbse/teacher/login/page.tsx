import LoginForm from "@/components/auth/LoginForm";

export default function CBSETeacherLoginPage() {
  return (
    <LoginForm
      portal="teacher"
      title="CBSE Teacher Portal"
      subtitle="NCERT Syllabus, Periodic Assessments & AI Teaching Diary"
      badge="CBSE Faculty"
      themeColor="blue"
      board="cbse"
    />
  );
}

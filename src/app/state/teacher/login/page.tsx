import LoginForm from "@/components/auth/LoginForm";

export default function StateTeacherLoginPage() {
  return (
    <LoginForm
      portal="teacher"
      title="State Teacher Portal"
      subtitle="Kannada First Language, Core Subject Assessments & Diary"
      badge="State Board Faculty"
      themeColor="emerald"
      board="state"
    />
  );
}

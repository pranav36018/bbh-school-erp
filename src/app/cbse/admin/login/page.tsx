import LoginForm from "@/components/auth/LoginForm";

export default function CBSEAdminLoginPage() {
  return (
    <LoginForm
      portal="admin"
      title="CBSE School Admin Portal"
      subtitle="CBSE Affiliation 830680, Registrar & Examination Operations"
      badge="CBSE Principal & Admin"
      themeColor="blue"
      board="cbse"
    />
  );
}

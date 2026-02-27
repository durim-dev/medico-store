import { LoginForm } from "@/components/login-form";

export default async function Page() {
  return (
    <div className="flex md:min-h-200 w-full items-center justify-center md:p-6 ">
      <div className="container py-6 md:px-6 md:py-12 max-w-md mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}

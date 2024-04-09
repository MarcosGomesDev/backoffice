import { AuthService } from "@/services/auth.service";

export default function Home() {
  const authService = new AuthService();
  const user = authService.getUser();

  return (
    <>
      <h1>Home</h1>
    </>
  );
}

import { cookies } from "next/headers";

export class AuthService {
  async login(input: { email: string; password: string }) {
    const response = await fetch(`${process.env.BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: input.email,
        password: input.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      return { error: "Credenciais inválidas" };
    }

    if (!response.ok) {
      const error = await response.json();

      return { error };
    }

    const data = await response.json();

    const cookieStore = cookies();
    //cookie criptografado
    cookieStore.set("token", data.access_token);
    cookieStore.set("user", JSON.stringify(data.user));
  }

  logout() {
    const cookieStore = cookies();
    cookieStore.delete("token");
    cookieStore.delete("user");
  }

  getUser() {
    const cookieStore = cookies();
    const user = cookieStore.get("user")?.value;

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }

  getToken() {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    return token;
  }

  isTokenExpired() {
    const user = this.getUser();

    if (!user) {
      return true;
    }

    const now = new Date();
    const exp = new Date(user.exp * 1000);

    return now > exp;
  }
}

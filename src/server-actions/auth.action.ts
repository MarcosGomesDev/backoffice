"use server";

import { LoginForm } from "@/app/(withoutLayout)/login/components/formSchema";
import { redirect } from "next/navigation";
import { AuthService } from "../services/auth.service";

export async function loginAction(form: LoginForm) {
  const { email, password, redirect_to } = form;

  const authService = new AuthService();

  const error = await authService.login({ email, password });

  if (error) {
    return {
      error: error,
    };
  }

  redirect(redirect_to || "/");
}

export async function logoutAction() {
  const authService = new AuthService();
  authService.logout();
  redirect("/login");
}

import { z } from "zod";

export interface LoginForm {
  email: string;
  password: string;
  redirect_to: string;
}

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email é obrigatório",
    })
    .email({
      message: "Email inválido",
    }),
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(1, {
      message: "Senha é obrigatória",
    }),
  redirect_to: z.string().default("/"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

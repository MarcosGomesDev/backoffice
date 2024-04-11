"use client";

import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/float-input";
import { FloatingLabelInputPassword } from "@/components/ui/float-input-password";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { loginAction } from "@/server-actions/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginForm, loginSchema } from "./formSchema";

export function Form({ redirect_to }: { redirect_to: string }) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorTimeout = setTimeout(() => {
        clearErrors();
      }, 10000);

      return () => clearTimeout(errorTimeout);
    }
  }, [errors, clearErrors]);

  const clientAction = async (formData: LoginForm) => {
    setIsLoading(true);
    const response = await loginAction(formData);

    if (response?.error) {
      toast({
        title: "Uh oh! Algo deu errado",
        description: response.error.error.message,
        variant: "destructive",
      });

      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <form
      className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0"
      onSubmit={handleSubmit(clientAction)}
    >
      <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
        <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
          Login
        </h2>
        <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
          Apenas alguns clicks para gerenciar sua loja.
        </div>
        <div className="mt-8 intro-x">
          <Input
            type="hidden"
            value={redirect_to}
            {...register("redirect_to")}
          />

          <FloatingLabelInput
            id="email"
            label="Email"
            type="email"
            error={errors.email}
            {...register("email")}
          />
          <div className="my-2 text-red-500 text-xs">
            {errors.email?.message ?? ""}
          </div>
          <FloatingLabelInputPassword
            id="password"
            label="Senha"
            register={{ ...register("password") }}
            error={errors.password}
          />
          <div className="mt-2 text-red-500 text-xs">
            {errors.password?.message ?? ""}
          </div>
        </div>
        <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
          <a href="">Esqueceu sua senha?</a>
        </div>
        <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
          <Button
            className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
            type="submit"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </div>
      </div>
    </form>
  );
}

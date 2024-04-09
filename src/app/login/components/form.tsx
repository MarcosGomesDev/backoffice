"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { loginAction } from "@/server-actions/auth.action";
import { LoginForm, loginSchema } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function Form({ redirect_to }: { redirect_to: string }) {
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

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
          <Input
            type="text"
            className={twMerge([
              "block px-4 py-3 intro-x login__input min-w-full xl:min-w-[350px] outline-none focus-visible:!ring-0 focus:!ring-0 !ring-0 !ring-offset-0 focus:border-slate-600",
              errors.email ? "border-red-500 focus:border-red-500" : "",
            ])}
            placeholder="Email"
            {...register("email")}
          />
          <div className="my-2 text-red-500 text-xs">
            {errors.email?.message ?? ""}
          </div>

          <div
            className={twMerge([
              "flex  intro-x login__input min-w-full xl:min-w-[350px] outline-none rounded-md border border-input mt-5 focus-within:border-slate-600",
              errors.password
                ? "border-red-500 focus-within:border-red-500"
                : "",
            ])}
          >
            <Input
              type={showPassword ? "text" : "password"}
              className="flex-1 bg-transparent outline-none focus-visible:!ring-0 focus:!ring-0 !ring-0 !ring-offset-0 border-0 px-4 py-3"
              placeholder="Senha"
              {...register("password")}
            />

            <Button
              type="button"
              variant="ghost"
              className="hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <>
                  <EyeOff
                    className={twMerge([
                      "size-5 text-muted-foreground dark:text-slate-500",
                      errors.password ? "text-red-500" : "",
                    ])}
                  />
                </>
              ) : (
                <>
                  <EyeIcon
                    className={twMerge([
                      "size-5 text-muted-foreground dark:text-slate-500",
                      errors.password ? "text-red-500" : "",
                    ])}
                  />
                </>
              )}
            </Button>
          </div>
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

import { AuthService } from "@/services/auth.service";
import Image from "next/image";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import illustrationUrl from "../../../../public/illustration.svg";
import logoUrl from "../../../../public/logo.svg";
import { Form } from "./components/form";

async function Login({
  searchParams,
}: {
  searchParams: { redirect_to?: string };
}) {
  const { redirect_to = "/" } = searchParams;

  const authService = new AuthService();
  const user = authService.getUser();

  if (user && !authService.isTokenExpired()) {
    redirect(redirect_to);
  }

  return (
    <>
      <div
        className={twMerge([
          "w-full -m-3 sm:-mx-8 p-3 sm:px-8 relative h-full lg:overflow-hidden bg-primary xl:bg-white dark:bg-background",
          "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-slate-400",
          "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-slate-700",
        ])}
      >
        {/* <DarkModeSwitcher />
        <MainColorSwitcher /> */}
        <div className="container relative z-10 sm:px-10">
          <div className="block grid-cols-2 gap-4 xl:grid">
            {/* BEGIN: Login Info */}
            <div className="flex-col hidden min-h-screen xl:flex">
              <a href="" className="flex items-center pt-5 -intro-x">
                <Image
                  alt="Logo BackOfficeX"
                  className="size-12"
                  src={logoUrl}
                />
                <span className="ml-3 text-lg text-white"> BackOfficeX </span>
              </a>
              <div className="my-auto">
                <Image
                  alt="Illustration BackOfficeX"
                  className="w-1/2 -mt-16 -intro-x"
                  src={illustrationUrl}
                />
                <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                  Apenas alguns clicks para <br />
                  gerenciar sua loja.
                </div>
                <div className="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400 w-9/12">
                  Potencializando seu E-commerce, Cuidando dos Bastidores para
                  seu Sucesso!
                </div>
              </div>
            </div>

            <Form redirect_to={redirect_to} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

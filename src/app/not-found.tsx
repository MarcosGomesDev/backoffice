"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  return (
    <div className="flex justify-center h-screen px-12 w-full py-28">
      <Image src="/error.svg" alt="Error" width={500} height={500} />
      <div className="flex flex-col h-full ml-8 px-8">
        <h2 className="text-6xl pb-5">Ops!</h2>
        <div className="h-4 text-8xl font-bold pb-12">404</div>
        <p className="mb-8 text-4xl mt-20">
          Você tentou acessar uma página que se perdeu pelo caminho.
        </p>
        <span className="text-xl">
          A página que você tentou acessar não existe mais, mas você pode
          começar um novo caminho voltando para a página inicial :)
        </span>

        <Button className="w-36 mt-6" onClick={() => router.push("/")}>
          Voltar ao início
        </Button>
      </div>
    </div>
  );
}

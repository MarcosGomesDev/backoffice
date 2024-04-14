// "use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import DarkModeSwitcher from "../DarkModeSwitcher";
import { Separator } from "../ui/separator";
import { MenuList } from "./components/menu-list";
import { MenuMobile } from "./mobile";

export function Menu({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-2">
      <DarkModeSwitcher />
      <MenuMobile />
      <div className="flex mt-[4.7rem] md:mt-0">
        <nav className="pr-5 pb-16 overflow-x-hidden hidden md:block w-[85px] xl:w-[230px]">
          <Link href="/" className="flex items-center pt-4 pl-5 intro-x">
            <Image src="/logo.svg" width={48} height={48} alt="logo" priority />
            <span className="hidden ml-2 text-lg text-slate-700 dark:text-white xl:flex">
              BackOfficeX
            </span>
          </Link>
          <Separator className="my-6 z-10 h-px relative w-full bg-slate-300 dark:bg-white/10" />
          <MenuList />
        </nav>
        <div className="rounded-[30px] mt-3 min-w-0 min-h-screen flex-1 pb-10 bg-slate-200 dark:bg-slate-700 px-4 md:px-[22px] max-w-full md:max-w-auto before:content-[''] before:w-full before:h-px before:block">
          {children}
        </div>
      </div>
    </div>
  );
}

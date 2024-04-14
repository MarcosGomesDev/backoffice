"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MenuMobileList } from "./components/menu-mobile-list";

export function MenuMobile() {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  return (
    <div className="md:hidden">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <div className="w-full flex items-center justify-between border-b border-slate-300 dark:border-white/10 pb-2">
          <Image src="/logo.svg" width={48} height={48} alt="logo" priority />
          <SheetTrigger>
            <Menu className="size-8 dark:text-white transform text-slate-800" />
          </SheetTrigger>
        </div>

        <SheetContent side={"left"} className="px-0 h-screen">
          <ScrollArea className="mt-4 h-full w-full">
            <MenuMobileList setActiveMobileMenu={setSheetOpen} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

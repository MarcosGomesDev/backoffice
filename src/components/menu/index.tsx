"use client";

import { useAppSelector } from "@/stores/hooks";
import { selectSideMenu } from "@/stores/sideMenuSlice";
import clsx from "clsx";
import * as lucideIcons from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import DarkModeSwitcher from "../DarkModeSwitcher";
import { Separator } from "../ui/separator";
import { MenuItem } from "./components/menu-item";
import { enter, leave, nestedMenu } from "./side-menu";

export const { createLucideIcon, ...icons } = lucideIcons;

type Icon = keyof typeof icons;

interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

interface FormattedMenu extends Menu {
  active?: boolean;
  activeDropdown?: boolean;
  subMenu?: FormattedMenu[];
}

export function Menu({ children }: { children: React.ReactNode }) {
  const location = usePathname();

  const { theme, setTheme } = useTheme();

  const darkMode = theme === "dark";

  const [formattedMenu, setFormattedMenu] = useState<
    Array<FormattedMenu | "divider">
  >([]);

  const sideMenuStore = useAppSelector(selectSideMenu);
  const sideMenu = () =>
    nestedMenu(sideMenuStore, {
      pathname: location,
    });

  useEffect(() => {
    setFormattedMenu(sideMenu());
  }, [sideMenuStore, location]);

  return (
    <div className="py-2">
      <DarkModeSwitcher />
      <div className="flex mt-[4.7rem] md:mt-0">
        <nav className="pr-5 pb-16 overflow-x-hidden hidden md:block w-[85px] xl:w-[230px]">
          <Link href="/" className="flex items-center pt-4 pl-5 intro-x">
            <Image
              src={darkMode ? "/logo.svg" : "/logo-blue.svg"}
              alt="logo"
              width={40}
              height={40}
            />
            <span className="hidden ml-2 text-lg text-slate-700 dark:text-white xl:flex">
              BackOfficeX
            </span>
          </Link>
          <Separator className="my-6 z-10 h-px relative w-full bg-slate-300 dark:bg-white/10" />
          <ul>
            {formattedMenu.map((menu, menuKey) =>
              menu === "divider" ? (
                <Separator
                  className={clsx([
                    "my-6 z-10 h-px relative w-full bg-slate-300 dark:bg-white/10",
                    // Animation
                    `opacity-0 animate-[0.4s_ease-in-out_0.1s_intro-divider] animate-fill-mode-forwards animate-delay-${
                      (menuKey + 1) * 10
                    }`,
                  ])}
                  key={menuKey}
                />
              ) : (
                <li key={menuKey}>
                  <MenuItem
                    className={clsx({
                      // Animation
                      [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                        (menuKey + 1) * 10
                      }`]: !menu.active,
                    })}
                    menu={menu}
                    formattedMenuState={[formattedMenu, setFormattedMenu]}
                    level="first"
                  />
                  {menu.subMenu && (
                    <Transition
                      in={menu.activeDropdown}
                      onEnter={enter}
                      onExit={leave}
                      timeout={300}
                    >
                      <ul
                        className={clsx([
                          "bg-slate-200 rounded-lg dark:bg-slate-900/30",
                          { block: menu.activeDropdown },
                          { hidden: !menu.activeDropdown },
                        ])}
                      >
                        {menu.subMenu.map((subMenu, subMenuKey) => (
                          <li key={subMenuKey}>
                            <MenuItem
                              className={clsx({
                                // Animation
                                [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                                  (subMenuKey + 1) * 10
                                }`]: !subMenu.active,
                              })}
                              menu={subMenu}
                              formattedMenuState={[
                                formattedMenu,
                                setFormattedMenu,
                              ]}
                              level="second"
                            ></MenuItem>
                            {/* BEGIN: Third Child */}
                            {subMenu.subMenu && (
                              <Transition
                                in={subMenu.activeDropdown}
                                onEnter={enter}
                                onExit={leave}
                                timeout={300}
                              >
                                <ul
                                  className={clsx([
                                    "bg-black/10 rounded-lg dark:bg-darkmode-900/30",
                                    {
                                      block: subMenu.activeDropdown,
                                    },
                                    { hidden: !subMenu.activeDropdown },
                                  ])}
                                >
                                  {subMenu.subMenu.map(
                                    (lastSubMenu, lastSubMenuKey) => (
                                      <li key={lastSubMenuKey}>
                                        <MenuItem
                                          className={clsx({
                                            // Animation
                                            [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                                              (lastSubMenuKey + 1) * 10
                                            }`]: !lastSubMenu.active,
                                          })}
                                          menu={lastSubMenu}
                                          formattedMenuState={[
                                            formattedMenu,
                                            setFormattedMenu,
                                          ]}
                                          level="third"
                                        ></MenuItem>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Transition>
                            )}
                            {/* END: Third Child */}
                          </li>
                        ))}
                      </ul>
                    </Transition>
                  )}
                </li>
              )
            )}
          </ul>
        </nav>
        <div className="rounded-[30px] mt-3 min-w-0 min-h-screen flex-1 pb-10 bg-slate-200 dark:bg-slate-700 px-4 md:px-[22px] max-w-full md:max-w-auto before:content-[''] before:w-full before:h-px before:block">
          {children}
        </div>
      </div>
    </div>
  );
}

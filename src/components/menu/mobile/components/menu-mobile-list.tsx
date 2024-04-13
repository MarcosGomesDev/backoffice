"use client";

import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/stores/hooks";
import { selectSideMenu } from "@/stores/sideMenuSlice";
import clsx from "clsx";
import * as lucideIcons from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { enter, leave, nestedMenu } from "../../side-menu";
import { MenuMobileItem } from "./menu-mobile-item";

export const { createLucideIcon, ...icons } = lucideIcons;

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

export function MenuMobileList({
  setActiveMobileMenu,
}: {
  setActiveMobileMenu: (value: boolean) => void;
}) {
  const location = usePathname();

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
    <ul className="pb-16 pt-6 px-2">
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
            <MenuMobileItem
              className={clsx({
                // Animation
                [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                  (menuKey + 1) * 10
                }`]: !menu.active,
              })}
              menu={menu}
              formattedMenuState={[formattedMenu, setFormattedMenu]}
              level="first"
              setActiveMobileMenu={setActiveMobileMenu}
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
                      <MenuMobileItem
                        className={clsx({
                          // Animation
                          [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                            (subMenuKey + 1) * 10
                          }`]: !subMenu.active,
                        })}
                        menu={subMenu}
                        formattedMenuState={[formattedMenu, setFormattedMenu]}
                        level="second"
                        setActiveMobileMenu={setActiveMobileMenu}
                      />
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
                                  <MenuMobileItem
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
                                    setActiveMobileMenu={setActiveMobileMenu}
                                  />
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
  );
}

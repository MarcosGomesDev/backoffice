"use client";

import { Icon } from "@/components/Icon";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { FormattedMenu, linkTo } from "../side-menu";

export function MenuItem({
  formattedMenuState,
  level,
  menu,
  className,
}: {
  className?: string;
  menu: FormattedMenu;
  formattedMenuState: [
    (FormattedMenu | "divider")[],
    Dispatch<SetStateAction<(FormattedMenu | "divider")[]>>
  ];
  level: "first" | "second" | "third";
}) {
  const [formattedMenu, setFormattedMenu] = formattedMenuState;

  const router = useRouter();

  return (
    <Link
      href={menu.subMenu ? "#" : menu.pathname}
      as={menu.subMenu ? "div" : "a"}
      className={clsx([
        "h-[50px] flex items-center pl-5 mb-1 relative rounded-full",
        {
          "!text-slate-800/80 dark:!text-slate-100":
            menu.active && level != "first",
          "!text-slate-400 ": !menu.active && level != "first",
          "z-10 bg-slate-200 dark:bg-slate-700":
            menu.active && level == "first",
          "before:content-[''] before:w-[30px] before:h-[30px] before:-mt-[30px] before:rotate-90 before:scale-[1.04] before:bg-[length:100%] before:bg-menu-corner before:absolute before:top-0 before:right-0 before:-mr-5 dark:before:bg-menu-corner-dark":
            menu.active && level == "first",
          "after:content-[''] after:w-[30px] after:h-[30px] after:mt-[50px] after:scale-[1.04] after:bg-[length:100%] after:bg-menu-corner after:absolute after:top-0 after:right-0 after:-mr-5 dark:after:bg-menu-corner-dark":
            menu.active && level == "first",
          "[&>div:nth-child(1)]:hover:before:bg-slate-200 [&>div:nth-child(1)]:hover:before:dark:bg-slate-700":
            !menu.active && !menu.activeDropdown && level == "first",
        },
        className,
      ])}
      onClick={(event: React.MouseEvent) => {
        event.preventDefault();
        linkTo(menu, router);

        let newFormattedMenu = [...formattedMenu];

        if (!menu.pathname) {
          newFormattedMenu.map((item) => {
            if (typeof item !== "string") {
              if (item === menu) {
                return {
                  ...item,
                  activeDropdown: true,
                };
              }

              item.activeDropdown = false;
            }

            return item;
          });
        }

        setFormattedMenu([...newFormattedMenu]);
      }}
    >
      <div
        className={clsx({
          "!text-slate-800 dark:!text-slate-100":
            menu.active && level == "first",
          "!text-slate-400 dark:!text-slate-500":
            !menu.active && level == "first",
          "before:content-[''] before:z-[-1] before:absolute before:top-0 before:right-0 before:-mr-5 before:w-12 before:h-full before:bg-slate-200 before:dark:bg-slate-700":
            menu.active && level == "first",
          "before:content-[''] before:z-[-1] before:w-[230px] before:absolute before:top-0 before:left-0 before:h-full before:rounded-l-full before:transition before:ease-in before:duration-100":
            !menu.activeDropdown && !menu.active && level == "first",
        })}
      >
        <Icon icon={menu.icon} className="size-6" />
      </div>
      <div
        className={clsx([
          "hidden xl:flex items-center w-full ml-3",
          { "font-medium": menu.active && level != "first" },
          {
            "!text-slate-800 font-medium dark:!text-slate-100":
              menu.active && level == "first",
          },
          {
            "!text-slate-500": !menu.active && level == "first",
          },
        ])}
      >
        {menu.title}
        {menu.subMenu && (
          <div
            className={clsx([
              "transition ease-in duration-100 ml-auto mr-5 hidden xl:block",
              { "transform rotate-180": menu.activeDropdown },
            ])}
          >
            <ChevronDown className="size-4" />
          </div>
        )}
      </div>
    </Link>
  );
}

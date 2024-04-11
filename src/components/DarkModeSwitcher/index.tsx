"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";

interface DarkModeSwitcherProps {
  className?: string;
}

function DarkModeSwitcher({ className }: DarkModeSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const darkMode = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* BEGIN: Dark Mode Switcher */}
      <div
        className="fixed bottom-0 right-0 z-50 flex items-center justify-evenly w-32 h-12 mb-10 mr-10 border rounded-full shadow-md cursor-pointer box bg-white dark:bg-slate-800/20"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {darkMode ? (
          <Moon className="size-6 text-white" />
        ) : (
          <Sun className="size-6 text-slate-700" />
        )}
        <Switch checked={darkMode} />
      </div>
      {/* END: Dark Mode Switcher */}
    </>
  );
}

export default DarkModeSwitcher;

"use client";

import { storageService } from "@/services";
import { useEffect, useState } from "react";
import { PiMoonThin, PiSunThin } from "react-icons/pi";

type Theme = "light" | "dark";

export const ThemeSwitch = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setIsMounted(true);

    const storedTheme = storageService.getItem<Theme>("theme", false);

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      storageService.setItem("theme", "dark", false);
    } else {
      root.classList.remove("dark");
      storageService.setItem("theme", "light", false);
    }
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (!isMounted) {
    return (
      <div className="flex gap-4 items-center">
        <div className="w-11 h-6 bg-gray-300 rounded-full dark:bg-gray-800"></div>
        <div className="w-7 h-7"></div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 items-center">
      <label className="relative cursor-pointer">
        <input
          type="checkbox"
          id="theme-toggle"
          className="sr-only peer dark:bg-gray-800"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-800 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:bg-gray-600 transition-colors"></div>
        <div className="absolute left-0.5 top-0.5 bg-white dark:bg-gray-800 w-5 h-5 rounded-full transition-transform peer-checked:translate-x-full"></div>
      </label>

      {theme === "light" ? (
        <PiSunThin size={28} className="text-gray-600 dark:text-gray-200" />
      ) : (
        <PiMoonThin size={28} className="text-gray-600 dark:text-gray-200" />
      )}
    </div>
  );
};

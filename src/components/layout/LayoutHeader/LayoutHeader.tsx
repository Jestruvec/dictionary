"use client";

import { PiBookThin, PiLineVerticalThin } from "react-icons/pi";
import { ThemeSwitch, FontSelector } from "@/components";

export const LayoutHeader = () => {
  return (
    <header className="p-4 flex justify-between">
      <div className="flex items-center">
        <PiBookThin size={28} className="text-gray-600 dark:text-gray-300" />
      </div>

      <div className="flex items-center gap-2">
        <FontSelector />
        <PiLineVerticalThin
          size={24}
          className="text-gray-600 dark:text-gray-300"
        />
        <ThemeSwitch />
      </div>
    </header>
  );
};

"use client";

import { useEffect, useMemo, useState } from "react";
import { CustomSelect, SelectOption } from "../CustomSelect/CustomSelect";
import { storageService } from "@/services";

type Font = "serif" | "sans" | "mono";

export const FontSelector = () => {
  const [isMounted, setIsMounted] = useState(false);
  const fontOptions: SelectOption[] = useMemo(
    () => [
      { label: "serif", value: "serif" },
      { label: "sans-serif", value: "sans" },
      { label: "monospace", value: "mono" },
    ],
    []
  );

  const [selectedFont, setSelectedFont] = useState<SelectOption>(() => {
    return { label: "serif", value: "serif" };
  });

  useEffect(() => {
    setIsMounted(true);

    const storedFont = storageService.getItem<Font>("font", false);
    const defaultFont = { label: "serif", value: "serif" };

    if (!storedFont) {
      setSelectedFont(defaultFont);
      return;
    }

    const fontOption = fontOptions.find(
      (option) => option.value === storedFont
    );
    setSelectedFont(fontOption || defaultFont);
  }, [fontOptions]);

  useEffect(() => {
    if (!isMounted) return;

    const root = window.document.documentElement;
    root.classList.remove("font-serif", "font-sans", "font-mono");
    root.classList.add(`font-${selectedFont.value}`);
    storageService.setItem("font", selectedFont.value, false);
  }, [selectedFont, isMounted]);

  if (!isMounted) {
    return <div className="w-[8rem] h-[40px]"></div>;
  }

  return (
    <CustomSelect
      className="w-[8rem]"
      options={fontOptions}
      selected={selectedFont}
      onChange={setSelectedFont}
    />
  );
};

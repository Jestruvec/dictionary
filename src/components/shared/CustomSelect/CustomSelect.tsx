"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  options: SelectOption[];
  selected: SelectOption;
  onChange: (option: SelectOption) => void;
  className?: string;
}

export const CustomSelect = ({
  options,
  selected,
  onChange,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        className="w-full cursor-pointer flex items-center justify-between gap-2 px-3 py-2 rounded-md focus:outline-none focus:ring-2  bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-purple-500  dark:text-white dark:hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{selected.label}</span>
        <FaChevronDown className="ml-2 text-purple-600" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-40 border rounded-md shadow-lg bg-white border-gray-300 dark:border-gray-800 dark:bg-gray-600 dark:text-white ">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                selected.value === option.value ? "font-semibold" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

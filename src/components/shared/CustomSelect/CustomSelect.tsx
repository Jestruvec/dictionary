"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && listboxRef.current && focusedIndex >= 0) {
      const items = listboxRef.current.querySelectorAll("li");
      if (items[focusedIndex]) {
        items[focusedIndex].focus();
      }
    }
  }, [focusedIndex, isOpen]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (
        e.key === "Enter" ||
        e.key === " " ||
        e.key === "ArrowDown" ||
        e.key === "ArrowUp"
      ) {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
    } else {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          buttonRef.current?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            onChange(options[focusedIndex]);
            setIsOpen(false);
            buttonRef.current?.focus();
          }
          break;
        case "Tab":
          setIsOpen(false);
          break;
        default:
          break;
      }
    }
  };

  const handleItemKeyDown = (
    e: KeyboardEvent<HTMLLIElement>,
    option: SelectOption
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(option);
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div
      ref={ref}
      className={`relative inline-block text-left ${className}`}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        type="button"
        className="w-full cursor-pointer flex items-center justify-between gap-2 px-3 py-2 rounded-md focus:outline-none focus:ring-2 bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-purple-500 dark:text-white dark:hover:bg-gray-700"
        onClick={() => {
          setIsOpen(!isOpen);
          setFocusedIndex(-1);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="select-label"
      >
        <span id="select-label" className="font-semibold">
          {selected.label}
        </span>
        <FaChevronDown className="ml-2 text-purple-600" />
      </button>

      {isOpen && (
        <ul
          ref={listboxRef}
          role="listbox"
          aria-activedescendant={`option-${focusedIndex}`}
          className="absolute z-10 w-full mt-1 border rounded-md shadow-lg bg-white border-gray-300 dark:border-gray-800 dark:bg-gray-600 dark:text-white focus:outline-none"
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`option-${index}`}
              role="option"
              aria-selected={selected.value === option.value}
              tabIndex={0}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
                buttonRef.current?.focus();
              }}
              onKeyDown={(e) => handleItemKeyDown(e, option)}
              className={`cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                selected.value === option.value ? "font-semibold" : ""
              }`}
              ref={(el) => {
                if (el && index === focusedIndex) {
                  el.focus();
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

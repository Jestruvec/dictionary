"use client";

import React from "react";

export type CustomBtnVariant = "primary" | "text";
export type CustomBtnSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: CustomBtnVariant;
  size?: CustomBtnSize;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

export type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const CustomButton = ({
  variant = "primary",
  size = "md",
  loading = false,
  text,
  children,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "focus:outline-none transition-colors font-semibold my-auto";

  const variantClasses = {
    primary: `text-white focus:ring-purple-500 ${
      disabled
        ? "bg-purple-100"
        : "bg-purple-200 hover:opacity-75 cursor-pointer focus:ring-2"
    }`,
    text: `focus:ring-purple-600 ${
      disabled
        ? "text-gray-300"
        : "text-purple-600 hover:text-purple-700 cursor-pointer focus:ring-2 focus:ring-purple-600 "
    }`,
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  const content = loading ? "Loading..." : text ?? children;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...(props as ButtonProps)}
    >
      {content}
    </button>
  );
};

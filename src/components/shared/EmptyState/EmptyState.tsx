"use client";

import Image from "next/image";

interface Props {
  className?: string;
}

export const EmptyState = ({ className }: Props) => {
  return (
    <Image
      className={className}
      src="/book-reader.svg"
      alt="Book reader illustration"
      width={500}
      height={500}
      priority
    />
  );
};

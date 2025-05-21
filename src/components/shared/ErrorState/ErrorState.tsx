"use client";

import Image from "next/image";

interface Props {
  className?: string;
}

export const ErrorState = ({ className }: Props) => {
  return (
    <Image
      className={className}
      src="/not-found.svg"
      alt="Not found illustration"
      width={500}
      height={500}
      priority
    />
  );
};

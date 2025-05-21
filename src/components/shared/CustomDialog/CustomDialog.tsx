"use client";

export const CustomDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="backdrop:bg-black/50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-600 p-4 rounded-xl shadow-lg">
      {children}
    </div>
  );
};

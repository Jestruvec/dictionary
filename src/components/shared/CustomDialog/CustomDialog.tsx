"use client";

import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { closeModal } from "@/store/searchSlice";

interface Props {
  children: React.ReactNode;
}

export const CustomDialog = forwardRef<HTMLDialogElement, Props>(
  ({ children }, _ref) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.search.showModal);

    useImperativeHandle(_ref, () => dialogRef.current!);

    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (isOpen && !dialog.open) {
        dialog.showModal();
      } else if (!isOpen && dialog.open) {
        dialog.close();
      }

      const handleClose = () => {
        dispatch(closeModal());
      };

      dialog.addEventListener("close", handleClose);
      return () => dialog.removeEventListener("close", handleClose);
    }, [isOpen, dispatch]);

    return (
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/50 rounded-xl p-4 w-[90%] max-w-md shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-black dark:text-white 
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {children}
      </dialog>
    );
  }
);

CustomDialog.displayName = "CustomDialog";

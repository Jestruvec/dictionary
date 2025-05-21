"use client";

import { CustomButton } from "@/components";
import { CustomDialog } from "@/components/shared/CustomDialog/CustomDialog";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { closeModal } from "@/store/searchSlice";

export const HistoryDialog = () => {
  const { selectedHistory } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  return (
    <CustomDialog>
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-center">Search History</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Word:</span>{" "}
            <span className="font-semibold">{selectedHistory?.word}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Date:</span> {selectedHistory?.date}
          </p>
        </div>
        <div className="flex justify-end">
          <CustomButton
            className="rounded-lg"
            variant="text"
            onClick={() => dispatch(closeModal())}
          >
            Close
          </CustomButton>
        </div>
      </section>
    </CustomDialog>
  );
};

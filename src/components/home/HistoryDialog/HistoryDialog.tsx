"use client";

import { CustomButton } from "@/components";
import { CustomDialog } from "@/components/shared/CustomDialog/CustomDialog";
import { closeModal } from "@/store/searchSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export const HistoryDialog = () => {
  const dispatch = useDispatch();
  const { selectedHistory } = useSelector((state: RootState) => state.search);

  return (
    <CustomDialog>
      <section className="flex flex-col gap-4 ">
        <h2 className="text-lg font-bold">Search history</h2>
        <p>
          Searched word:
          <span className="font-semibold">{selectedHistory?.word}</span>
        </p>
        <p className="mt-2 text-sm">{`Search datetime: ${selectedHistory?.date}`}</p>
        <div className="mt-2 flex justify-end gap-2">
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

"use client";

import { CustomButton, EmptyState } from "@/components";
import { CustomDialog } from "@/components/shared/CustomDialog/CustomDialog";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { closeModal } from "@/store/searchSlice";

export const HistoryDialog = () => {
  const { searchHistory } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  return (
    <CustomDialog>
      <header>
        <h2 className="text-xl font-semibold text-center">Search History</h2>
      </header>

      <section>
        {searchHistory.length ? (
          <ul className="my-4 overflow-auto max-h-96">
            {searchHistory.map((history, i) => (
              <li key={i} className="py-2">
                <p>
                  <span className="font-medium">Word:</span>{" "}
                  <span className="font-semibold">{history.word}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Search date:</span>{" "}
                  {history.date}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState />
        )}
      </section>

      <footer className="flex justify-end">
        <CustomButton
          className="rounded-lg"
          variant="text"
          onClick={() => dispatch(closeModal())}
        >
          Close
        </CustomButton>
      </footer>
    </CustomDialog>
  );
};

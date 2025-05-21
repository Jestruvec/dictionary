"use client";

import { CustomButton } from "@/components/";
import { openModal } from "@/store/searchSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export const HistoryCard = () => {
  const dispatch = useDispatch();
  const { searchHistory } = useSelector((state: RootState) => state.search);

  if (searchHistory.length === 0) return null;

  return (
    <article className="mt-2 overflow-auto max-h-20 p-1">
      {searchHistory.map((history, idx) => (
        <CustomButton
          key={idx}
          size="sm"
          variant="text"
          className="rounded-lg"
          onClick={() => dispatch(openModal(history))}
        >
          {history.word}
        </CustomButton>
      ))}
    </article>
  );
};

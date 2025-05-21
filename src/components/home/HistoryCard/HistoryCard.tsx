"use client";

import { CustomButton } from "@/components/";
import { openModal, setSearchQuery } from "@/store/searchSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { PiClock } from "react-icons/pi";

export const HistoryCard = () => {
  const dispatch = useDispatch();
  const { searchHistory } = useSelector((state: RootState) => state.search);

  if (searchHistory.length === 0) return null;

  return (
    <article className="mt-2 overflow-auto max-h-20 p-1 flex flex-wrap items-center gap-2">
      <CustomButton
        size="sm"
        variant="text"
        className="rounded-lg"
        onClick={() => dispatch(openModal())}
      >
        <PiClock size={24} />
      </CustomButton>

      {searchHistory.map((history, idx) => (
        <CustomButton
          key={idx}
          size="sm"
          variant="text"
          className="rounded-lg"
          onClick={() => dispatch(setSearchQuery(history.word))}
        >
          {history.word}
        </CustomButton>
      ))}
    </article>
  );
};

"use client";

import { useEffect, useRef, useState } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { debounce, DebouncedFunction, typeTextLetterByLetter } from "@/utils";
import { CustomInput } from "@/components";
import { useDictionary } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearEntry, clearError, setSearchQuery } from "@/store/searchSlice";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const { loading, error, searchQuery } = useSelector(
    (state: RootState) => state.search
  );
  const { fetchEntry } = useDictionary();
  const wordToType = "Welcome";
  const [isWritingWordToType, setIsWritingWordToType] = useState(true);
  const debouncedSearchRef =
    useRef<DebouncedFunction<(query: string) => void>>(null);

  useEffect(() => {
    debouncedSearchRef.current = debounce<(query: string) => void>((query) => {
      if (query.trim()) {
        fetchEntry(query);
      }
    });

    typeTextLetterByLetter(wordToType, (value) =>
      dispatch(setSearchQuery(value))
    ).then(() => {
      setIsWritingWordToType(false);
    });

    return () => {
      debouncedSearchRef.current?.cancel?.();
    };
  }, [fetchEntry, wordToType, dispatch]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      dispatch(clearEntry());
      dispatch(clearError());
    }

    debouncedSearchRef.current?.(searchQuery);
  }, [searchQuery, dispatch]);

  const hint =
    searchQuery.trim() === "" && !isWritingWordToType
      ? "Write a word to see results."
      : undefined;

  return (
    <CustomInput
      id="searchQuery"
      placeholder="search"
      icon={<PiMagnifyingGlassLight color="purple" />}
      value={searchQuery}
      setValue={(value) => dispatch(setSearchQuery(value))}
      disabled={loading || isWritingWordToType}
      error={error}
      hint={hint}
    />
  );
};

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  setEntry,
  setLoading,
  setError,
  clearError,
} from "@/store/searchSlice";
import { api } from "@/services";
import { handleApiError } from "@/utils";
import { DictionaryEntry } from "@/types";

export const useDictionary = () => {
  const dispatch = useDispatch();

  const fetchEntry = useCallback(
    async (entry: string) => {
      if (!entry.trim()) return;

      dispatch(setLoading(true));
      dispatch(clearError());

      try {
        const response = await api.fetchRecords<DictionaryEntry[]>(entry);
        dispatch(setEntry(response));
      } catch (error) {
        dispatch(setError(handleApiError(error)));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  return { fetchEntry };
};

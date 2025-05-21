import { DictionaryEntry, SearchHistory } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  showModal: boolean;
  entry: DictionaryEntry[];
  searchHistory: SearchHistory[];
  selectedHistory: SearchHistory | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  showModal: false,
  searchQuery: "",
  entry: [],
  searchHistory: [],
  selectedHistory: null,
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<SearchHistory>) => {
      state.selectedHistory = action.payload;
      state.showModal = true;
    },
    closeModal: (state) => {
      state.selectedHistory = null;
      state.showModal = false;
    },
    setSelectedHistory: (state, action: PayloadAction<SearchHistory>) => {
      state.selectedHistory = action.payload;
    },
    clearSelectedHistory: (state) => {
      state.selectedHistory = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setEntry: (state, action: PayloadAction<DictionaryEntry[]>) => {
      state.entry = action.payload;

      const firstEntry = action.payload[0];

      if (firstEntry) {
        state.searchHistory.unshift({
          word: firstEntry.word,
          date: new Date().toLocaleString(),
        });
      }
    },
    clearEntry: (state) => {
      state.entry = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setEntry,
  setError,
  setLoading,
  clearEntry,
  clearError,
  setSearchQuery,
  setSelectedHistory,
  clearSelectedHistory,
  openModal,
  closeModal,
} = searchSlice.actions;
export default searchSlice.reducer;

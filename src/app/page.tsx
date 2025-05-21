"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  SearchBar,
  EntryCard,
  DotsLoading,
  EmptyState,
  ErrorState,
  HistoryCard,
  HistoryDialog,
} from "@/components";

const Home = () => {
  const { entry, loading, error, showModal } = useSelector(
    (state: RootState) => state.search
  );

  return (
    <section className="px-4 pb-20">
      {showModal && <HistoryDialog />}

      <header className="my-2">
        <SearchBar />
        <HistoryCard />
      </header>

      {loading ? (
        <DotsLoading className="h-40 flex items-center justify-center" />
      ) : error ? (
        <ErrorState className="mx-auto pt-20" />
      ) : entry.length ? (
        <div className="flex flex-col gap-2">
          {entry.map((entry, i) => (
            <EntryCard key={i} entry={entry} />
          ))}
        </div>
      ) : (
        <EmptyState className="mx-auto pt-20" />
      )}
    </section>
  );
};

export default Home;

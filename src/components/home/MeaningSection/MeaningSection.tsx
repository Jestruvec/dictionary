"use client";

import { CustomButton } from "@/components";
import { useDispatch } from "react-redux";
import { Meaning } from "@/types";
import { setSearchQuery } from "@/store/searchSlice";

export interface MeaningSectionProps {
  meaning: Meaning;
}

export const MeaningSection = ({ meaning }: MeaningSectionProps) => {
  const dispatch = useDispatch();
  const { partOfSpeech, definitions, synonyms } = meaning;

  const searchSynonym = (syn: string) => {
    dispatch(setSearchQuery(syn));
  };

  return (
    <section className="px-4 mt-6" data-testid="meaning">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-bold italic">{partOfSpeech}</h2>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <h3 className="text-gray-400">Meaning</h3>
      <ul className="list-disc ml-6 py-4 marker:text-purple-600">
        {definitions.map(({ definition, example }, i) => (
          <li key={i}>
            <p>{definition}</p>
            {example && <p className="text-gray-400">{`"${example}"`}</p>}
          </li>
        ))}
      </ul>
      {synonyms.length ? (
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-gray-400">Synonyms:</h3>
          {synonyms.map((syn, i) => (
            <CustomButton
              key={i}
              variant="text"
              size="sm"
              className="rounded-lg"
              onClick={() => searchSynonym(syn)}
            >
              {syn}
            </CustomButton>
          ))}
        </div>
      ) : null}
    </section>
  );
};

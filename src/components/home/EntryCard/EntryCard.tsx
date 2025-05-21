"use client";

import { useRef } from "react";
import { CustomButton } from "@/components/shared/CustomButton/CustomButton";
import { PiPlayFill } from "react-icons/pi";
import { MeaningSection } from "../MeaningSection/MeaningSection";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { DictionaryEntry } from "@/types";

interface Props {
  entry: DictionaryEntry;
}

export const EntryCard = ({ entry }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl =
    entry.phonetics.find((phonetic) => phonetic.audio)?.audio || "";

  const handlePlay = () => {
    if (!audioUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
    }
    audioRef.current.play().catch((err) => {
      console.error("Error al reproducir audio:", err);
    });
  };

  return (
    <article>
      <header>
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl font-semibold">{entry.word}</h1>
            <p className="text-purple-400">{entry.phonetic}</p>
          </div>

          {audioUrl && (
            <CustomButton
              className="py-4 rounded-full"
              aria-label="Play pronunciation"
              onClick={handlePlay}
            >
              <PiPlayFill className="text-purple-600" />
            </CustomButton>
          )}
        </div>
      </header>

      {entry.meanings.map((meaning, i) => (
        <MeaningSection key={`meaning-${i}`} meaning={meaning} />
      ))}

      <div className="flex-1 h-px bg-gray-300 my-6" />

      <footer>
        {entry.sourceUrls.map((url, i) => (
          <div key={`url-${i}`} className="flex items-center gap-2 text-xs">
            <h2 className="text-gray-400 ">Source</h2>
            <a
              href={url}
              target="_blank"
              className="underline flex items-center rounded-lg gap-2 focus:outline-0 focus:ring-2 focus:ring-purple-500"
            >
              {url}
              <LiaExternalLinkAltSolid className="text-gray-600 dark:text-gray-200" />
            </a>
          </div>
        ))}
      </footer>
    </article>
  );
};

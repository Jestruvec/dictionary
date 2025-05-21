import { render, screen, fireEvent } from "@testing-library/react";
import { EntryCard } from "./EntryCard";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import type { DictionaryEntry } from "@/types";
import { ButtonProps } from "@/components/shared/CustomButton/CustomButton";
import { MeaningSectionProps } from "../MeaningSection/MeaningSection";

vi.mock("@/components/shared/CustomButton/CustomButton", () => ({
  CustomButton: ({ onClick, children }: Partial<ButtonProps>) => (
    <button onClick={onClick} aria-label="Play pronunciation">
      {children}
    </button>
  ),
}));

vi.mock("./MeaningSection/MeaningSection", () => ({
  MeaningSection: ({ meaning }: MeaningSectionProps) => (
    <div data-testid="meaning">{meaning.partOfSpeech}</div>
  ),
}));

describe("EntryCard", () => {
  const mockEntry: DictionaryEntry = {
    word: "test",
    phonetic: "/tɛst/",
    phonetics: [{ audio: "https://example.com/audio.mp3", text: "" }],
    meanings: [
      { partOfSpeech: "noun", definitions: [], synonyms: [], antonyms: [] },
      { partOfSpeech: "verb", definitions: [], synonyms: [], antonyms: [] },
    ],
    sourceUrls: ["https://source.com"],
  };

  const renderCard = () =>
    render(
      <Provider store={store}>
        <EntryCard entry={mockEntry} />
      </Provider>
    );

  it("renderiza la palabra y la transcripción fonética", () => {
    renderCard();

    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("/tɛst/")).toBeInTheDocument();
  });

  it("muestra el botón de reproducción si hay audio", () => {
    renderCard();

    const button = screen.getByRole("button", { name: "Play pronunciation" });
    expect(button).toBeInTheDocument();
  });

  it("reproduce el audio al hacer clic en el botón", () => {
    const playMock = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal(
      "Audio",
      vi.fn().mockImplementation(() => ({ play: playMock }))
    );

    renderCard();

    const button = screen.getByRole("button", { name: "Play pronunciation" });
    fireEvent.click(button);

    expect(playMock).toHaveBeenCalled();
  });

  it("renderiza todas las secciones de significado", () => {
    renderCard();

    const meanings = screen.getAllByTestId("meaning");
    expect(meanings).toHaveLength(2);
  });

  it("renderiza los enlaces de fuente correctamente", () => {
    renderCard();
    const link = screen.getByRole("link", { name: /https:\/\/source.com/ });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://source.com");
  });
});

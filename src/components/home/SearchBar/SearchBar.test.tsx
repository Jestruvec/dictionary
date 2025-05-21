import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Mock, vi } from "vitest";
import * as redux from "react-redux";
import * as dictionaryHook from "@/hooks";
import * as utils from "@/utils";
import { SearchBar } from "./SearchBar";

vi.mock("react-redux", () => {
  return {
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

vi.mock("@/components", () => ({
  CustomInput: vi.fn(({ value, setValue, disabled, error, hint }) => (
    <input
      data-testid="custom-input"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={hint ? "hint" : undefined}
      placeholder="search"
    />
  )),
}));

vi.mock("react-icons/pi", () => ({
  PiMagnifyingGlassLight: () => <span data-testid="icon" />,
}));

describe("SearchBar", () => {
  const dispatchMock = vi.fn();
  const fetchEntryMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useDispatch as unknown as Mock)
      .mockReturnValue(dispatchMock)
      .mockReturnValue(dispatchMock);
    (useSelector as unknown as Mock).mockImplementation((selector) =>
      selector({
        search: {
          loading: false,
          error: null,
          searchQuery: "",
        },
      })
    );

    vi.spyOn(dictionaryHook, "useDictionary").mockReturnValue({
      fetchEntry: fetchEntryMock,
    });
  });

  it("renderiza CustomInput con props iniciales", () => {
    render(<SearchBar />);
    const input = screen.getByTestId("custom-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "search");
  });

  it("llama typeTextLetterByLetter y despacha setSearchQuery", async () => {
    const typeTextMock = vi
      .spyOn(utils, "typeTextLetterByLetter")
      .mockImplementation((word, callback) => {
        for (let i = 1; i <= word.length; i++) {
          callback(word.slice(0, i));
        }
        return Promise.resolve();
      });

    render(<SearchBar />);
    expect(typeTextMock).toHaveBeenCalledWith("Welcome", expect.any(Function));
  });

  it("despacha setSearchQuery cuando el input cambia", async () => {
    render(<SearchBar />);
    const input = screen.getByTestId("custom-input");

    await act(async () => {
      await userEvent.type(input, "hello");
    });

    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "search/setSearchQuery",
        payload: expect.any(String),
      })
    );
  });

  it("llama fetchEntry debounced cuando cambia searchQuery", () => {
    vi.spyOn(utils, "debounce").mockImplementation((fn) => {
      const debouncedFn = (...args: string[]) => fn(...args);
      debouncedFn.cancel = vi.fn();
      return debouncedFn;
    });

    vi.spyOn(redux, "useSelector").mockImplementation((selector) =>
      selector({
        search: {
          loading: false,
          error: null,
          searchQuery: "test",
        },
      })
    );

    render(<SearchBar />);
    expect(fetchEntryMock).toHaveBeenCalledWith("test");
  });
});

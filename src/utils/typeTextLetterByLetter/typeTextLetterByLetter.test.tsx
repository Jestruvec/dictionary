import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { typeTextLetterByLetter } from "./typeTextLetterByLetter";

describe("typeTextLetterByLetter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debería llamar al callback con letras acumuladas con el delay correcto", async () => {
    const callback = vi.fn();
    const text = "abc";
    const delay = 200;

    const promise = typeTextLetterByLetter(text, callback, delay);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith("a");

    vi.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith("ab");

    vi.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenLastCalledWith("abc");

    await expect(promise).resolves.toBeUndefined();
  });

  it("debería resolver la promesa incluso con texto vacío", async () => {
    const callback = vi.fn();
    const text = "";

    const promise = typeTextLetterByLetter(text, callback, 200);

    expect(callback).not.toHaveBeenCalled();

    await expect(promise).resolves.toBeUndefined();
  });
});

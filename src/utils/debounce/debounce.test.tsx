import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debería llamar a la función callback después del delay", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 1000);

    debounced("test");

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("test");
  });

  it("debería llamar a la función callback solo una vez si se llama varias veces rápido", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 1000);

    debounced("primero");
    vi.advanceTimersByTime(500);
    debounced("segundo");
    vi.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("segundo");
  });

  it("debería cancelar la llamada si se llama a .cancel()", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 1000);

    debounced("cancelar");
    debounced.cancel();

    vi.advanceTimersByTime(1000);

    expect(callback).not.toHaveBeenCalled();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FontSelector } from "./FontSelector";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { storageService } from "@/services/storageService";

vi.mock("@/services/storageService", () => ({
  storageService: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

const mockedStorageService = storageService as {
  getItem: Mock;
  setItem: Mock;
  removeItem: Mock;
};

describe("FontSelector", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    document.documentElement.classList.remove(
      "font-serif",
      "font-sans",
      "font-mono"
    );

    vi.resetAllMocks();
  });

  it("muestra la fuente por defecto si no hay valor en storage", async () => {
    mockedStorageService.getItem.mockReturnValue(null);

    render(<FontSelector />);

    const fontElement = await screen.findByText("serif");

    expect(fontElement).toBeInTheDocument();
    expect(mockedStorageService.getItem).toHaveBeenCalledTimes(1);
    expect(mockedStorageService.getItem).toHaveBeenCalledWith("font", false);
    expect(document.documentElement.classList.contains("font-serif")).toBe(
      true
    );
  });

  it("muestra la fuente almacenada si está presente", async () => {
    mockedStorageService.getItem.mockReturnValue("sans");

    render(<FontSelector />);

    expect(await screen.findByText("sans-serif")).toBeInTheDocument();
    expect(document.documentElement.classList.contains("font-sans")).toBe(true);
  });

  it("cambia la fuente al seleccionar otra opción", async () => {
    mockedStorageService.getItem.mockReturnValue(null);

    render(<FontSelector />);

    await user.click(screen.getByRole("button", { name: /serif/i }));
    await user.click(screen.getByText("monospace"));

    expect(document.documentElement.classList.contains("font-mono")).toBe(true);
    expect(mockedStorageService.setItem).toHaveBeenCalledWith(
      "font",
      "mono",
      false
    );
  });
});

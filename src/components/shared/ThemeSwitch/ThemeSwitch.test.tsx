import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeSwitch } from "./ThemeSwitch";
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

vi.mock("react-icons/pi", () => ({
  PiMoonThin: () => <div data-testid="moon-icon">Moon</div>,
  PiSunThin: () => <div data-testid="sun-icon">Sun</div>,
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("ThemeSwitch", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    vi.clearAllMocks();
  });

  it("muestra el estado inicial light correctamente", async () => {
    mockedStorageService.getItem.mockReturnValue(null);

    render(<ThemeSwitch />);

    // Verificar que muestra el sol inicialmente
    expect(await screen.findByTestId("sun-icon")).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("cambia a dark mode al hacer toggle", async () => {
    mockedStorageService.getItem.mockReturnValue("light");

    render(<ThemeSwitch />);
    const toggle = screen.getByRole("checkbox");

    await user.click(toggle);

    await waitFor(() => {
      expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    expect(mockedStorageService.setItem).toHaveBeenCalledWith(
      "theme",
      "dark",
      false
    );
  });

  it("cambia a light mode al hacer toggle", async () => {
    mockedStorageService.getItem.mockReturnValue("dark");

    render(<ThemeSwitch />);
    const toggle = screen.getByRole("checkbox");

    await user.click(toggle);

    await waitFor(() => {
      expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    expect(mockedStorageService.setItem).toHaveBeenCalledWith(
      "theme",
      "light",
      false
    );
  });

  it("usa el tema almacenado en storage", async () => {
    mockedStorageService.getItem.mockReturnValue("dark");

    render(<ThemeSwitch />);

    await waitFor(() => {
      expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });

  it("usa el tema del sistema operativo (dark)", async () => {
    mockedStorageService.getItem.mockReturnValue(null);
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      // ...otros métodos
    }));

    render(<ThemeSwitch />);

    await waitFor(() => {
      expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });

  it("muestra skeleton mientras carga", () => {
    mockedStorageService.getItem.mockReturnValue(null);
    const { container } = render(<ThemeSwitch />);

    expect(container.querySelector(".bg-gray-300")).toBeInTheDocument();
    expect(screen.queryByTestId("sun-icon")).not.toBeInTheDocument();
  });
});

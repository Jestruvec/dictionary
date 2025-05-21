import "@testing-library/jest-dom";

vi.mock("@/services/storageService", () => ({
  storageService: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

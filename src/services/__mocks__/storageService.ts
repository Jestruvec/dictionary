import { vi } from "vitest";

export const storageService = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
} as const;

import { AxiosError } from "axios";
import { handleApiError } from "./handleApiError";

describe("handleApiError", () => {
  it("should return specific message for 404 error", () => {
    const error = {
      isAxiosError: true,
      response: { status: 404 },
      message: "Not Found",
    } as AxiosError;

    expect(handleApiError(error)).toBe("No search results found.");
  });

  it("should return error.message for other axios errors", () => {
    const error = {
      isAxiosError: true,
      response: { status: 500 },
      message: "Internal Server Error",
    } as AxiosError;

    expect(handleApiError(error)).toBe("Internal Server Error");
  });

  it("should return unknown error message for non-axios errors", () => {
    const error = new Error("Some random error");

    expect(handleApiError(error)).toBe(
      "An unknown error has occurred, please try again."
    );
  });
});

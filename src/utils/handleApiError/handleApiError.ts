import axios from "axios";

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      return "No search results found.";
    }
    return error.message;
  }

  return "An unknown error has occurred, please try again.";
};

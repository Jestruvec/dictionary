import axios from "axios";

interface ApiService {
  fetchRecords: <T>(
    searchQuery: string,
    params?: Record<string, string>
  ) => Promise<T>;
}

const createApiService = (): ApiService => {
  const fetchRecords = async <T>(
    searchQuery: string,
    params?: Record<string, string>
  ): Promise<T> => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/${searchQuery}`;
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { fetchRecords };
};

export const api: ApiService = createApiService();

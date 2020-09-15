import { useQuery } from "react-query";
import { httpClient } from "../../services/http-service";

const searchProducts = async (query) => {
  if (!query) return null;
  const response = await httpClient.get(`/search?q=${query}`);
  return response.data;
};

export default function useSearchProducts(query) {
  return useQuery(query, searchProducts);
}

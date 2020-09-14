import { useQuery } from "react-query";
import * as API from "../../common/consts/api";

const searchProducts = async (query) => {
  if (!query) return null;
  const data = await fetch(`${API.PREFIX}/search?q=${query}`);
  return data.json();
};

export default function useSearchProducts(query) {
  return useQuery(query, searchProducts);
}

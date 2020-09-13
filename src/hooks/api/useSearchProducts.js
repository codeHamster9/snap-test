import { useQuery } from "react-query";

const searchProducts = async (query) => {
  if (!query) return null;
  const data = await fetch(`http://localhost:4000/api/search?q=${query}`);
  return data.json();
};

export default function useSearchProducts(query) {
  return useQuery(query, searchProducts);
}

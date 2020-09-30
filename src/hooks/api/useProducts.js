import { useQuery } from "react-query";
import { httpClient } from "@/services/http-service";

const getProducts = async (query) => {
  let url = `/products`;
  if (query) {
    url += `?q=${query}`;
  }
  const { data } = await httpClient.get(url);
  return data;
};

export default function useProducts(query) {
  return useQuery(query, getProducts);
}

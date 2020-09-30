import { useQuery } from "react-query";
import { httpClient } from "@/services/http-service";

const getProduct = async (id) => {
  const { data } = await httpClient.get(`/product/${id}`);
  return data;
};

export default function useProduct(id) {
  return useQuery(id, getProduct);
}

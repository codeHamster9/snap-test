import { useQuery } from "react-query";
import { httpClient } from "@/services/http-service";

const getVendors = async () => {
  const { data } = await httpClient.get(`/vendors`);
  return data;
};

export default function useVendors() {
  return useQuery("vendors", getVendors);
}

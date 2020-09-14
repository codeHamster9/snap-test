import { useQuery } from "react-query";
import * as API from "../../common/consts/api";

const getVendors = async () => {
  const data = await fetch(`${API.PREFIX}/vendors`);
  return data.json();
};

export default function useVendors() {
  return useQuery("vendors", getVendors);
}

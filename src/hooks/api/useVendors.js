import { useQuery } from "react-query";
import consts from "../../common/consts";
const { API } = consts;

const getVendors = async () => {
  const data = await fetch(`${API.PREFIX}/vendors`);
  return data.json();
};

export default function useVendors() {
  return useQuery("vendors", getVendors);
}

import { useQuery } from "react-query";

const getVendors = async () => {
  const data = await fetch("http://localhost:4000/api/vendors");
  return data.json();
};

export default function useVendors() {
  return useQuery("vendors", getVendors);
}

import { useQuery } from "react-query";

const getProduct = async (id) => {
  const data = await fetch(`http://localhost:4000/api/product/${id}`);
  return data.json();
};

export default function useProduct(id) {
  return useQuery(id, getProduct);
}

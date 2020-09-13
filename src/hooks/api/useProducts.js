import { useQuery } from "react-query";

const getProducts = async () => {
  const data = await fetch("http://localhost:4000/api/products");
  return data.json();
};

export default function useProducts() {
  return useQuery("posts", getProducts);
}

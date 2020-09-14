import { useQuery } from "react-query";
import * as API from "../../common/consts/api";

const getProducts = async () => {
  const data = await fetch(`${API.PREFIX}/products`);
  return data.json();
};

export default function useProducts() {
  return useQuery("posts", getProducts);
}

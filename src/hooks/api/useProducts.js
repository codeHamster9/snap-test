import { useQuery } from "react-query";
import consts from "../../common/consts";
const { API } = consts;

const getProducts = async () => {
  const data = await fetch(`${API.PREFIX}/products`);
  return data.json();
};

export default function useProducts() {
  return useQuery("posts", getProducts);
}

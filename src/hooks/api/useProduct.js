import { useQuery } from "react-query";
import * as API from "../../common/consts/api";

const getProduct = async (id) => {
  const data = await fetch(`${API.PREFIX}/product/${id}`);
  return data.json();
};

export default function useProduct(id) {
  return useQuery(id, getProduct);
}

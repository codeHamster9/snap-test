import { useQuery } from "react-query";
import consts from "../../common/consts";
const { API } = consts;

const getProduct = async (id) => {
  const data = await fetch(`${API.PREFIX}/product/${id}`);
  return data.json();
};

export default function useProduct(id) {
  return useQuery(id, getProduct);
}

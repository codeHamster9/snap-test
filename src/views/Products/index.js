import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Textfield from "../../core/Textfield";
import Card from "../../core/Card";
import useProducts from "../../hooks/api/useProducts";
import useSearchProducts from "../../hooks/api/useSearchProducts";
import useDebounce from "../../hooks/utils/useDebounce";

const Products = () => {
  const [search, setSearch] = useState("");
  const [prods, setProds] = useState([]);
  const debouncedSearch = useDebounce(search, 500);
  const productsResponse = useProducts();
  const searchResponse = useSearchProducts(debouncedSearch);
  const history = useHistory();

  const isLoading = (loaders) =>
    loaders.filter((loader) => loader.status === "loading").length;

  useEffect(() => {
    if (productsResponse.data) {
      setProds(productsResponse.data);
    }
  }, [productsResponse.data]);

  useEffect(() => {
    if (debouncedSearch && searchResponse.data) {
      setProds(searchResponse.data);
    } else {
      setProds(productsResponse.data || []);
    }
  }, [debouncedSearch, searchResponse.data, productsResponse.data]);

  const handleClick = (id) => {
    history.push(`/product/${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="w-1/3"></div>
      <Textfield value={search} onChange={(v) => setSearch(v)} />
      <div className="flex flex-wrap">
        {isLoading([productsResponse, searchResponse]) ? (
          "Loading..."
        ) : productsResponse.status === "error" ? (
          <span>Error: {productsResponse.error.message}</span>
        ) : (
          <>
            {prods.map((card) => (
              <div
                className="m-2"
                key={card.id}
                onClick={() => handleClick(card.id)}
              >
                <Card
                  title={card.name}
                  subtitle={card.vendor}
                  imageUrl={card.media[1].url}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;

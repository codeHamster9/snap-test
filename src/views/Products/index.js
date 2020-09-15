import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useProducts from "../../hooks/api/useProducts";
import useVendors from "../../hooks/api/useVendors";
import useDebounce from "../../hooks/utils/useDebounce";
import Textfield from "../../core/Textfield";
import DropDown from "../../core/DropDown";
import Card from "../../core/Card";
import Page from "../../layout/Page";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const productsQuery = useProducts(debouncedSearch);
  const vendorsQuery = useVendors();
  const history = useHistory();

  useEffect(() => {
    if (productsQuery.isFetched) {
      setProducts(productsQuery.data);
    }
  }, [productsQuery.data]);

  const gotoProduct = (id) => {
    history.push(`/product/${id}`);
  };

  const filterByVendor = (vendor) => {
    const filtered = productsQuery.data.filter(
      (p) => p.vendor.toLowerCase() === vendor.toLowerCase()
    );
    setProducts(filtered);
  };

  const changeVendor = (vendor) => {
    if (vendor) {
      filterByVendor(vendor);
    } else {
      setProducts(productsQuery.data);
    }
  };

  return (
    <Page>
      <div className="flex flex-col items-center">
        <div className="w-full mt-4 mb-12 flex justify-around">
          <div className="w-1/3">
            <Textfield value={search} onChange={(v) => setSearch(v)} />
          </div>
          <div className="flex-shrink w-1/3 mt-2 text-right">
            <DropDown items={vendorsQuery.data} onChange={changeVendor} />
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          {productsQuery.status === "loading" ? (
            "Loading..."
          ) : productsQuery.status === "error" ? (
            <span>Error: {productsQuery.error.message}</span>
          ) : (
            <>
              {products.map((card) => (
                <div
                  className="m-2"
                  key={card.id}
                  onClick={() => gotoProduct(card.id)}
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
    </Page>
  );
};

export default Products;

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Textfield from "../../core/Textfield";
import Card from "../../core/Card";
import NavBar from "../../core/NavBar";
import useProducts from "../../hooks/api/useProducts";
import useSearchProducts from "../../hooks/api/useSearchProducts";
import useVendors from "../../hooks/api/useVendors";
import useDebounce from "../../hooks/utils/useDebounce";
import DropDown from "../../core/DropDown";

const Products = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("");
  const [vendors, setvendors] = useState([]);
  const debouncedSearch = useDebounce(search, 500);
  const productsQuery = useProducts();
  const vendorsQuery = useVendors();
  const searchQuery = useSearchProducts(debouncedSearch);
  const history = useHistory();

  const isLoading = (loaders) =>
    loaders.filter((loader) => loader.status === "loading").length;

  useEffect(() => {
    if (productsQuery.data) {
      setProducts(productsQuery.data);
    }
  }, [productsQuery.data]);

  useEffect(() => {
    if (vendorsQuery.data) {
      setvendors(vendorsQuery.data);
    }
  }, [vendorsQuery.data]);

  useEffect(() => {
    let productData = [];
    if (debouncedSearch && searchQuery.data) {
      productData = searchQuery.data;
    } else {
      productData = productsQuery.data || [];
    }
    setProducts(filterByVendor(selected.toLowerCase(), productData));
  }, [debouncedSearch, searchQuery.data, productsQuery.data, selected]);

  const handleClick = (id) => {
    history.push(`/product/${id}`);
  };

  const filterByVendor = (vendor, products) => {
    if (!vendor) return products;

    return products.filter((p) => p.vendor.toLowerCase() === vendor);
  };

  const changeVendor = (selected) => {
    setSelected(selected);
  };

  return (
    <>
      <NavBar title="Snappy" color="teal" />
      <div className="flex flex-col items-center">
        <div className="w-full mt-4 mb-12 flex justify-around">
          <div className="w-1/3">
            <Textfield value={search} onChange={(v) => setSearch(v)} />
          </div>
          <div className="flex-shrink w-1/3 mt-2">
            <DropDown items={vendors} onChange={changeVendor} />
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          {isLoading([productsQuery, searchQuery]) ? (
            "Loading..."
          ) : productsQuery.status === "error" ? (
            <span>Error: {productsQuery.error.message}</span>
          ) : (
            <>
              {products.map((card) => (
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
    </>
  );
};

export default Products;

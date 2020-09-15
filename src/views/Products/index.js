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
      injectPromotion(productsQuery.data);
      setProducts(productsQuery.data);
    }
  }, [productsQuery.data]);

  const gotoProduct = (id) => {
    if (id === "uuid") return;
    history.push(`/product/${id}`);
  };

  const filterByVendor = (vendor) => {
    const filtered = productsQuery.data.filter(
      (p) => p.vendor.toLowerCase() === vendor.toLowerCase()
    );
    injectPromotion(filtered);
    setProducts(filtered);
  };

  const changeVendor = (vendor) => {
    if (vendor) {
      filterByVendor(vendor);
    } else {
      setProducts(productsQuery.data);
    }
  };

  const injectPromotion = (items) => {
    // prevent double promoting bug
    const promoted = items.find((i) => i.id === "uuid");
    if (promoted) return;

    const promotion = {
      id: "uuid",
      media: [{}, { url: "http://placehold.jp/380x380.png" }],
      name: "Promotion Card",
      order: 0,
      vendor: "buy today and get 10% off",
    };

    //inject at index 5
    if (items.length >= 5) {
      items.splice(4, 0, promotion);
    } else if (items.length > 0) {
      items.push(promotion);
    }
  };

  return (
    <Page>
      <div className="flex flex-col items-center">
        <div className="w-full mt-4 mb-12 flex justify-around">
          <div className="w-1/4">
            <Textfield onInput={(v) => setSearch(v)} />
          </div>
          <div className="flex-shrink mt-2 text-right">
            <DropDown items={vendorsQuery.data} onChange={changeVendor} />
          </div>
        </div>
        <div className="flex flex-wrap justify-center px-10 w-full">
          {productsQuery.status === "loading" ? (
            "Loading..."
          ) : productsQuery.status === "error" ? (
            <span>Error: {productsQuery.error.message}</span>
          ) : (
            <>
              {products.map((card) => (
                <div
                  className="my-4 w-1/3 flex justify-center"
                  key={card.id}
                  onClick={() => gotoProduct(card.id)}
                >
                  <Card
                    title={card.name}
                    subtitle={card.vendor}
                    imageUrl={card.media[1]?.url}
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

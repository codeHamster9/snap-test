import React from "react";
import Textfield from "../../core/Textfield";
import Card from "../../core/Card";
import useProducts from "../../hooks/api/useProducts";
import { useHistory } from "react-router-dom";

const Products = () => {
  const { isLoading, error, data } = useProducts();
  const history = useHistory();

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleClick = (id) => {
    history.push(`/product/${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="w-1/3"></div>
      <Textfield />
      <div className="flex flex-wrap">
        {data.map((card) => (
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
      </div>
    </div>
  );
};

export default Products;

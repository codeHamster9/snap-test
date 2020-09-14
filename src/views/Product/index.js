import React from "react";
import Card from "../../core/Card";
import NavBar from "../../core/NavBar";
import useProduct from "../../hooks/api/useProduct";
import { useParams } from "react-router-dom";

const Product = () => {
  const params = useParams();
  const { isLoading, error, data } = useProduct(params.id);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <NavBar title="Snappy" color="teal" />
      <div className="flex flex-col justify-center items-center mt-8">
        <Card
          title={data.name}
          subtitle={data.vendor}
          imageUrl={data.media[1].url}
        />
        <div className="m-4">
          <video
            autoPlay
            width="500"
            height="400"
            src={data.media[0].url}
          ></video>
        </div>
      </div>
    </>
  );
};

export default Product;

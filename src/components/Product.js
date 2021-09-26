import React from "react";

import { useStateValue } from "../StateProvider";

import rate from "../rate.svg";
import "./Product.css";

function Product({
  name,
  image,
  price,
  color,
  rating,
  releaseDate,
  categoryId,
}) {
  const [, dispatch] = useStateValue();
  const addingHandle = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        name,
        image,
        price,
        color,
        rating,
        releaseDate,
        categoryId,
      },
    });
    // console.log("basket");
  };
  return (
    <div className="product" style={{ boxShadow: `0px 00px 10px 0 ${color}` }}>
      <img src={image} alt={name} />
      <div className="product_info">
        <p className="name">{name}</p>
        <p className="product_price">
          <span style={{ display: "block" }} className="product_rating">
            {Array(rating)
              .fill()
              .map((_, i) => {
                return <img key={i} src={rate} alt="rate" />;
              })}
          </span>
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
      <button
        style={{
          borderColor: `${color}`,
          // backgroundClip: "text",
        }}
        onClick={addingHandle}
      >
        Add to basket
      </button>
    </div>
  );
}

export default Product;

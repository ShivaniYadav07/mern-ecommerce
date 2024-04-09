import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { useColorModeValue } from '@chakra-ui/react';

const CartItemCard = ({ item, deleteCartItems }) => {


  const fontColor = useColorModeValue('black', '#bfb1d9');
  return (
    <div className="CartItemCard" style={{ color: fontColor }}>
      <img src={item.image} alt="ssa" />
      <div>
        <Link style={{ color: fontColor }} to={`/product/${item.product}`}>{item.name}</Link>
        <span style={{ color: fontColor }}>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
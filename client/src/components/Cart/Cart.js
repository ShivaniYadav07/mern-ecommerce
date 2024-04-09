import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

const Cart = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart);
  const { colorMode } = useColorMode();

  const homeBgColor =
    colorMode === 'dark'
      ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
      : 'linear-gradient(to right, #565697, #bebef8)';
  const fontColor = useColorModeValue('black', '#bfb1d9');

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    nevigate("/shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart"  style={{ background: homeBgColor, color: fontColor }}>
          <RemoveShoppingCartIcon />

          <Typography  style={{ background: homeBgColor, color: fontColor }}>No Product in Your Cart</Typography>
          <Link to="/products"  style={{ background: homeBgColor, color: fontColor }}>View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage"  style={{ background: homeBgColor, color: fontColor }}>
            <div className="cartHeader"  style={{  color: fontColor }}>
              <p style={{ color: fontColor }}>Product</p>
              <p style={{ color: fontColor }}>Quantity</p>
              <p style={{ color: fontColor }}>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}  style={{ color: fontColor }}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems}  style={{  color: fontColor }}/>
                  <div className="cartInput"  style={{color: fontColor }}>
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                      style={{  color: fontColor }}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                      style={{ color: fontColor }}
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit"  style={{ background: homeBgColor, color: fontColor }}>
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler} style={{ color: fontColor }}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
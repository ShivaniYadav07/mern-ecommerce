import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

const OrderSuccess = () => {
  const { colorMode } = useColorMode();

  const homeBgColor =
    colorMode === 'dark'
      ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
      : 'linear-gradient(to right, #565697, #bebef8)';
  const fontColor = useColorModeValue('black', '#bfb1d9');
  return (
    <div className="orderSuccess"  style={{ background: homeBgColor, color: fontColor }}>
      <CheckCircleIcon style={{ color: fontColor }} />

      <Typography  style={{ background: homeBgColor, color: fontColor }}>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
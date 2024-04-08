import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

const NotFound = () => {
  const { colorMode } = useColorMode();
  
    const homeBgColor =
      colorMode === 'dark'
        ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
        : 'linear-gradient(to right, #565697, #bebef8)';
    const fontColor = useColorModeValue('black', '#bfb1d9');
  return (
    <div className="PageNotFound"  style={{ background: homeBgColor, color: fontColor }}>
      <ErrorIcon />

      <Typography  style={{ background: homeBgColor, color: fontColor }}>Page Not Found </Typography>
      <Link  style={{ background: homeBgColor, color: fontColor }} to="/">Home</Link>
    </div>
  );
};

export default NotFound;
import React from "react";
import "./Loader.css";
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

const Loader = () => {
  const { colorMode } = useColorMode();
  const fontColor = useColorModeValue('black', '#bfb1d9');
  const homeBgColor =
  colorMode === 'dark'
    ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
    : 'linear-gradient(to right, #565697, #bebef8)';
  return (
    <div className="loading"  style={{ background: homeBgColor, color: fontColor }}>
      <div></div>
    </div>
  );
};

export default Loader;
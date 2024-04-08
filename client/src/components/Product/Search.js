import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import MetaData from "../layout/MetaData";
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

const Search = () => {
  const navigate = useNavigate(); // Use the useNavigate hook from 'react-router-dom'
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  const { colorMode } = useColorMode();

  const homeBgColor =
    colorMode === 'dark'
      ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
      : 'linear-gradient(to right, #565697, #bebef8)';
  const fontColor = useColorModeValue('black', '#bfb1d9');

  return (
    <Fragment>
      <MetaData title='Search a Product --Ecommerce'  style={{ background: homeBgColor, color: fontColor }}/>
      <form className="searchBox" onSubmit={searchSubmitHandler}  style={{ background: homeBgColor, color: fontColor }}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
          style={{ color: fontColor }}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;

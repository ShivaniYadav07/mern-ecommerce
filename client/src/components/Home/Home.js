import React, { Fragment, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import './Home.css';
import img from "../image/rays.426980b9.png"
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import ProductCard from './ProductCard.js';
import { SimpleGrid } from '@chakra-ui/react';
import MetaData from "../layout/MetaData.js";
import { clearErrors, getProduct } from "../../actions/productAction.js"
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";

const Home = ({ products: propProducts }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.products)

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  const { colorMode } = useColorMode();

  const homeBgColor =
    colorMode === 'dark'
      ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
      : 'linear-gradient(to right, #565697, #bebef8)';
  const fontColor = useColorModeValue('black', '#bfb1d9');

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment >
          <MetaData title="Ecommerce" />
          <div className='banner' style={{ background: homeBgColor, color: fontColor }}>
            <Image
              src={img} // Replace with your actual image URL
              alt="Banner Image"
              style={{
                'position': 'absolute',
                'top': '0',
                'bottom': '80%',
                'left': '0',
                'right': '0',
                'boxSizing': 'border-box',
                'padding': '0',
                'border': 'none',
                'margin': 'auto',
                'display': 'inline-block',
                'maxWidth': '100%',
                'width': 'initial',
                'height': 'initial',
                'background': 'none',
                'opacity': '1',
                'overflow': 'hidden'
              }}
            />

            <p>Welcome to Ecommerce</p>
            <h1>Find Amazing Products Below</h1>

            <a href='#container'>
              <Button colorScheme='teal'>Scroll</Button>
            </a>
          </div>
          <h2 className='homeHeading' style={{ background: homeBgColor, color: fontColor }}>Featured Products</h2>
          <div className='banner_2' id='container' style={{ background: homeBgColor, color: fontColor }}>
            <SimpleGrid columns={[2, 4]} spacing='40px'>
              {products && products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </SimpleGrid>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

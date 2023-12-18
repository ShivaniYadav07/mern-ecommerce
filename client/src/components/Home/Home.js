import React, { Fragment, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import './Home.css';
import img from "../image/rays.426980b9.png"
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import Product from './Product.js';
import { SimpleGrid } from '@chakra-ui/react';
import MetaData from "../layout/MetaData.js";
import {getProduct} from "../../actions/productAction.js"
import {useSelector, useDispatch} from "react-redux"

const product = {
  name: 'Black Tshirt',
  images: [{ url:'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fb3%2Fc1%2Fb3c1b984562210876925d6c994106ecc470f55af.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]'}],
  price:'$120',
  _id: 'shivani',
}

const Home = () => {
  const dispatch = useDispatch();
  const {loading, error, products, productCount } = useSelector(state => state.products)

  useEffect(() => {
dispatch(getProduct());
  }, [dispatch])
  const { colorMode } = useColorMode();

  // Define a variable to store the background color based on the color mode
  const homeBgColor =
    colorMode === 'dark'
      ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
      : 'linear-gradient(to right, #565697, #bebef8)';
  const fontColor = useColorModeValue('black', '#bfb1d9');

  return (
    <Fragment>
      <MetaData title="Ecommerce"/>
      <div className='banner' style={{ background: homeBgColor, color: fontColor }}>
        <Image
          src={img} // Replace with your actual image URL
          alt="Banner Image"
          style={{ 'position': 'absolute',
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
      <h2 className='homeHeading' style={{color: fontColor }}>Featured Products</h2>
      <div className='container' id='container' style={{ color: fontColor }}>
      <SimpleGrid columns={[2, null, 4]} spacing='40px'>
        {products && products.map(product => (
          <Product product={product}/>
        ))}
      </SimpleGrid>
      </div>
    </Fragment>
  );
};

export default Home;

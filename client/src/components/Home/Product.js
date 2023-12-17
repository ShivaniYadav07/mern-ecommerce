import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {Link} from 'react-router-dom';
import {  useColorModeValue } from '@chakra-ui/react';
const options ={
    edit:false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    value: 2.5,
    isHalf: true,
    size: window.innerWidth < 600 ? 20: 25,
}
const Product = ({product}) => {
    
  const fontColor = useColorModeValue('black', '#bfb1d9');

  return (
    <Link className='productCard' to={product._id}>
        <img src={product.images[0].url} alt={product.name}/>
        <p style={{ color: fontColor }}>{product.name}</p>
        <div>
            <ReactStars {...options} />
            <span style={{ color: fontColor }}>(256 Reviews)</span>
        </div>
        <span>{product.price}</span>
    </Link>
  )
}

export default Product

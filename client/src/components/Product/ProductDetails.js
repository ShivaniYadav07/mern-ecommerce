import React, { Fragment, useEffect } from 'react';
// import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import {useSelector, useDispatch} from "react-redux";
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  let params = useParams();
  // console.log(params);
  const dispatch = useDispatch();

  const {product, loading, error} = useSelector((state) =>state.productDetails)

  useEffect(() => {
    dispatch(getProductDetails(params.id))
  }, [dispatch, params.id])
  return (
    <Fragment>
      <div className='ProductDetails'>
      <div>
          {product.images && product.images.map((item, i) =>(
            <img className='CarouselImage' key={i} src={item.url} alt={`${i} Slide`}/>
          ))}
      </div>
      </div>
    </Fragment>
  )
}

export default ProductDetails

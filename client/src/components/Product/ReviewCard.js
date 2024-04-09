import ReactStars from 'react-rating-stars-component';
import React from "react";
import profile from "../image/profile.png";
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

const ReviewCard = ({ review }) => {
  const { colorMode } = useColorMode();

  const homeBgColor =
    colorMode === 'dark'
      ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
      : 'linear-gradient(to right, #565697, #bebef8)';
  const fontColor = useColorModeValue('black', '#bfb1d9');
  const options = {
    value: review.rating,
    readOnly: false,
    precision: 0.5,
    name: `review-${review.id}`,
  };

  return (
    <div className="reviewCard"  style={{ background: homeBgColor, color: fontColor }}>
      <img src={profile} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
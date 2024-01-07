import ReactStars from 'react-rating-stars-component';
import React from "react";
import profile from "../image/profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: false,
    precision: 0.5,
    name: `review-${review.id}`,
  };

  return (
    <div className="reviewCard">
      <img src={profile} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
import React from 'react';

const StarRating = ({ value, readOnly }) => {
  // Calculate the number of filled stars
  const filledStars = Math.round(value);

  // Generate an array of star elements
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= filledStars ? 'star filled' : 'star'}>
        &#9733;
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;

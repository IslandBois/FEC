import axios from 'axios';
import React, {
  useContext, useState, useEffect,
} from 'react';

import AppContext from '../../context.js';

import Star from './Star.jsx';

const ReviewForm = () => {
  const { currentProduct, currentReview } = useContext(AppContext);

  const characteristicRatings = ['poor', 'fair', 'average', 'good', 'great'];

  const [charIDs, setCharIDs] = useState();

  const [newReview, setNewReview] = useState();

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };
  const handleChangeInt = (e) => {
    setNewReview({ ...newReview, [e.target.name]: Number(e.target.value) });
  };
  const handleChangeBool = (e) => {
    if (e.target.value === 'true') {
      setNewReview({ ...newReview, [e.target.name]: true });
    } else {
      setNewReview({ ...newReview, [e.target.name]: false });
    }
  };
  const handleChangeChar = (e) => {
    const ratingNum = characteristicRatings.indexOf(e.target.id) + 1;
    newReview.characteristics[e.target.name] = ratingNum;
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    axios.post('/reviews', (newReview))
      .then((res) => console.log(res))
      .then(setNewReview({
        product_id: currentProduct.id, rating: 0, summary: '', body: '', recommend: false, name: '', email: '', photos: [], characteristics: {},
      }))
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  useEffect(() => {
    if (currentReview.characteristics) {
      const ids = [];
      Object.keys(currentReview.characteristics).forEach((key) => {
        ids.push([currentReview.characteristics[key]?.id, key]);
      });

      setCharIDs(ids);

      setNewReview(
        {
          product_id: currentProduct.id, rating: '', summary: '', body: '', recommend: false, name: '', email: '', photos: [], characteristics: {},
        },
      );
    }
  }, [currentReview]);

  if (!charIDs) { return (<h1>Loading form</h1>); }

  return (

    <div id="addReviewForm">
      <h1>Write Your Review</h1>
      <h3>
        About the
        {' '}
        <strong>{currentProduct.name}</strong>
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="formElement overallRating">
          <span className="chooseStars">
            <p>Overall Rating:</p>
            <Star index={1} average={5} />
            <input type="number" id="chooseStars" name="rating" min="1" max="5" value={Number(newReview.rating)} onChange={handleChangeInt} />
          </span>
        </div>
        <div className="formElement doYouRec">
          <p>Do you reccomend this product?</p>
          <div>
            <input type="radio" id="true" name="recommend" value="true" onChange={handleChangeBool} />
            <label htmlFor="true">Yes, absolutely!</label>
          </div>
          <div>
            <input type="radio" id="false" name="recommend" value="false" onChange={handleChangeBool} />
            <label htmlFor="false">No way...</label>
          </div>
        </div>
        <div className="formElement characteristics">
          <h3>Product Characteristic Ratings: </h3>
          {charIDs.map((tuple) => {
            const id = tuple[0];
            const name = tuple[1];
            return (
              <span className="characteristic" key={Math.random()}>
                <h3>
                  {name}
                  :
                </h3>
                {characteristicRatings.map((rating) => (
                  <span key={Math.random()}>
                    <input type="radio" id={rating} name={id} value={name} onChange={handleChangeChar} />
                    <label htmlFor={rating}>{rating[0].toUpperCase() + rating.slice(1)}</label>
                  </span>
                ))}
              </span>
            );
          })}
        </div>
        <div className="formElement reviewInput">
          <h3>Review Summary: </h3>
          <input type="text" id="reviewSummary" className="textInput" name="summary" value={newReview.summary} maxLength="60" placeholder="Example: Best on the island!" onChange={handleChange} required />
        </div>
        <div className="formElement reviewBody">
          <h3>Review Body: </h3>
          <textarea id="reviewBody" rows="5" cols="44" name="body" value={newReview.body} placeholder="Why did you like (or not like) the product?" onChange={handleChange} required />
        </div>
        <div className="formElement addPhoto">
          <h3>User Photos: </h3>
          <button type="button">
            Add a photo!
          </button>
        </div>
        <div className="formElement reviewInput">
          <h3>What is your nickname?: </h3>
          <input type="text" id="userNickname" className="textInput" name="name" value={newReview.name} maxLength="60" placeholder="Example: islandBoi123" onChange={handleChange} required />
          <h5>**For privacy reasons, do not use your full name or email address</h5>
        </div>
        <div className="formElement reviewInput">
          <h3>What is your email address?: </h3>
          <input type="text" id="userEmail" className="textInput" name="email" value={newReview.email} maxLength="60" placeholder="Example: islandBoi123@email.com" onChange={handleChange} required />
          <h5>**For authentication reassons, you will not be emailed</h5>
        </div>
        <button type="submit" id="submitForm">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;

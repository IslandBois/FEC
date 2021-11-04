/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './components/Overview/Overview.jsx';
import Related from './components/Related/Related.jsx';
import Reviews from './components/Reviews/Reviews.jsx';
import AppContext from './context.js';

const App = () => {
  const [currentProduct, setCurrentProduct] = useState([]);
  const [currentReview, setCurrentReview] = useState([]);
  const [average, setAverage] = useState();

  const calcReviewsAverage = (data) => {
    let sum = 0;
    let count = 0;
    Object.keys(data.ratings).forEach((rating) => {
      sum += rating * data.ratings[rating];
      count += Number(data.ratings[rating]);
    });
    setAverage(Number((sum / count).toFixed(2)));
  };

  const getReviewData = (id) => {
    const productID = id;
    axios({
      method: 'GET',
      url: `/reviews/meta/?product_id=${productID}`,
    })
      .then((res) => {
        setCurrentReview(res.data);
        calcReviewsAverage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/products',
    })
      .then((res) => {
        setCurrentProduct(res.data[0]);
        getReviewData(res.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {

  }, [average]);

  return (
    <AppContext.Provider value={{
      currentProduct, currentReview, average,
    }}
    >
      <div>
        <h1>Da Island Bois</h1>
        <Overview />
        <Related />
        <Reviews />
      </div>
    </AppContext.Provider>
  );
};

export default App;

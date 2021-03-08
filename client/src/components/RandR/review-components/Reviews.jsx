import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import Stars from '../../common/Stars';

import axios from 'axios';

import '../../../css/RandR/Reviews/Reviews.css';
import { RatingContext } from '../../common/AppContext';

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getReviews = async (page, count) => {
    const response = await axios.get('/reviews', {
      params: {
        productId, page, count
      }})
      .catch((error) => console.log(error.data));

      return response.data;
  }

  const getSortedReviews = async (sort) => {
    const response = axios.get('/reviews', {
      params: {
        productId: productId,
        sort: sort
      }
    })
      .catch((error) => console.log(error));

    return response.data;
  }

  const getAllReviews = async () => {
    let page = 1;
    let count = 10;
    const getPartialReviews = async () => {
      let reviews = await getReviews(page, count);

      if (reviews.results.length < count) {
        return reviews.results;
      } else {
        return getPartialReviews(count *= 2)
      }
    }
    setReviews(await getPartialReviews());
  }

  const { rating, setRating } = useContext(RatingContext);

  useEffect( async () => {
    await getAllReviews();
    setIsLoading(false);
  }, [])

  if(isLoading) {
    return 'Reviews are loading...';
  }

  return (
    <Container>
      <Row>{reviews.length} reviews, sorted by

      </Row>

    </Container>
  )
};

export default Reviews;

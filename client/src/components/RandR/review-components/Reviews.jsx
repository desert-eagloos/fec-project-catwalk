import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import Rating from 'react-rating';
import { roundToNearestQuarter } from '../../../utils/ratings';

import axios from 'axios';

import '../../../css/RandR/Reviews/Reviews.css';
import { RatingContext } from '../../common/AppContext';

const Reviews = ({ productId }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [sortReviewBy, setSortReviewBy] = useState('relevance');
  const [isLoading, setIsLoading] = useState(true);
  const [reviewCount, setReviewCount] = useState(2);
  const [showMoreReviews, setShowMoreReviews] = useState(true);
  const [showMoreReviewsButton, setShowMoreReviewsButton] = useState(true);

  const getReviewsFromAPI = async (page, count, sort) => {
    const response = await axios.get('/reviews', {
      params: {
        productId, page, count, sort
      }})
      .catch((error) => console.log(error.data));
      return response.data;
    }

    const getAllReviewsFromAPI = async (sortBy  = 'relevant') => {
      let page = 1;
      let count = 10;
      const getPartialReviews = async () => {

        let reviews = await getReviewsFromAPI(page, count, sortBy);
        console.log('reviews from api call', reviews);

      if (reviews.results.length < count) {
        return reviews.results;
      } else {
        return getPartialReviews(count *= 2)
      }
    }
    return await getPartialReviews();
  }


  useEffect( async () => {
    const unsortedReviews = await getAllReviewsFromAPI();
    setAllReviews(unsortedReviews);
    setShowMoreReviewsButton(!showMoreReviewsButton);
    setIsLoading(false);
  }, [])

  useEffect( () => {
    reviewCount < allReviews.length ? setShowMoreReviews(true) : setShowMoreReviews(false);
  }, [showMoreReviewsButton])

  useEffect( async () => {
    const sortedReviews = await getAllReviewsFromAPI(sortReviewBy);
    setAllReviews(sortedReviews);
    renderReviewsComponent();
  }, [sortReviewBy])

  if(isLoading) {
    return 'Reviews are loading...';
  }

  const getReviews = () => {
    return allReviews.slice(0, reviewCount);
  }

  const renderReviews = () => {
    const reviews = getReviews();
    return ( reviews.map((review, index) => (
          <div key={`review${index}`}>
              <Row>
                <Col>
                  <Rating
                    key={`rating${index}`}
                    emptySymbol="fa fa-star-o"
                    fullSymbol="fa fa-star"
                    initialRating={roundToNearestQuarter(review.rating)}
                    fractions={4}
                    readonly={true}
                  />
                </Col>
                <Col>{review.reviewer_name.toLowerCase()}, {new Date(review.date).toDateString()}</Col>
              </Row>
              <Row>{ review.summary.length > 60 ? review.summary.substring(0, 60) + '...' : review.summary } </Row>
              <Row>{ review.summary.length > 60 ? review.summary.substring(61) + '...\n\n' + review.body : review.body }</Row>
              <Row>
                <Col>Helpful? Yes &nbsp;{review.helpfulness}</Col>
                <Col>| Report</Col>
              </Row>
          </div>
        ))
    )
  }

  const renderReviewTotalAndSort = () => {
    return (
      <Row>
        {allReviews.length} reviews, sorted by &nbsp;
        <DropdownButton id="sortBy" title={sortReviewBy}>
          <Dropdown.Item key="1" eventKey="relevance" onSelect={(eventKey) => {setSortReviewBy(eventKey)}} active>relevance</Dropdown.Item>
          <Dropdown.Item key="2" eventKey="newest" onSelect={(eventKey) => {setSortReviewBy(eventKey)}}>newest</Dropdown.Item>
          <Dropdown.Item key="3" eventKey="helpfulness" onSelect={(eventKey) => {setSortReviewBy(eventKey)}}>helpfulness</Dropdown.Item>
        </DropdownButton>
      </Row>
    )
  }

  const renderReviewButtons = () => {
    return (
      <>
        <Col>
        {
          showMoreReviews ?
            <Button onClick={ () => {
              setReviewCount(reviewCount + 2);
              setShowMoreReviewsButton(!showMoreReviewsButton);
            } }>More Review</Button>
          : ''
        }
        </Col>
        <Col>
          <Button>Add a Review</Button>
        </Col>
      </>
    )
  }

  const renderReviewsComponent = () => {
    return (
      <Container>
        <Row> { renderReviewTotalAndSort() } </Row>
        <Row> { renderReviews() } </Row>
        <Row> { renderReviewButtons() } </Row>
      </Container>
    )
  }

  return (
    <>
      { renderReviewsComponent() }
    </>
  )
};

export default Reviews;

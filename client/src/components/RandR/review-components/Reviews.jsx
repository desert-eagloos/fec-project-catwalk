import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Button, Dropdown, DropdownButton,
} from 'react-bootstrap';
import Rating from 'react-rating';
import PropTypes from 'prop-types';
import { roundToNearestQuarter } from '../../../utils/ratings';

import '../../../css/RandR/Reviews/Reviews.css';

const Reviews = ({ productId }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [sortReviewBy, setSortReviewBy] = useState('relevant');
  const [isLoading, setIsLoading] = useState(true);
  const [reviewCount, setReviewCount] = useState(2);
  const [showMoreReviews, setShowMoreReviews] = useState(true);
  const [showMoreReviewsButton, setShowMoreReviewsButton] = useState(true);

  const getReviewsFromAPI = async (page, count, sort) => {
    const response = await axios.get('/reviews', {
      params: {
        productId, page, count, sort,
      },
    });
    return response.data;
  };

  const getAllReviewsFromAPI = async (sortBy = 'relevant') => {
    const getPartialReviews = async (count = 10) => {
      const reviews = await getReviewsFromAPI(1, count, sortBy);

      if (reviews.results.length < count) {
        return reviews.results;
      }
      const thisCount = count * 2;
      return getPartialReviews(thisCount);
    };
    return getPartialReviews();
  };

  const getReviews = () => allReviews.slice(0, reviewCount);

  const rand = () => Math.floor(Math.random() * 1);

  const renderReviews = () => {
    const reviews = getReviews();
    return (reviews.map((review, index) => (
      <div key={`review${index + rand()}`}>
        <Row>
          <Col>
            <Rating
              key={`rating${index + rand()}`}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star"
              initialRating={roundToNearestQuarter(review.rating)}
              fractions={4}
              readonly
            />
          </Col>
          <Col>
            {review.reviewer_name.toLowerCase()}
            ,
            {' '}
            {new Date(review.date).toDateString()}
          </Col>
        </Row>
        <Row>
          { review.summary.length > 60 ? `${review.summary.substring(0, 60)}...` : review.summary }
          {' '}
        </Row>
        <Row>{ review.summary.length > 60 ? `${review.summary.substring(61)} \n\n ${review.body}` : review.body }</Row>
        <Row>
          <Col>
            Helpful? Yes &nbsp;
            {review.helpfulness}
          </Col>
          <Col>| Report</Col>
        </Row>
      </div>
    ))
    );
  };

  const renderReviewTotalAndSort = () => (
    <Row>
      {allReviews.length}
      {' '}
      reviews, sorted by &nbsp;
      <DropdownButton id="sortBy" title={sortReviewBy}>
        <Dropdown.Item key="1" eventKey="relevance" onSelect={(eventKey) => { setSortReviewBy(eventKey); }} active>relevance</Dropdown.Item>
        <Dropdown.Item key="2" eventKey="newest" onSelect={(eventKey) => { setSortReviewBy(eventKey); }}>newest</Dropdown.Item>
        <Dropdown.Item key="3" eventKey="helpfulness" onSelect={(eventKey) => { setSortReviewBy(eventKey); }}>helpfulness</Dropdown.Item>
      </DropdownButton>
    </Row>
  );

  const renderReviewButtons = () => (
    <>
      <Col>
        {
          showMoreReviews
            ? (
              <Button onClick={() => {
                setReviewCount(reviewCount + 2);
                setShowMoreReviewsButton(!showMoreReviewsButton);
              }}
              >
                More Review
              </Button>
            )
            : ''
        }
      </Col>
      <Col>
        <Button>Add a Review</Button>
      </Col>
    </>
  );

  const renderReviewsComponent = () => (
    <Container>
      <Row>
        {' '}
        { renderReviewTotalAndSort() }
        {' '}
      </Row>
      <Row>
        {' '}
        { renderReviews() }
        {' '}
      </Row>
      <Row>
        {' '}
        { renderReviewButtons() }
        {' '}
      </Row>
    </Container>
  );

  useEffect(async () => {
    const unsortedReviews = await getAllReviewsFromAPI();
    setAllReviews(unsortedReviews);
    setShowMoreReviewsButton(!showMoreReviewsButton);
    setIsLoading(false);
  }, []);

  useEffect(async () => {
    const sortedReviews = await getAllReviewsFromAPI(sortReviewBy);
    setAllReviews(sortedReviews);
    renderReviewsComponent();
  }, [sortReviewBy]);

  useEffect(() => {
    if (reviewCount < allReviews.length) {
      setShowMoreReviews(true);
    } else {
      setShowMoreReviews(false);
    }
  }, [showMoreReviewsButton]);

  if (isLoading) {
    return 'Reviews are loading...';
  }

  return (
    <>
      { renderReviewsComponent() }
    </>
  );
};

Reviews.propTypes = {
  productId: PropTypes.number,
};

Reviews.defaultProps = {
  productId: 18201,
};

export default Reviews;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Button, Dropdown, DropdownButton, Modal, Form,
} from 'react-bootstrap';
import Rating from 'react-rating';
import PropTypes from 'prop-types';
import _ from 'underscore';

import { roundToNearestQuarter } from '../../../utils/ratings';

import '../../../css/RandR/Reviews/Reviews.css';
import SizeRatingRadio from './SizeRatingRadio';
import WidthRatingRadio from './WidthRatingRadio';
import ComfortRatingRadio from './ComfortRatingRadio';
import LengthRatingRadio from './LengthRatingRadio';
import QualityRatingRadio from './QualityRatingRadio';
import FitRatingRadio from './FitRatingRadio';

const Reviews = ({ productId }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [sortReviewBy, setSortReviewBy] = useState('relevant');
  const [isLoading, setIsLoading] = useState(true);
  const [reviewCount, setReviewCount] = useState(2);
  const [showMoreReviews, setShowMoreReviews] = useState(true);
  const [showMoreReviewsButton, setShowMoreReviewsButton] = useState(true);
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);
  const [productCharacteristics, setProductCharacteristics] = useState({});

  const handleShowAddReviewForm = () => setShowAddReviewForm(true);
  const handleCloseAddReviewForm = () => setShowAddReviewForm(false);
  const handleSubmitReview = () => 'here';

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

  const getProductCharacteristics = async () => {
    const result = await axios.get(`/reviews/meta?productId=${productId}`);
    const chars = result.data.characteristics;
    setProductCharacteristics(_.map(chars, (char, key) => {
      const prodRadio = [];
      switch (key) {
        case 'Comfort':
          prodRadio.push(<ComfortRatingRadio key="cfr" />);
          break;
        case 'Size':
          prodRadio.push(<SizeRatingRadio key="srr" />);
          break;
        case 'Fit':
          prodRadio.push(<FitRatingRadio key="frr" />);
          break;
        case 'Width':
          prodRadio.push(<WidthRatingRadio key="wrr" />);
          break;
        case 'Quality':
          prodRadio.push(<QualityRatingRadio key="qrr" />);
          break;
        case 'Length':
          prodRadio.push(<LengthRatingRadio key="lrr" />);
          break;
        default:
      }
      return prodRadio;
    }));
  };

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
          {review.summary.length > 60 ? `${review.summary.substring(0, 60)}...` : review.summary}
          {' '}
        </Row>
        <Row>{review.summary.length > 60 ? `${review.summary.substring(61)} \n\n ${review.body}` : review.body}</Row>
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
        <Button onClick={handleShowAddReviewForm}>Add a Review</Button>
        <Modal show={showAddReviewForm} onHide={handleCloseAddReviewForm} backdrop="static" keyboard={false} centered size="xl">
          <Container className="p-4">
            <Modal.Header closeButton>
              <Modal.Title>Add a Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <fieldset>
                <Form>
                  <Container>
                    <Form.Group as={Row} controlId="formStarRating">
                      <fieldset>
                        <Col>
                          <Form.Label as="legend">Star Rating</Form.Label>
                        </Col>
                        <Col>
                          <Rating
                            emptySymbol="fa fa-star-o"
                            fullSymbol="fa fa-star"
                            initialRating={0}
                          />
                        </Col>
                      </fieldset>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formRecommendation">
                      <fieldset>
                        <Col>
                          <Form.Label as="legend">Do you recommend this product?</Form.Label>
                        </Col>
                        <Col>
                          <Form.Check inline label="Yes" type="radio" name="recommended" id="recommend-1" value="true" />
                          <Form.Check inline label="No" type="radio" name="recommended" id="recommend-2" value="false" />
                        </Col>
                      </fieldset>
                    </Form.Group>
                    <fieldset>
                      <Form.Group as={Row} controlId="formCharacteristics">
                        <Col className="mt-3">
                          <Form.Label as="legend">Characteristics</Form.Label>
                        </Col>
                      </Form.Group>
                      <Row className="justify-content-center">
                        {
                          _.map(productCharacteristics, (chars) => chars)
                        }
                      </Row>
                    </fieldset>
                  </Container>
                </Form>
              </fieldset>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleCloseAddReviewForm}>Cancel</Button>
              <Button onClick={handleSubmitReview}>Submit Review</Button>
            </Modal.Footer>
          </Container>
        </Modal>
      </Col>
    </>
  );

  const renderReviewsComponent = () => (
    <Container>
      <Row>
        {' '}
        {renderReviewTotalAndSort()}
        {' '}
      </Row>
      <Row>
        {' '}
        {renderReviews()}
        {' '}
      </Row>
      <Row>
        {' '}
        {renderReviewButtons()}
        {' '}
      </Row>
    </Container>
  );

  useEffect(async () => {
    const unsortedReviews = await getAllReviewsFromAPI();
    setAllReviews(unsortedReviews);
    setShowMoreReviewsButton(!showMoreReviewsButton);
    getProductCharacteristics();
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
      { renderReviewsComponent()}
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

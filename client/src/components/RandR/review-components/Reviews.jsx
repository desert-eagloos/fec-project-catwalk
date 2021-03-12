import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Button, Dropdown, DropdownButton, Modal, Form, Card, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'underscore';

import { roundToNearestQuarter } from '../../../utils/ratings';

import '../../../css/RandR/Reviews/Reviews.css';
import SizeRatingRadio from './subcomponents/SizeRatingRadio';
import WidthRatingRadio from './subcomponents/WidthRatingRadio';
import ComfortRatingRadio from './subcomponents/ComfortRatingRadio';
import LengthRatingRadio from './subcomponents/LengthRatingRadio';
import QualityRatingRadio from './subcomponents/QualityRatingRadio';
import FitRatingRadio from './subcomponents/FitRatingRadio';
import Stars from '../../common/Stars';

const Reviews = ({ productId }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [sortReviewBy, setSortReviewBy] = useState('relevant');
  const [isLoading, setIsLoading] = useState(true);
  const [reviewCount, setReviewCount] = useState(2);
  const [showMoreReviews, setShowMoreReviews] = useState(true);
  const [showMoreReviewsButton, setShowMoreReviewsButton] = useState(true);
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);
  const [showReviewSubmitted, setShowReviewSubmitted] = useState(false);
  const [productCharacteristics, setProductCharacteristics] = useState({});
  const [characteristicsRating, setCharacteristicsRating] = useState({});
  const [userReviewRatings, setUserReviewRatings] = useState({
    product_id: productId,
    rating: 0,
    summary: '',
    body: '',
    recommend: false,
    name: '',
    email: '',
    photos: [''],
  });

  const handleShowAddReviewForm = () => setShowAddReviewForm(true);
  const handleCloseAddReviewForm = () => setShowAddReviewForm(false);
  const handleShowReviewSubmitted = () => setShowReviewSubmitted(true);
  const handleCloseSuccessForm = () => setShowReviewSubmitted(false);
  const handleUserReviewRatings = (e) => {
    setUserReviewRatings((prevState) => ({
      ...prevState,
      [e.target.name]: typeof e.target.value === 'boolean'
        ? Boolean(e.target.value) : e.target.value,
    }));
  };
  const handleCharacteristicsRatings = (e) => {
    setCharacteristicsRating((prevState) => ({
      ...prevState,
      [e.target.name]: Number(e.target.value),
    }));
  };
  const handleStarRating = (value) => setUserReviewRatings({ ...userReviewRatings, rating: value });

  const handleSubmitReviewButton = async () => {
    const fullReview = { ...userReviewRatings };
    fullReview.characteristics = characteristicsRating;

    const response = await axios.post('/reviews', fullReview);
    if (response.status === 201) {
      handleCloseAddReviewForm();
      handleShowReviewSubmitted();
    }
  };

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
    const { characteristics } = result.data;
    setProductCharacteristics(_.map(characteristics, (characteristic, key) => {
      const prodRadio = [];
      switch (key) {
        case 'Comfort':
          prodRadio.push(<ComfortRatingRadio name={characteristic.id} handleCharacteristicsRatings={handleCharacteristicsRatings} key="cfr" />);
          break;
        case 'Size':
          prodRadio.push(<SizeRatingRadio name={characteristic.id} handleCharacteristicsRatings={handleCharacteristicsRatings} key="srr" />);
          break;
        case 'Fit':
          prodRadio.push(<FitRatingRadio name={characteristic.id} handleCharacteristicsRatings={handleCharacteristicsRatings} key="frr" />);
          break;
        case 'Width':
          prodRadio.push(<WidthRatingRadio name={characteristic.id} handleCharacteristicsRatings={handleCharacteristicsRatings} key="wrr" />);
          break;
        case 'Quality':
          prodRadio.push(<QualityRatingRadio name={characteristic.id} handleCharacteristicsRatings={handleCharacteristicsRatings} key="qrr" />);
          break;
        case 'Length':
          prodRadio.push(<LengthRatingRadio name={characteristic.id} handleCharacteristicsRatings={handleCharacteristicsRatings} key="lrr" />);
          break;
        default:
      }
      return prodRadio;
    }));
  };

  const renderReviews = () => {
    const reviews = getReviews();
    return (reviews.map((review) => (
      <div key={review.review_id}>
        <Card style={{ minWidth: '36rem' }} className="mt-2 mb-2">
          <Card.Body>
            <Card.Subtitle>
              <Row className="mt-2 mb-2">
                <Col sm={4} className="d-flex justify-content-start">
                  <Stars rating={roundToNearestQuarter(review.rating)} fractions={4} readOnly />
                </Col>
                <Col sm={8} className="d-flex justify-content-end">{`${review.reviewer_name.toLowerCase()}, ${new Date(review.date).toDateString()}`}</Col>
              </Row>
            </Card.Subtitle>
            <Card.Title className="mt-2 mb-2">{review.summary.length > 60 ? `${review.summary.substring(0, 60)}...` : review.summary}</Card.Title>
            <Card.Text>{review.summary.length > 60 ? `${review.summary.substring(61)} \n\n ${review.body}` : review.body}</Card.Text>
          </Card.Body>
          <Row className="d-flex justify-content-around align-items-center mb-2">
            {
              review.photos.length
                ? review.photos.map((photo) => (
                  <Col key={photo.id}>
                    <Image id={photo.id} src={photo.url} style={{ maxWidth: '15rem', boxShadow: '.5rem .5rem 1rem' }} />
                  </Col>
                ))
                : <></>
            }
          </Row>
          <Card.Footer>
            <Row>
              <Col>
                {`Helpful? Yes (${review.helpfulness}) | Report`}
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </div>
    ))
    );
  };

  const renderReviewTotalAndSort = () => (
    <Row>
      {allReviews.length}
      {' '}
      reviews, sorted by &nbsp;
      <DropdownButton size="sm" id="sortBy" title={sortReviewBy}>
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
                          <Stars
                            rating={userReviewRatings.rating}
                            fractions={1}
                            handleStarRating={handleStarRating}
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
                          <Form.Check onClick={handleUserReviewRatings} inline label="Yes" type="radio" name="recommend" id="recommend-1" value="true" />
                          <Form.Check onClick={handleUserReviewRatings} inline label="No" type="radio" name="recommend" id="recommend-2" value="false" />
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
                    <fieldset>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formUserInfoName">
                          <Form.Label> Name </Form.Label>
                          <Form.Control
                            required
                            name="name"
                            type="text"
                            placeholder="Name"
                            onChange={handleUserReviewRatings}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formUserInfoEmail">
                          <Form.Label> Email </Form.Label>
                          <Form.Control
                            required
                            name="email"
                            type="email"
                            placeholder="send@email.com"
                            onChange={handleUserReviewRatings}
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formReviewSummary">
                          <Form.Label>Review Title</Form.Label>
                          <Form.Control
                            required
                            name="summary"
                            type="text"
                            placeholder="Provide a summary of your review"
                            onChange={handleUserReviewRatings}
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formReviewBody">
                          <Form.Label>Tell us more</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="body"
                            required
                            type="textarea"
                            placeholder="What else can you say about our product?"
                            onChange={handleUserReviewRatings}
                          />
                        </Form.Group>
                      </Form.Row>
                    </fieldset>
                  </Container>
                </Form>
              </fieldset>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleCloseAddReviewForm}>Cancel</Button>
              <Button onClick={handleSubmitReviewButton}>Submit Review</Button>
            </Modal.Footer>
          </Container>
        </Modal>
        <Modal show={showReviewSubmitted} onHide={handleCloseSuccessForm} centered size="sm">
          <Modal.Header closeButton>
            <Modal.Title>Review Submitted</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Thank you for your feedback!
            <Button onClick={handleCloseSuccessForm}>Close</Button>
          </Modal.Body>

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
  }, [productId]);

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

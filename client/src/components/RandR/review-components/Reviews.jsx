import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Button, Dropdown, DropdownButton, Modal, Form,
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
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);

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
                        <Form.Group as={Col} controlId="formSizeRating">
                          <fieldset>
                            <Row>
                              <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
                                <span>
                                  <Form.Label as="legend">Size</Form.Label>
                                </span>
                              </Col>
                              <Col xs={10}>
                                <Form.Check type="radio" label="A size too small     " name="sizeRating" id="sizeRatingRadio1" value="1" />
                                <Form.Check type="radio" label="1/2 a size too small " name="sizeRating" id="sizeRatingRadio2" value="2" />
                                <Form.Check type="radio" label="Perfect              " name="sizeRating" id="sizeRatingRadio3" value="3" />
                                <Form.Check type="radio" label="1/2 a size too big   " name="sizeRating" id="sizeRatingRadio4" value="4" />
                                <Form.Check type="radio" label="A size too big       " name="sizeRating" id="sizeRatingRadio5" value="5" />
                              </Col>
                            </Row>
                          </fieldset>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formWidthRating">
                          <fieldset>
                            <Row>
                              <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
                                <span>
                                  <Form.Label as="legend">Width</Form.Label>
                                </span>
                              </Col>
                              <Col xs={10}>
                                <Form.Check type="radio" label="Too Narrow       " name="widthRating" id="widthRatingRadio1" value="1" />
                                <Form.Check type="radio" label="Slightly Narrow  " name="widthRating" id="widthRatingRadio2" value="2" />
                                <Form.Check type="radio" label="Perfect          " name="widthRating" id="widthRatingRadio3" value="3" />
                                <Form.Check type="radio" label="Slightly Wide    " name="widthRating" id="widthRatingRadio4" value="4" />
                                <Form.Check type="radio" label="Too Wide         " name="widthRating" id="widthRatingRadio5" value="5" />
                              </Col>
                            </Row>
                          </fieldset>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formComfortRating">
                          <fieldset>
                            <Row>
                              <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
                                <span>
                                  <Form.Label as="legend">Comfort</Form.Label>
                                </span>
                              </Col>
                              <Col xs={10}>
                                <Form.Check type="radio" label="Uncomfortable        " name="comfortRating" id="comfortRatingRadio1" value="1" />
                                <Form.Check type="radio" label="Slightly Uncomfortable " name="comfortRating" id="comfortRatingRadio2" value="2" />
                                <Form.Check type="radio" label="Ok                   " name="comfortRating" id="comfortRatingRadio3" value="3" />
                                <Form.Check type="radio" label="Comfortable          " name="comfortRating" id="comfortRatingRadio4" value="4" />
                                <Form.Check type="radio" label="Perfect              " name="comfortRating" id="comfortRatingRadio5" value="5" />
                              </Col>
                            </Row>
                          </fieldset>
                        </Form.Group>
                      </Row>
                      <Row className="justify-content-center">
                        <Form.Group as={Col} controlId="formQualityRating">
                          <fieldset>
                            <Row>
                              <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
                                <span>
                                  <Form.Label as="legend">Quality</Form.Label>
                                </span>
                              </Col>
                              <Col xs={10}>
                                <Form.Check type="radio" label="Poor            " name="qualityRating" id="qualityRatingRadio1" value="1" />
                                <Form.Check type="radio" label="Below Average   " name="qualityRating" id="qualityRatingRadio2" value="2" />
                                <Form.Check type="radio" label="What I expected " name="qualityRating" id="qualityRatingRadio3" value="3" />
                                <Form.Check type="radio" label="Pretty Great    " name="qualityRating" id="qualityRatingRadio4" value="4" />
                                <Form.Check type="radio" label="Perfect         " name="qualityRating" id="qualityRatingRadio5" value="5" />
                              </Col>
                            </Row>
                          </fieldset>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formLengthRating">
                          <fieldset>
                            <Row>
                              <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
                                <span>
                                  <Form.Label as="legend">Length</Form.Label>
                                </span>
                              </Col>
                              <Col xs={10}>
                                <Form.Check type="radio" label="Runs Short          " name="lengthRating" id="lengthRatingRadio1" value="1" />
                                <Form.Check type="radio" label="Runs Slightly Short " name="lengthRating" id="lengthRatingRadio2" value="2" />
                                <Form.Check type="radio" label="Perfect             " name="lengthRating" id="lengthRatingRadio3" value="3" />
                                <Form.Check type="radio" label="Runs Slightly Long  " name="lengthRating" id="lengthRatingRadio4" value="4" />
                                <Form.Check type="radio" label="Runs Long           " name="lengthRating" id="lengthRatingRadio5" value="5" />
                              </Col>
                            </Row>
                          </fieldset>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formFitRating">
                          <fieldset>
                            <Row>
                              <Col xs={4} className="d-flex m-0 p-0 justify-content-center">
                                <span>
                                  <Form.Label as="legend">Fit</Form.Label>
                                </span>
                              </Col>
                              <Col xs={10}>
                                <Form.Check type="radio" label="Runs tight          " name="fitRating" id="fitRatingRadio1" value="1" />
                                <Form.Check type="radio" label="Runs slightly tight " name="fitRating" id="fitRatingRadio2" value="2" />
                                <Form.Check type="radio" label="Perfect             " name="fitRating" id="fitRatingRadio3" value="3" />
                                <Form.Check type="radio" label="Runs slightly loose " name="fitRating" id="fitRatingRadio4" value="4" />
                                <Form.Check type="radio" label="Runs loose          " name="fitRating" id="fitRatingRadio5" value="5" />
                              </Col>
                            </Row>
                          </fieldset>
                        </Form.Group>
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

import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import StyleSelection from './StyleSelection';
import '../../css/overview.css';

const sampleData = require('./sampleStyleData');

function Overview({ product }) {
  const filterStyleOptionProps = (requestResponse) => {
    const filteredResults = requestResponse.results.map((style) => {
      const obj = {
        default: style['default?'],
        name: style.name,
        style_id: style.style_id,
        thumbnail: style.photos[0].thumbnail_url,
      };
      return obj;
    });
    return filteredResults;
  };

  const [styleOptions, setStyleOptions] = useState(filterStyleOptionProps(sampleData.styleGetReq));
  const [selectedStyle, setSelection] = useState();

  const getStylesByProductId = (productId) => {
    axios.get(`/products/${productId}/styles`)
      .then((response) => {
        if (Array.isArray(response.results)) {
          const filterStyleOpts = filterStyleOptionProps(response);
          setStyleOptions(filterStyleOpts);
        }
      })
      .catch();
  };

  // useEffect(() => {
  //   getStylesByProductId(product.id);
  // }, [product]);

  return (
    <Container className="overview-component">
      <Row>
        <Col>
          <div className="overview overview-image-gallery-container">
            Image Gallery
            <div className="overview over-image-gallery-default-view">
              IMG PLACEHOLDER
              <button className="overview overview-image-gallery-expanded-view" type="button">ICON HERE</button>
              <div className="overview overview-image-gallery-thumbnails">IMG GALLERY THUMBNAILS</div>
            </div>
          </div>
        </Col>
        <Col>
          <div className="overview overview-product-information-a">
            <div className="overview overview-star-rating">Star Rating</div>
            <div className="overview overview-product-category">Product Category</div>
            <div className="overview overview-product-title">{product.name}</div>
            <div className="overview overview-price">{`$${product.default_price}`}</div>
            <div className="overview overview-social-media">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
              <FontAwesomeIcon icon={faInstagram} size="2x" />
              <FontAwesomeIcon icon={faPinterest} size="2x" />
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </div>
          </div>
          <StyleSelection
            styleOpts={styleOptions}
            changeSelection={setSelection}
            selectedStyle={selectedStyle}
          />
          <div className="overview overview-add-to-cart-container">
            Add to Cart
            <div className="overview overview-size-selector">Size Selector</div>
            <div className="overview overview-quantity-selector">Quantity Selector</div>
            <button type="button" className="overview overview-add-to-cart-button">
              <FontAwesomeIcon icon={faShoppingCart} />
              Add To Cart
            </button>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="overview overview-production-information-b">
          <div className="overview overview-product-description">Product Description</div>
        </div>
      </Row>
    </Container>
  );
}

Overview.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    default_price: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }),
};

Overview.defaultProps = {
  product: {
    id: 18201,
    name: 'Ernesto\'s Sweatpants',
    default_price: '56.00',
    features: [{ feature: 'Cut', value: '"Skinny"' }, { feature: 'Cut', value: '"Loose"' }],
  },
};

export default Overview;

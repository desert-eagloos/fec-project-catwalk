import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import StyleSelection from './StyleSelection';
import ProductInfoA from './ProductInfoA';
import '../../css/overview.css';

const sampleStyleData = require('./SampleData/sampleStyleData');

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

  const [styleOptions, setStyleOptions] = useState(
    filterStyleOptionProps(sampleStyleData.styleGetReq),
  );
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

  useEffect(() => {
    getStylesByProductId(product.id);
  }, [product]);

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
          <ProductInfoA />
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
          <div className="overview overview-product-description">
            <h4>{product.slogan}</h4>
            {product.description}
          </div>
        </div>
      </Row>
    </Container>
  );
}

Overview.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    campus: PropTypes.string,
    slogan: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    default_price: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }),
};

Overview.defaultProps = {
  product: {
    id: 18201,
    campus: 'hr-bld',
    slogan: 'Odit dolorem nemo id tempora qui.',
    description: 'A sapiente hic. Facilis et sit voluptatem. Ex sunt reiciendis qui ut perferendis qui soluta quod.',
    category: 'Sweatpants',
    name: 'Ernesto\'s Sweatpants',
    default_price: '56.00',
    created_at: '2021-02-23T05:08:00.520Z',
    updated_at: '2021-02-23T05:08:00.520Z',
  },
};

export default Overview;

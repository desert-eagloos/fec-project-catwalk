import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import StyleSelection from './StyleSelection';
import ProductInfoA from './ProductInfoA';
import AddToCart from './AddToCart';
import '../../css/overview.css';

const _ = require('underscore');
const sampleStyleData = require('./SampleData/sampleStyleData');

function Overview({ product }) {
  const filterStyleOptionProps = (requestResponse) => {
    const filteredResults = _.filter(requestResponse.results, (style) => {
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

  const filterSizesBySelectedStyle = (requestResponse, comparison) => {
    const filteredResults = _.filter(requestResponse.results, (style) => style.name === comparison);
    const sizeOptionsProp = _.map(filteredResults[0].skus, (value, key) => ({
      id: key,
      quantity: value.quantity,
      size: value.size,
    }));
    return sizeOptionsProp;
  };

  const findDefaultStyle = (listOfStyles) => {
    const defaultStyle = _.filter(listOfStyles, (entry) => entry['default?'] === true);
    return defaultStyle[0].name;
  };

  const [styleOptions, setStyleOptions] = useState(
    filterStyleOptionProps(sampleStyleData.styleGetReq),
  );

  const [selectedStyle, setSelectedStyle] = useState(
    findDefaultStyle(styleOptions),
  );

  const [sizeOptions] = useState(
    filterSizesBySelectedStyle(sampleStyleData.styleGetReq, selectedStyle),
  );

  const getStylesByProductId = (productId) => {
    axios.get(`/products/${productId}/styles`)
      .then((response) => {
        // NEED TO REFACTOR THIS ONCE WE HAVE DETERMINE STARTING STATE OF SITE
        if (Array.isArray(response.results)) {
          const filterStyleOpts = filterStyleOptionProps(response);
          setStyleOptions(filterStyleOpts);
          setSelectedStyle(findDefaultStyle(response));
          filterSizesBySelectedStyle(response, selectedStyle);
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
          <ProductInfoA product={product} />
          <StyleSelection
            styleOpts={styleOptions}
            changeSelectedStyle={setSelectedStyle}
            selectedStyle={selectedStyle}
          />
          <AddToCart sizeOptions={sizeOptions} />
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
    name: 'Ernesto Sweatpants',
    default_price: '56.00',
    created_at: '2021-02-23T05:08:00.520Z',
    updated_at: '2021-02-23T05:08:00.520Z',
  },
};

export default Overview;

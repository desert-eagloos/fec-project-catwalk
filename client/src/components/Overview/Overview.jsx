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
  const reformatStyleGetResponse = (response) => {
    const newFormat = {
      product_id: response.product_id,
      results: _.map(response.results, (entry) => (
        {
          style_id: entry.style_id,
          name: entry.name,
          original_price: entry.original_price,
          sale_price: entry.sale_price,
          'default?': entry['default?'],
          photos: entry.photos,
          skus: _.map(entry.skus, (value, key) => ({
            sku: key,
            quantity: value.quantity,
            size: value.size,
          })),
        }
      )),
    };
    return newFormat;
  };

  const filterSizesBySelectedStyle = (styles, comparison) => {
    const filteredResults = _.filter(styles.results, (style) => style.name === comparison);
    const sizeOptionsProp = _.map(filteredResults[0].skus, (value) => ({
      id: value.sku,
      quantity: value.quantity,
      size: value.size,
    }));
    return sizeOptionsProp;
  };

  const findDefaultStyle = (styles) => {
    const defaultStyle = _.findWhere(styles.results, (entry) => entry['default?'] === true);
    return defaultStyle.name;
  };

  const [styleOptions, setStyleOptions] = useState(
    reformatStyleGetResponse(sampleStyleData.styleGetReq),
  );

  const [selectedStyle, setSelectedStyle] = useState(
    findDefaultStyle(styleOptions),
  );

  const [sizeOptions] = useState(
    filterSizesBySelectedStyle(styleOptions, selectedStyle),
  );

  const getStylesByProductId = (productId) => {
    axios.get(`/products/${productId}/styles`)
      .then((response) => {
        // NEED TO REFACTOR THIS ONCE WE HAVE DETERMINE STARTING STATE OF SITE
        if (Array.isArray(response.results)) {
          setStyleOptions(
            reformatStyleGetResponse(response),
          );
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
            styleOptions={styleOptions}
            changeSelectedStyle={setSelectedStyle}
            selectedStyle={selectedStyle}
          />
          <AddToCart cartOptions={sizeOptions} />
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

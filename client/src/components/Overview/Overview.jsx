import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import StyleSelection from './StyleSelection';
import ProductInfoA from './ProductInfoA';
import AddToCart from './AddToCart';
import '../../css/overview.css';

const helpers = require('./OverviewHelpers');
const sampleStyleData = require('./SampleData/sampleStyleData');

function Overview({ product }) {
  const [styleOptions, setStyleOptions] = useState(
    helpers.reformatStyleGetResponse(sampleStyleData.styleGetReq),
  );
  const [selectedStyle, setSelectedStyle] = useState(
    helpers.findDefaultStyle(styleOptions),
  );
  const [priceByStyle, setPriceByStyle] = useState(
    helpers.findDefaultPrice(styleOptions),
  );
  const [cartOptions, setCartOptions] = useState(
    helpers.filterCartOptionsBySelectedStyle(styleOptions, selectedStyle),
  );

  const getStylesByProductId = (productId) => {
    axios.get(`/products/${productId}/styles`)
      .then((response) => {
        // NEED TO REFACTOR THIS ONCE WE HAVE DETERMINE STARTING STATE OF SITE
        if (Array.isArray(response.results)) {
          setStyleOptions(helpers.reformatStyleGetResponse(response));
          setSelectedStyle(helpers.findDefaultStyle(response));
          setCartOptions(helpers.filterCartOptionsBySelectedStyle(response, selectedStyle));
        }
      })
      .catch();
  };

  useEffect(() => {
    getStylesByProductId(product.id);
  }, [product]);

  //  CHANGES THE CART OPTIONS WHEN A STYLE IS SELECTED
  useEffect(() => {
    setCartOptions(
      helpers.filterCartOptionsBySelectedStyle(styleOptions, selectedStyle),
    );
    setPriceByStyle(helpers.filterPriceBySelectedStyle(styleOptions, selectedStyle));
  }, [selectedStyle]);

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
          <ProductInfoA
            product={product}
            priceByStyle={priceByStyle}
          />
          <StyleSelection
            styleOptions={styleOptions}
            changeSelectedStyle={setSelectedStyle}
            selectedStyle={selectedStyle}
          />
          <AddToCart cartOptions={cartOptions} />
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

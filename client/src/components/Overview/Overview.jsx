import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import StyleSelection from './StyleSelection';
import ProductInfoA from './ProductInfoA';
import AddToCart from './AddToCart';
import '../../css/overview.css';

const helpers = require('./OverviewHelpers');
// const sampleStyleData = require('./SampleData/sampleStyleData');

function Overview({ product }) {
  const [styleOptions, setStyleOptions] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [priceByStyle, setPriceByStyle] = useState(null);
  const [cartOptions, setCartOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getStylesByProductId = async (productId) => axios.get(`/products/${productId}/styles`);

  // UPDATE PRODUCTS ASYNCHRONOUSLY
  useEffect(() => {
    const asyncFunc = async () => {
      const newStylesGetRes = await getStylesByProductId(product.id);
      const reformattedResponse = await helpers.reformatStyleGetResponse(newStylesGetRes.data);
      const defaultStyle = await helpers.findDefaultStyle(reformattedResponse);
      const defaultPrice = await helpers.findDefaultPrice(reformattedResponse);
      return Promise.all([reformattedResponse, defaultStyle, defaultPrice]);
    };
    asyncFunc()
      .then((values) => {
        setStyleOptions(values[0]);
        setSelectedStyle(values[1]);
        setPriceByStyle(values[2]);
        const filteredResults = helpers.filterCartOptionsBySelectedStyle(values[0], values[1]);
        setCartOptions(filteredResults);
        setIsLoading(false);
      })
      .catch();
  }, [product]);

  if (isLoading) return (<></>);
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

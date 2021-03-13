import React, { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Row,
  Carousel,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import StyleSelection from './StyleSelection';
import ProductInfoA from './ProductInfoA';
import AddToCart from './AddToCart';
import '../../css/overview.css';

const _ = require('underscore');
const helpers = require('./OverviewHelpers');
// const sampleStyleData = require('./SampleData/sampleStyleData');

function Overview({ product }) {
  const [styleOptions, setStyleOptions] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [priceByStyle, setPriceByStyle] = useState(null);
  const [cartOptions, setCartOptions] = useState(null);
  const [photosByStyle, setPhotosByStyle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getStylesByProductId = async (productId) => axios.get(`/products/${productId}/styles`);

  // UPDATE PRODUCTS ASYNCHRONOUSLY
  useEffect(() => {
    setIsLoading(true);
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
        setCartOptions(helpers.filterCartOptionsBySelectedStyle(values[0], values[1]));
        setPhotosByStyle(helpers.filterPhotosBySelectedStyle(values[0], values[1]));
        setIsLoading(false);
      })
      .catch();
  }, [product]);

  useEffect(() => {
    if (isLoading === false) {
      setPriceByStyle(helpers.filterPriceBySelectedStyle(styleOptions, selectedStyle));
      setCartOptions(helpers.filterCartOptionsBySelectedStyle(styleOptions, selectedStyle));
      setPhotosByStyle(helpers.filterPhotosBySelectedStyle(styleOptions, selectedStyle));
    }
  }, [selectedStyle]);

  if (isLoading) return (<></>);
  return (
    <>
      <Container data-test="overview-container" className="overview-component">
        <Row>
          <Col>
            <Carousel>
              {_.map(photosByStyle, (entry, key) => {
                let image = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
                if (entry.fullSize !== null) image = entry.fullSize;

                return (
                  <Carousel.Item
                    key={key}
                  >
                    <img
                      className="carousel-img d-block w-100"
                      src={image}
                      alt="Missing"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Col>
          <Col>
            <ProductInfoA
              product={product}
              priceByStyle={priceByStyle}
            />
            <StyleSelection
              styleOptions={styleOptions}
              changeSelectedStyle={setSelectedStyle}
              changePhotosByStyle={setPhotosByStyle}
              selectedStyle={selectedStyle}
            />
            <AddToCart cartOptions={cartOptions} />
          </Col>
        </Row>
      </Container>
      <Row>
        <div className="overview overview-production-information-b">
          <div className="overview overview-product-description">
            <h4>{product.slogan}</h4>
            {product.description}
          </div>
        </div>
      </Row>
    </>
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

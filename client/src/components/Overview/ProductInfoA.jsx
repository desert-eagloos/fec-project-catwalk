import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

function ProductInfoA({ product, priceByStyle }) {
  if (priceByStyle.salePrice === null) {
    return (
      <div className="overview overview-product-information-a">
        <div className="overview overview-star-rating">Star Rating</div>
        <div className="overview overview-product-category"><h4>{product.category}</h4></div>
        <div className="overview overview-product-title"><h2>{product.name}</h2></div>
        <div className="overview overview-price"><h4>{`$${priceByStyle.originalPrice}`}</h4></div>
        <div className="overview overview-social-media">
          <a href="https://www.facebook.com" rel="noreferrer" target="_blank">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://www.instagram.com" rel="noreferrer" target="_blank">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://www.pinterest.com" rel="noreferrer" target="_blank">
            <FontAwesomeIcon icon={faPinterest} size="2x" />
          </a>
          <a href="https://www.twitter.com" rel="noreferrer" target="_blank">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="overview overview-product-information-a">
      <div className="overview overview-star-rating">Star Rating</div>
      <div className="overview overview-product-category"><h4>{product.category}</h4></div>
      <div className="overview overview-product-title"><h2>{product.name}</h2></div>
      <div className="overview overview-price">
        <h4 className="sale-price-decoration">
          {`$${priceByStyle.salePrice}`}
        </h4>
        <h4 className="original-price-decoration">
          {`$${priceByStyle.originalPrice}`}
        </h4>
      </div>
      <div className="overview overview-social-media">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
        <FontAwesomeIcon icon={faInstagram} size="2x" />
        <FontAwesomeIcon icon={faPinterest} size="2x" />
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </div>
    </div>
  );
}

ProductInfoA.propTypes = {
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
  priceByStyle: PropTypes.shape({
    salePrice: PropTypes.string,
    originalPrice: PropTypes.string,
  }),
};

ProductInfoA.defaultProps = {
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
  priceByStyle: {
    salePrice: null,
    originalPrice: '56.00',
  },
};

export default ProductInfoA;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

function ProductInfoA({ product }) {
  return (
    <div className="overview overview-product-information-a">
      <div className="overview overview-star-rating">Star Rating</div>
      <div className="overview overview-product-category">{product.category}</div>
      <div className="overview overview-product-title"><h2>{product.name}</h2></div>
      <div className="overview overview-price">{`$${product.default_price}`}</div>
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
};

ProductInfoA.defaultProps = {
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

export default ProductInfoA;
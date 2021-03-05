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
  );
}

ProductInfoA.propTypes = {
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

ProductInfoA.defaultProps = {
  product: {
    id: 18201,
    name: 'Ernesto\'s Sweatpants',
    default_price: '56.00',
    features: [{ feature: 'Cut', value: '"Skinny"' }, { feature: 'Cut', value: '"Loose"' }],
  },
};

export default ProductInfoA;

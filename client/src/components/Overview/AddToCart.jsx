import React from 'react';
// import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function AddToCart({ sizeOptions }) {
  return (
    <div className="overview overview-add-to-cart-container">
      Add to Cart
      <div className="overview overview-size-selector">Size Selector</div>
      <div className="overview overview-quantity-selector">Quantity Selector</div>
      <button type="button" className="overview overview-add-to-cart-button">
        <FontAwesomeIcon icon={faShoppingCart} />
        {' Add To Cart'}
      </button>
    </div>
  );
}

AddToCart.propTypes = {
  sizeOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    quantity: PropTypes.number,
    size: PropTypes.string,
  })),
};

AddToCart.defaultProps = {
  sizeOptions: [
    { id: '565825', quantity: 45, size: 'XS' },
    { id: '565826', quantity: 27, size: 'S' },
    { id: '565827', quantity: 59, size: 'M' },
    { id: '565828', quantity: 55, size: 'L' },
    { id: '565829', quantity: 51, size: 'XL' },
    { id: '565830', quantity: 10, size: 'XXL' },
  ],
};

export default AddToCart;

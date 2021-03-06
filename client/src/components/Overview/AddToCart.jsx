import React, { useState, useEffect } from 'react';
// import { Container, Col, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const _ = require('underscore');

function AddToCart({ sizeOptions }) {
  const filterOutOfStockSizes = (list) => (
    _.filter(list, (element) => element.quantity > 0)
  );

  const [inStockSizes, setInStockSizes] = useState(
    filterOutOfStockSizes(sizeOptions),
  );

  useEffect(() => {
    setInStockSizes(filterOutOfStockSizes(sizeOptions));
  }, [sizeOptions]);

  return (
    <div className="overview overview-add-to-cart-container">
      Add to Cart
      <div className="overview overview-size-selector">
        <DropdownButton id="dropdown-basic-button" title="Select Size">
          {_.map(inStockSizes, (option) => (
            <Dropdown.Item href="#">{option.size}</Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Quantity">
          {_.map(inStockSizes, (option) => (
            <Dropdown.Item href="#">{option.quantity}</Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
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
    id: PropTypes.number,
    quantity: PropTypes.number,
    size: PropTypes.string,
  })),
};

AddToCart.defaultProps = {
  sizeOptions: [
    { id: 565825, quantity: 45, size: 'XS' },
    { id: 565826, quantity: 27, size: 'S' },
    { id: 565827, quantity: 59, size: 'M' },
    { id: 565828, quantity: 55, size: 'L' },
    { id: 565829, quantity: 51, size: 'XL' },
    { id: 565830, quantity: 10, size: 'XXL' },
  ],
};

export default AddToCart;

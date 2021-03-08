import React, { useState, useEffect } from 'react';
// import { Container, Col, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const _ = require('underscore');

function AddToCart({ cartOptions }) {
  const filterOutOfStockSizes = (list) => (
    _.filter(list, (element) => element.quantity > 0)
  );

  const filterStockOfSelectedSize = (list, size) => (
    _.filter(list, (element) => element.size === size)
  );

  const maxQuantityOptions = (number) => ((number > 15) ? 15 : number);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [selectedSKU, setSelectedSKU] = useState(null);
  const [sizeDropdownMenuText, setSizeDropdownMenuText] = useState('Select Size');
  const [navigateToSizeSelection, setNavigateToSizeSelection] = useState(false);
  const [quantityDropdownMenuText, setQuantityDropdownMenuText] = useState('-');
  const [quantityDropdownMenuStatus, setQuantityDropdownMenuStatus] = useState(true);
  const [quantityOptionsOfSelectedSize, setQuantityOptionsOfSelectedSize] = useState(0);
  const [inStockSizes, setInStockSizes] = useState(
    filterOutOfStockSizes(cartOptions),
  );

  useEffect(() => {
    setInStockSizes(filterOutOfStockSizes(cartOptions));
  }, [cartOptions]);

  useEffect(() => {
    setNavigateToSizeSelection(false);
  }, [selectedSize]);

  return (
    <div className="overview overview-add-to-cart-container">
      Add to Cart
      <div className="overview overview-size-selector">
        <DropdownButton
          id="dropdown-basic-button"
          title={sizeDropdownMenuText}
          show={navigateToSizeSelection}
          onClick={() => {
            setNavigateToSizeSelection(!navigateToSizeSelection);
          }}
        >
          {_.map(inStockSizes, (option) => (
            <Dropdown.Item
              key={option.id}
              as="button"
              id={option.size}
              onClick={(event) => {
                setSelectedSize(event.target.id);
                setSizeDropdownMenuText(`Size: ${event.target.id}`);
                setSelectedSKU();
                setQuantityDropdownMenuText('Qty: 1');
                setSelectedQuantity(1);
                setQuantityDropdownMenuStatus(false);
                const filterCartOptions = (filterStockOfSelectedSize(cartOptions, event.target.id));
                setQuantityOptionsOfSelectedSize(maxQuantityOptions(filterCartOptions[0].quantity));
              }}
            >
              {option.size}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <div className="overview overview-quantity-selector">
        <DropdownButton
          id="dropdown-basic-button"
          title={quantityDropdownMenuText}
          disabled={quantityDropdownMenuStatus}
        >
          {_.map(_.range(1, quantityOptionsOfSelectedSize + 1), (quantity) => (
            <Dropdown.Item
              href="#"
              id={quantity}
              key={quantity}
              onClick={(event) => {
                setSelectedQuantity(event.target.id);
                setQuantityDropdownMenuText(`Qty: ${quantity}`);
                setNavigateToSizeSelection(false);
              }}
            >
              {quantity}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <button
        type="button"
        className="overview overview-add-to-cart-button"
        onClick={() => {
          if (selectedSize === null) {
            setNavigateToSizeSelection(true);
          } else {
            console.log('Send Request', selectedSKU, selectedQuantity);
          }
        }}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
        {' Add To Cart'}
      </button>
    </div>
  );
}

AddToCart.propTypes = {
  cartOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    quantity: PropTypes.number,
    size: PropTypes.string,
  })),
};

AddToCart.defaultProps = {
  cartOptions: [
    { id: '565825', quantity: 45, size: 'XS' },
    { id: '565826', quantity: 27, size: 'S' },
    { id: '565827', quantity: 59, size: 'M' },
    { id: '565828', quantity: 55, size: 'L' },
    { id: '565829', quantity: 51, size: 'XL' },
    { id: '565830', quantity: 10, size: 'XXL' },
  ],
};

export default AddToCart;

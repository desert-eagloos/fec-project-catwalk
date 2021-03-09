import React, { useState, useEffect } from 'react';
// import { Container, Col, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
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
  const [showAlert, setShowAlert] = useState(false);
  const [quantityDropdownMenuText, setQuantityDropdownMenuText] = useState('-');
  const [quantityDropdownMenuStatus, setQuantityDropdownMenuStatus] = useState(true);
  const [quantityOptionsOfSelectedSize, setQuantityOptionsOfSelectedSize] = useState(0);
  const [inStockSizes, setInStockSizes] = useState(
    filterOutOfStockSizes([]),
  );
  const [outOfStock, setOutOfStock] = useState(true);

  useEffect(() => {
    setInStockSizes(filterOutOfStockSizes(cartOptions));
    setOutOfStock(() => (inStockSizes.length === 0));
  }, [cartOptions]);

  useEffect(() => {
    setNavigateToSizeSelection(false);
  }, [selectedSize]);

  const renderAddToCartButton = (list) => (
    (list.length > 0) ? (
      <Button
        type="button"
        className="overview overview-add-to-cart-button"
        variant="secondary"
        onClick={() => {
          if (selectedSize === null) {
            setNavigateToSizeSelection(true);
            setShowAlert(true);
          } else {
            console.log('Send Request', selectedSKU, selectedQuantity);
          }
        }}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
        {' Add To Cart'}
      </Button>
    ) : null
  );

  const renderSizeSelectorMenu = (list) => (
    (list.length > 0) ? (
      <>
        <Alert
          className="mb-0"
          variant="secondary"
          show={showAlert}
        >
          Please Select A Size
        </Alert>
        <DropdownButton
          id="dropdown-basic-button"
          title={sizeDropdownMenuText}
          show={navigateToSizeSelection}
          variant="secondary"
          onClick={() => {
            setNavigateToSizeSelection(!navigateToSizeSelection);
          }}
        >
          {_.map(inStockSizes, (option) => (
            <Dropdown.Item
              key={option.id}
              as="button"
              id={option.id}
              onClick={(event) => {
                setShowAlert(false);
                setSelectedSize(event.target.innerText);
                setSizeDropdownMenuText(`Size: ${event.target.innerText}`);
                setSelectedSKU(event.target.id);
                setQuantityDropdownMenuText('Qty: 1');
                setSelectedQuantity(1);
                setQuantityDropdownMenuStatus(false);
                const filterCartOptions = (
                  filterStockOfSelectedSize(cartOptions, event.target.innerText)
                );
                setQuantityOptionsOfSelectedSize(maxQuantityOptions(filterCartOptions[0].quantity));
              }}
            >
              {option.size}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </>
    ) : (
      <DropdownButton
        id="dropdown-basic-button"
        title="OUT OF STOCK"
        disabled={outOfStock}
      />
    )
  );

  return (
    <div className="overview overview-add-to-cart-container">
      <div className="overview overview-size-selector">
        {renderSizeSelectorMenu(inStockSizes)}
      </div>
      <div className="overview overview-quantity-selector">
        <DropdownButton
          id="dropdown-basic-button"
          title={quantityDropdownMenuText}
          variant="secondary"
          disabled={quantityDropdownMenuStatus}
        >
          {_.map(_.range(1, quantityOptionsOfSelectedSize + 1), (quantity) => (
            <Dropdown.Item
              href="#"
              key={quantity}
              onClick={(event) => {
                setSelectedQuantity(Number(event.target.innerText));
                setQuantityDropdownMenuText(`Qty: ${quantity}`);
                setNavigateToSizeSelection(false);
              }}
            >
              {quantity}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      {renderAddToCartButton(inStockSizes)}
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
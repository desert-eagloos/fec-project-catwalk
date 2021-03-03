import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Overview({ product }) {
  const [display, setDisplay] = useState({});

  useEffect(() => {
    setDisplay(product);
  }, []);

  return (
    <div className="overview-component">
      <div className="overview overview-image-gallery-container">
        Image Gallery
        <div className="overview over-image-gallery-default-view">
          IMG PLACEHOLDER
          <button className="overview overview-image-gallery-expanded-view" type="button">ICON HERE</button>
          <div className="overview overview-image-gallery-thumbnails">IMG GALLERY THUMBNAILS</div>
        </div>
      </div>
      <div className="overview overview-product-information-a">
        Production Information
        <div className="overview overview-star-rating">Star Rating</div>
        <div className="overview overview-product-category">Production Category</div>
        <div className="overview overview-product-title">{display.name}</div>
        <div className="overview overview-price">{`$${display.default_price}`}</div>
        <div className="overview overview-social-media">
          Social Media
          <img src="/Assets/Icons/instagram.svg" alt="Instagram" />
        </div>
      </div>
      <div className="overview overview-style-selector">Style Selector</div>
      <div className="overview overview-add-to-cart-container">
        Add to Cart
        <div className="overview overview-size-selector">Size Selector</div>
        <div className="overview overview-quantity-selector">Quantity Selector</div>
        <button type="button" className="overview overview-add-to-cart-button">Add to Cart Button</button>
      </div>
      <div className="overview overview-production-information-b">
        <div className="overview overview-product-description">Product Description</div>
      </div>
    </div>
  );
}

Overview.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    default_price: PropTypes.string,
  }),
};

Overview.defaultProps = {
  product: {
    name: 'Ernesto\'s Sweatpants',
    default_price: '56.00',
  },
};

export default Overview;

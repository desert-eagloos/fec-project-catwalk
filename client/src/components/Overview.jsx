import React, { useState, useEffect } from 'react';

function Overview(props) {
  // const [product, setProduct] = useState(appProduct);

  return (
    <div className="overview-component">
      <div className="overview overview-production">
        Production Information
        <div className="overview overview-star-rating">Star Rating</div>
        <div className="overview overview-product-category">Production Category</div>
        <div className="overview overview-product-title">Product Title</div>
        <div className="overview overview-price">Price</div>
        <div className="overview overview-product-overview">Product Overview</div>
        <div className="overview overview-social-media">Social Media</div>
      </div>
      <div className="overview overview-style-selector">Style Selector</div>
      <div className="overview overview-add-to-cart-container">
        Add to Cart
        <div className="overview overview-size-selector">Size Selector</div>
        <div className="overview overview-quantity-selector">Quantity Selector</div>
        <div className="overview overview-add-to-cart-button">Add to Cart Button</div>
      </div>
      <div className="overview overview-image-gallery-container">
        Image Gallery
        <div className="overview over-image-gallery-default-view">
          IMG PLACEHOLDER
          <button className="overview overview-image-gallery-expanded-view" type="button">ICON HERE</button>
          <div className="overview overview-image-gallery-thumbnails">IMG GALLERY THUMBNAILS</div>
        </div>
      </div>
    </div>
  );
}

export default Overview;

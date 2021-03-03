import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function Overview({ product }) {
  const [styles, setStyles] = useState({
    product_id: 18201,
    results: [
      {
        style_id: 97715,
        name: 'Green',
        original_price: 56.00,
        sale_price: null,
        'default?': true,
        photos: [
          {
            thumbnail_url: 'https://images.unsplash.com/photo-1482876555840-f31c5ebbff1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
            url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80',
          },
        ],
        skus: {
          565825: {
            quantity: 45,
            size: 'XS',
          },
          565826: {
            quantity: 27,
            size: 'S',
          },
          565827: {
            quantity: 59,
            size: 'M',
          },
          565828: {
            quantity: 55,
            size: 'L',
          },
          565829: {
            quantity: 51,
            size: 'XL',
          },
          565830: {
            quantity: 10,
            size: 'XXL',
          },
        },
      },
      {
        style_id: 97716,
        name: 'Tan',
        original_price: '56.00',
        sale_price: null,
        'default?': false,
        photos: [
          {
            thumbnail_url: 'https://images.unsplash.com/photo-1558014356-f7c41bc744f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
            url: 'https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
          },
        ],
        skus: {
          565831: {
            quantity: 19,
            size: 'XS',
          },
          565832: {
            quantity: 22,
            size: 'S',
          },
          565833: {
            quantity: 11,
            size: 'M',
          },
          565834: {
            quantity: 26,
            size: 'L',
          },
          565835: {
            quantity: 31,
            size: 'XL',
          },
          565836: {
            quantity: 36,
            size: 'XXL',
          },
        },
      },
      {
        style_id: 97717,
        name: 'Mint green',
        original_price: '56.00',
        sale_price: null,
        'default?': false,
        photos: [
          {
            thumbnail_url: 'https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
            url: 'https://images.unsplash.com/photo-1541006008768-d181e7f9f3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80',
          },
        ],
        skus: {
          565837: {
            quantity: 27,
            size: 'XS',
          },
          565838: {
            quantity: 1,
            size: 'S',
          },
          565839: {
            quantity: 37,
            size: 'M',
          },
          565840: {
            quantity: 20,
            size: 'L',
          },
          565841: {
            quantity: 58,
            size: 'XL',
          },
          565842: {
            quantity: 49,
            size: 'XXL',
          },
        },
      },
      {
        style_id: 97718,
        name: 'Salmon',
        original_price: '56.00',
        sale_price: null,
        'default?': false,
        photos: [
          {
            thumbnail_url: 'https://images.unsplash.com/photo-1482876555840-f31c5ebbff1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
            url: 'https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
          },
        ],
        skus: {
          565843: {
            quantity: 54,
            size: 'XS',
          },
          565844: {
            quantity: 31,
            size: 'S',
          },
          565845: {
            quantity: 26,
            size: 'M',
          },
          565846: {
            quantity: 38,
            size: 'L',
          },
          565847: {
            quantity: 5,
            size: 'XL',
          },
          565848: {
            quantity: 5,
            size: 'XXL',
          },
        },
      },
    ],
  });
  const getStyles = (styleId) => {
    axios.get(`/products/${styleId}/styles`)
      .then((response) => {
        setStyles(response.data);
      })
      .catch();
  };

  // useEffect(() => {
  //   getStyles(product.id);
  // }, [product]);

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
        Product Information
        <div className="overview overview-star-rating">Star Rating</div>
        <div className="overview overview-product-category">Product Category</div>
        <div className="overview overview-product-title">{product.name}</div>
        <div className="overview overview-price">{`$${product.default_price}`}</div>
        <div className="overview overview-social-media">
          <img href="#" src="/Assets/Icons/instagram.svg" alt="Instagram" />
          <img href="#" src="/Assets/Icons/facebook.svg" alt="Facebook" />
          <img href="#" src="/Assets/Icons/twitter.svg" alt="Twitter" />
          <img href="#" src="/Assets/Icons/pinterest.svg" alt="Pinterest" />
        </div>
      </div>
      <div className="overview overview-style-selector">
        Style Selector
        <div className="option1">
          {styles.results[0].name}
        </div>
        <div className="option2">
          {styles.results[1].name}
        </div>
        <div className="option3">
          {styles.results[2].name}
        </div>
        <div className="option4">
          {styles.results[3].name}
        </div>
      </div>
      <div className="overview overview-add-to-cart-container">
        Add to Cart
        <div className="overview overview-size-selector">Size Selector</div>
        <div className="overview overview-quantity-selector">Quantity Selector</div>
        <button type="button" className="overview overview-add-to-cart-button">
          <img href="#" src="/Assets/Icons/cart2.svg" alt="Shopping Cart" />
          Add To Cart
        </button>
      </div>
      <div className="overview overview-production-information-b">
        <div className="overview overview-product-description">Product Description</div>
      </div>
    </div>
  );
}

Overview.propTypes = {
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

Overview.defaultProps = {
  product: {
    id: 18201,
    name: 'Ernesto\'s Sweatpants',
    default_price: '56.00',
    features: [{ feature: 'Cut', value: '"Skinny"' }, { feature: 'Cut', value: '"Loose"' }],
  },
};

export default Overview;

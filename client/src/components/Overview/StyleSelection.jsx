import React from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  OverlayTrigger,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const _ = require('underscore');

function StyleSelection({
  styleOptions,
  changeSelectedStyle,
  selectedStyle,
}) {
  return (
    <Container className="mb-4 mt-4">
      <p>
        {'Style '}
        <FontAwesomeIcon icon={faChevronRight} />
        {` ${selectedStyle}`}
      </p>
      <Row lg={4}>
        {_.map(styleOptions.results, (entry) => (
          <Col key={entry.style_id}>
            {/* <OverlayTrigger
              placement="right-end"
              delay={{ show: 250, hide: 400 }}
              trigger="click"
              ref={React.forwardRef()}
              overlay=<FontAwesomeIcon icon={faCheck} />
            > */}
            <Image
              id={entry.name}
              className="style-selection-thumbnails"
              src={entry.photos[0].thumbnail_url}
              roundedCircle
              onClick={(event) => {
                changeSelectedStyle(event.target.id);
              }}
            />
            {/* </OverlayTrigger> */}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

StyleSelection.propTypes = {
  styleOptions: PropTypes.shape({
    product_id: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.shape({
      style_id: PropTypes.number,
      name: PropTypes.string,
      original_price: PropTypes.string,
      sale_price: PropTypes.string,
      'default?': PropTypes.bool,
      photos: PropTypes.arrayOf(PropTypes.shape({
        thumbnail_url: PropTypes.string,
        url: PropTypes.string,
      })),
      skus: PropTypes.arrayOf(
        PropTypes.shape({
          sku: PropTypes.string,
          quantity: PropTypes.number,
          size: PropTypes.string,
        }),
      ),
    })),
  }),
  changeSelectedStyle: PropTypes.func,
  selectedStyle: PropTypes.string,
};

StyleSelection.defaultProps = {
  styleOptions: {
    product_id: '18201',
    results: [
      {
        style_id: 97715,
        name: 'Green',
        original_price: '56.00',
        sale_price: null,
        'default?': true,
        photos: [
          {
            thumbnail_url: 'https://images.unsplash.com/photo-1482876555840-f31c5ebbff1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
            url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80',
          },
        ],
        skus: [
          {
            sku: '565825',
            quantity: 45,
            size: 'XS',
          },
          {
            sku: '565826',
            quantity: 27,
            size: 'S',
          },
          {
            sku: '565827',
            quantity: 59,
            size: 'M',
          },
          {
            sku: '565828',
            quantity: 55,
            size: 'L',
          },
          {
            sku: '565829',
            quantity: 51,
            size: 'XL',
          },
          {
            sku: '565830',
            quantity: 10,
            size: 'XXL',
          },
        ],
      },
    ],
  },
  changeSelectedStyle: () => {},
  selectedStyle: 'Green',
};

export default StyleSelection;

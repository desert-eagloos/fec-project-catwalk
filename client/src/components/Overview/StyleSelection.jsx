import React from 'react';
import {
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function StyleSelection({ styleOpts, changeSelectedStyle, selectedStyle }) {
  return (
    <Container>
      <p>
        {'Style '}
        <FontAwesomeIcon icon={faChevronRight} />
        {` ${selectedStyle}`}
      </p>
      <Row>
        {styleOpts.map((entry) => (
          <Col key={entry.style_id}>
            <Image
              id={entry.name}
              className="style-selection-thumbnails"
              src={entry.thumbnail}
              thumbnail
              roundedCircle
              onClick={(event) => {
                changeSelectedStyle(event.target.id);
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

StyleSelection.propTypes = {
  styleOpts: PropTypes.arrayOf(PropTypes.shape({
    default: PropTypes.bool,
    name: PropTypes.string,
    style_id: PropTypes.number,
    thumbnail: PropTypes.string,
  })),
  changeSelectedStyle: PropTypes.func,
  selectedStyle: PropTypes.string,
};

StyleSelection.defaultProps = {
  styleOpts: [
    {
      default: true,
      name: 'Green',
      style_id: 97715,
      thumbnail: 'https://images.unsplash.com/photo-1482876555840-f31c5ebbff1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    },
  ],
  changeSelectedStyle: () => {},
  selectedStyle: 'Green',
};

export default StyleSelection;

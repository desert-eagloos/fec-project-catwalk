import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

function StyleSelection({ styleOpts, changeSelection, selectedStyle }) {
  /* Changes local and parent state */
  useEffect(() => {
    styleOpts.forEach((entry) => {
      if (entry.default) changeSelection(entry.name);
    });
  }, [styleOpts]);

  return (
    <Container>
      <p>{`Style > ${selectedStyle}`}</p>
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
                changeSelection(event.target.id);
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
  changeSelection: PropTypes.func,
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
  changeSelection: () => {},
  selectedStyle: 'Green',
};

export default StyleSelection;

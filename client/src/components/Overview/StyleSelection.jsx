import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';

function StyleSelection({ styleOptions, changeSelection, selectedStyle }) {
  useEffect(() => {
    styleOptions.forEach((entry) => {
      if (entry.default) changeSelection(entry.name);
    });
  }, [styleOptions]);

  return (
    <Container>
      <p>{`Style > ${selectedStyle}`}</p>
      <Row>
        {styleOptions.map((entry) => (
          <Col key={entry.style_id}>
            <Image className="style-selection-thumbnails" src={entry.thumbnail} thumbnail roundedCircle />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
    </Container>
  );
}

StyleSelection.propTypes = {
  styleOptions: PropTypes.arrayOf(PropTypes.shape({
    default: PropTypes.bool,
    name: PropTypes.string,
    style_id: PropTypes.number,
    thumbnail: PropTypes.string,
  })),
  changeSelection: PropTypes.func,
  selectedStyle: PropTypes.string,
};

StyleSelection.defaultProps = {
  styleOptions: [
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

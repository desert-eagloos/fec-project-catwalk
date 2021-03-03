import React from 'react';
import renderer from 'react-test-renderer';
import Stars from '../../client/src/components/RandR/ratings-components/subcomponents/Stars';
import RatingsBreakdown from '../../client/src/components/RandR/ratings-components/subcomponents/RatingsBreakdown';

describe('Creates Ratings and Reviews Components', () => {
  describe('Creates a Star Rating Component', () => {
    test('Creates a Star', () => {
      const component = renderer.create(<Stars />);
      const json = component.toJSON();
      expect(json).toMatchSnapshot();
    });
  });
  describe('Creates a Rating Breakdown Component', () => {
    test('Creates a Rating Breakdown', () => {
      const ratings = {
        5: 2,
        4: 3,
        3: 5,
        2: 1,
        1: 10,
      };
      const component = renderer.create(<RatingsBreakdown ratings={ratings} />);
      const json = component.toJSON();
      expect(json).toMatchSnapshot();
    });
  });
});
import React from 'react';
import renderer from 'react-test-renderer';

import RatingsBreakdown from '../../client/src/components/RandR/ratings-components/subcomponents/RatingsBreakdown';
import FitRating from '../../client/src/components/RandR/ratings-components/subcomponents/FitRating';
import ComfortRating from '../../client/src/components/RandR/ratings-components/subcomponents/ComfortRating';
import Rating from 'react-rating';
import Reviews from '../../client/src/components/RandR/review-components/Reviews';

describe('Creates Ratings and Reviews Components', () => {
  describe('Creates a Star Rating Component', () => {
    test('Star', () => {
      const component = renderer.create(<Rating />);
      const json = component.toJSON();
      expect(json).toMatchSnapshot();
    });
  });
  describe('Creates a Rating Breakdown Component', () => {
    test(' Rating Breakdown', () => {
      const ratings = {
        5: 2,
        4: 3,
        3: 5,
        2: 1,
        1: 10,
      };
      const component = renderer.create(<RatingsBreakdown key="bcTest1" ratings={ratings} />);
      const json = component.toJSON();
      expect(json).toMatchSnapshot();
    });
  });
  describe('Creates a Size Fit Rating Component', () => {
    test('Size Fit Rating', () => {
      const component = renderer.create(<FitRating ratings={3} />);
      const json = component.toJSON();
      expect(json).toMatchSnapshot();
    });
  });
  describe('Creates a Comfort Fit Rating Component', () => {
    test('Comfort Fit Rating', () => {
      const component = renderer.create(<ComfortRating ratings={2} />);
      const json = component.toJSON();
      expect(json).toMatchSnapshot();
    });
  });
  describe('Creates a Review Component', () => {
    test('Reviews', () => {
      const component = renderer.create(<Reviews />);
      const json = component.toJSON();
      expect(json).toMatchSnapshot();
    });
  });
});

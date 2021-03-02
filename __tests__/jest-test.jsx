import React from 'react';
import renderer from 'react-test-renderer';

import App from '../client/src/components/App';
import BootstrapTest from '../client/bootstrapTests/BootstrapTest';
import Stars from '../client/src/components/RandR/ratings-components/subcomponents/Stars';
import RatingsBreakdown from '../client/src/components/RandR/ratings-components/subcomponents/RatingsBreakdown';

describe('Welcome (Snapshot)', () => {
  it('Welcome renders App.jsx', () => {
    const component = renderer.create(<App />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('Creates a React-Bootsrap Component', () => {
  it('Creates a Button', () => {
    const component = renderer.create(<BootstrapTest />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('Creates Ratings and Reviews Components', () => {
  describe('Creates a Star Rating Component', () => {
    it('Creates a Star', () => {
      const component = renderer.create(<Stars />);
      const json = component.toJSON();
      expect(json).toMatchSnapshot();
    });
  });
  describe('Creates a Rating Breakdown Component', () => {
    it('Creates a Rating Breakdown', () => {
      const component = renderer.create(<RatingsBreakdown />);
      const json = component.toJSON();
      expect(json).toMatchSnapshot();
    });
  });
});

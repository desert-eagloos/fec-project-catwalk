/* eslint-disable no-undef */
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import App from '../client/src/components/App';

describe('Welcome (Snapshot)', () => {
  it('Welcome renders PROJECT CATWALK', () => {
    const welcome = shallow(<App />);
    expect(welcome).toMatchSnapshot();
  });
});

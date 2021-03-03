import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from '../client/src/components/App';

Enzyme.configure({ adapter: new Adapter() });

describe('Welcome (Snapshot)', () => {
  it('Welcome renders PROJECT CATWALK', () => {
    const welcome = shallow(<App />);
    expect(welcome.find('div').text()).toEqual('<Overview /><QARoot /><RandR />');
  });
});

import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Welcome from '../client/src/components/App';

Enzyme.configure({ adapter: new Adapter() });

describe('Welcome (Snapshot)', () => {
  it('Welcome renders PROJECT CATWALK', () => {
    const welcome = shallow(<Welcome />);
    expect(welcome.find('div').text()).toEqual('Hello World!<Overview /><QARoot />');
  });
});

import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Welcome from '../client/src/components/App';

Enzyme.configure({ adapter: new Adapter() });

describe('Welcome (Snapshot)', () => {
  it('Welcome renders Hello World!!!', () => {
    const welcome = shallow(<Welcome />);
    expect(welcome.find('h1').text()).toEqual('Hello World!!!');
  });
});

import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import Welcome from '../client/src/components/App.jsx';

describe('Welcome (Snapshot)', () => {
  it('Welcome renders Hello World!!!', () => {
    const welcome = shallow(<Welcome />);
    expect(welcome.find('h1').text()).toEqual('Hello World!!!');
  });
});
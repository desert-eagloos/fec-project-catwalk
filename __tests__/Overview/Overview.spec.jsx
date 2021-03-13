/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Overview from '../../client/src/components/Overview/Overview';
// import ProductInfoA from '../../client/src/components/Overview/ProductInfoA';

Enzyme.configure({ Adapter: new Adapter() });

describe('Creates Overview Component', () => {
  describe('Overview Snapshot Test', () => {
    test('Overview', () => {
      const wrapper = renderer.create(<Overview />);
      const json = wrapper.toJSON();
      expect(json).toMatchSnapshot();
    });
  });

  describe('isLoading State is functioning', () => {
    test('Finds Empty Tags in Overview When isLoad is true', () => {
      const wrapper = shallow(<Overview />);
      console.log(wrapper.debug({ verbose: true }));
      // console.log(wrapper.state(isLoading));
    });
  });
});

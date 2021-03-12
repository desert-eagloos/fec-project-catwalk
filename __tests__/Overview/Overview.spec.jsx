/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import Overview from '../../client/src/components/Overview/Overview';
import ProductInfoA from '../../client/src/components/Overview/ProductInfoA';

describe('Creates Overview Component', () => {
  /* USES JSON SNAPSHOTS FOR TESTING */
  /* DESCRIPTION OF THE TEST */
  describe('Overview Snapshot Test', () => {
    /* TEST FUNCTION AND DESCRIPTION */
    test('Overview', () => {
      /* CREATES AN INSTANCE OF YOUR COMPONENT USING JEST */
      const overviewComponent = renderer.create(<Overview />);
      /* CREATES A SNAPSHOT OBJECT OF THE ELEMENT TREE */
      /* SIMILAR TO A SHALLOW COPY. DOESN'T CREATE USE WRITTEN COMPONENTS */
      const json = overviewComponent.toJSON();
      /* COMPARES INSTANCE TO THE SHALLOW COPY */
      expect(json).toMatchSnapshot();
    });
  });

  /* ********* USING ENZYME ENZYME ********* */

  /* DESCRIPTION OF THE TEST */
  describe('Overview Component Shallow Test Suite', () => {
    /* TEST FUNCTION AND DESCRIPTION */
    test('Finds Empty Tags in Overview', () => {
      /**
       * CREATES A SHALLOW COPY OF THE COMPONENT AND LOOKS FOR THE DIV
       */
      expect(shallow(<Overview />).contains(<></>)).toBe(true);
      /**
       * CODE BELOW IS EQUAL TO THE CODE ABOVE
       * PAY SPECIAL ATTENTION TO PARENTHESIS. THAT GOT ME A FEW TIMES
       */
      //  const shallowCopyOfOverview = shallow(<Overview />);
      //  expect(shallowCopyOfOverview.contains(<></>)).toBe(true);
    });
  });

  /* DESCRIPTION OF THE TEST */
  describe('ProductInfoA Shallow Test Suite', () => {
    /* TEST FUNCTION AND DESCRIPTION */
    test('ProductInfoA is A Stateless Component', () => {
      /**
       * CREATES A SHALLOW COPY
       */
      const shallowCopyOfProductInfoA = shallow(<ProductInfoA />);
      /**
       * CREATES AN INSTANCE OF THE SHALLOW COPY TO TEST TO TEST FOR STATE
       */
      const instanceOfProductInfoA = shallowCopyOfProductInfoA.instance();
      /*
       * TESTS TO IF PRODUCTINFOA IS HAS A STATE
       * IN THIS CASE PRODUCTINFO A IS NOT A STATEFUL COMPONENT.
       * EXPECTING NULL AS THE RESULT OF instanceOf()
       */
      expect(instanceOfProductInfoA).toEqual(null);
    });

    test('ProductInfoA Renders Props Correctly', () => {

    });
  });
});

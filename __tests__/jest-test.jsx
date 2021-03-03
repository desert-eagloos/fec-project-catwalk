import React from 'react';
import renderer from 'react-test-renderer';

import App from '../client/src/components/App';
import BootstrapTest from '../client/bootstrapTests/BootstrapTest';

describe('Welcome (Snapshot)', () => {
  test('Welcome renders App.jsx', () => {
    const component = renderer.create(<App />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('Creates a React-Bootsrap Component', () => {
  test('Creates a Button', () => {
    const component = renderer.create(<BootstrapTest />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

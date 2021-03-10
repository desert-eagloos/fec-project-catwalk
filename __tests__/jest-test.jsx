import React from 'react';
import renderer from 'react-test-renderer';

import App from '../client/src/components/App';
import BootstrapTest from '../client/bootstrapTests/BootstrapTest';

describe('Welcome (Snapshot)', () => {
  test('Welcome renders App.jsx', async () => {
    const component = renderer.create(<App />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

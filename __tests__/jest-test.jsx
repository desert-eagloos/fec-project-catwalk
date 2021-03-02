import React from 'react';
import renderer from 'react-test-renderer';
import App from '../client/src/components/App.jsx';

describe('Welcome (Snapshot)', () => {
  it('Welcome renders Hello World!!!', () => {
    const component = renderer.create(<App />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

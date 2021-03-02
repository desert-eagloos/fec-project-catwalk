import React from 'react';
import renderer from 'react-test-renderer';
import App from '../client/src/components/App.jsx';
import BootstrapTest from '../client/bootstrapTests/BootstrapTest';

describe('Welcome (Snapshot)', () => {
  it('Welcome renders Hello World!!!', () => {
    const component = renderer.create(<App />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('Creates a React-Bootsrap Component', () => {
  it('Creates a Button', () => {
    const component = renderer.create(<BootstrapTest />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});

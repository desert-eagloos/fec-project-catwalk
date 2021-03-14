import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import QARoot from '../../client/src/components/QA/QARoot';
import SearchQuestionForm from '../../client/src/components/QA/SearchQuestionForm';

describe('Questions and Answer widget should render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<QARoot />);
  });
  test('Should render a title', () => {
    expect(wrapper.find('#title').text()).toBe('Questions and Answers');
  });
});

describe('Creates Question Search Bar', () => {
  test('Question Search Bar', () => {
    const component = renderer.create(<SearchQuestionForm />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

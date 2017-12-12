import React from 'react';
import { shallow } from 'enzyme';


import Main from '../src/routes';

describe('Routes', () => {
  test('should render routes', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.length).toBe(1);
  });
});

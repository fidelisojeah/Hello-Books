import React from 'react';
import 'raf/polyfill';

import LoadingPage from '../../../src/components/pages/LoadingPage';

describe('LoadingPage', () => {
  test('should render LoadingPage component', () => {
    const wrapper = shallow(<LoadingPage />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

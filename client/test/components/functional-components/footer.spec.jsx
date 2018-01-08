import React from 'react';
import 'raf/polyfill';

import Footer from
  '../../../src/components/Footer';

describe('Footer', () => {
  test('should render footer', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import 'raf/polyfill';

import Hamburger from
  '../../../src/components/Hamburger';

describe('Hamburger Menu Bar', () => {
  test('should render hamburger component', () => {
    const wrapper = shallow(<Hamburger />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

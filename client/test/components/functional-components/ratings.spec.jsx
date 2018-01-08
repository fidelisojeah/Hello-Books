import React from 'react';
import 'raf/polyfill';

import Ratings from
  '../../../src/components/common/Ratings';

describe('Rating Component', () => {
  test('Should render Rating Component', () => {
    const wrapper = shallow(<Ratings
      ratingCount={10}
      rateSum="420"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render Rating Component', () => {
    const wrapper = shallow(<Ratings
      ratingCount={0}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

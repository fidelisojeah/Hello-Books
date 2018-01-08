import React from 'react';
import 'raf/polyfill';

import LoadingBar from
  '../../../src/components/common/LoadingBar';

describe('Loading Bar Component', () => {
  test('Should render Loading Bar Component', () => {
    const wrapper = shallow(<LoadingBar
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.loading-bar').text()).toEqual('Loading...');
    expect(wrapper).toMatchSnapshot();
  });
});

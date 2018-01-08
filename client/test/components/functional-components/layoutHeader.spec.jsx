import React from 'react';
import 'raf/polyfill';

import LayoutHeader from '../../../src/components/common/LayoutHeader';

describe('Layout Header', () => {
  test('should render Title Header Component', () => {
    const wrapper = shallow(<LayoutHeader
      headerTitle="Test Header"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

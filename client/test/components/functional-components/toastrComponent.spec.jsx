import React from 'react';
import 'raf/polyfill';

import ToastrComponent from '../../../src/components/ToastrComponent';

describe('Toastr Component', () => {
  test('should render toastr component', () => {
    const wrapper = shallow(<ToastrComponent />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

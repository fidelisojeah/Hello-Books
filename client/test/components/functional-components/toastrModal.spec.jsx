import React from 'react';
import 'raf/polyfill';

import ToastrModal from '../../../src/components/ToastrModal';

describe('Toastr Modal Component', () => {
  test('should render Toastr Modalcomponent', () => {
    const wrapper = shallow(<ToastrModal />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should close modal', () => {
    const wrapper = shallow(<ToastrModal />);
    wrapper.find('.close').simulate('click',
      { preventDefault() { } });
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

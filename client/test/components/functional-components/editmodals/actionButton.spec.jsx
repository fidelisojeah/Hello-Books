import React from 'react';
import 'raf/polyfill';

import ActionButton from
  '../../../../src/components/edit-modal/ActionButton';

describe('ActionButton Component', () => {
  const handleEditClick = jest.fn();
  test('Should render ActionButton Component', () => {
    const wrapper = shallow(<ActionButton
      handleEditClick={handleEditClick}
      isLoading
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should simulate ActionButton click', () => {
    const wrapper = shallow(<ActionButton
      handleEditClick={handleEditClick}
    />);
    expect(wrapper.length).toBe(1);
    wrapper.find('.button').simulate('click');
    expect(handleEditClick).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});

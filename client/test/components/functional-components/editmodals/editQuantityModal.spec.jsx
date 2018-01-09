import React from 'react';
import 'raf/polyfill';

import EditQuantityModal from
  '../../../../src/components/edit-modal/EditQuantityModal';

describe('EditQuantityModal Component', () => {
  const handleQuantityUpdate = jest.fn();
  const onChangeBlurEvent = jest.fn();
  const handleFieldChange = jest.fn();

  test('Should render EditQuantityModal Component', () => {
    const wrapper = shallow(<EditQuantityModal
      handleQuantityUpdate={handleQuantityUpdate}
      onChangeBlurEvent={onChangeBlurEvent}
      handleFieldChange={handleFieldChange}
      bookQuantity="3"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render EditQuantityModal Component WITH ERRORS', () => {
    const wrapper = shallow(<EditQuantityModal
      handleQuantityUpdate={handleQuantityUpdate}
      onChangeBlurEvent={onChangeBlurEvent}
      handleFieldChange={handleFieldChange}
      bookQuantity="3"
      error="An error occured?"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

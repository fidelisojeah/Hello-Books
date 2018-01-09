import React from 'react';
import 'raf/polyfill';

import EditDescModal from
  '../../../../src/components/edit-modal/EditDescModal';

describe('EditDescModal Component', () => {
  const handleEditClick = jest.fn();
  const onChangeBlurEvent = jest.fn();
  const handleFieldChange = jest.fn();
  test('Should render EditDescModal Component', () => {
    const wrapper = shallow(<EditDescModal
      handleEditClick={handleEditClick}
      onChangeBlurEvent={onChangeBlurEvent}
      handleFieldChange={handleFieldChange}
      description="Random Book?"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render EditDescModal Component WITH ERRORS', () => {
    const wrapper = shallow(<EditDescModal
      handleEditClick={handleEditClick}
      onChangeBlurEvent={onChangeBlurEvent}
      handleFieldChange={handleFieldChange}
      description="Random Book?"
      error="An error occured?"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

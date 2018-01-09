import React from 'react';
import 'raf/polyfill';

import EditBookModal from
  '../../../../src/components/edit-modal/EditBookModal';

describe('EditBookModal Component', () => {
  const handleEditClick = jest.fn();
  const onChangeBlurEvent = jest.fn();
  const handleFieldChange = jest.fn();

  test('Should render EditBookModal Component', () => {
    const wrapper = shallow(<EditBookModal
      handleEditClick={handleEditClick}
      onChangeBlurEvent={onChangeBlurEvent}
      handleFieldChange={handleFieldChange}
      bookName="Random Book?"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render EditBookModal Component WITH ERRORS', () => {
    const wrapper = shallow(<EditBookModal
      handleEditClick={handleEditClick}
      onChangeBlurEvent={onChangeBlurEvent}
      handleFieldChange={handleFieldChange}
      bookName="Random Book?"
      error="An error occured?"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

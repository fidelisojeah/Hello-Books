import React from 'react';
import 'raf/polyfill';

import EditISBNModal from
  '../../../../src/components/edit-modal/EditISBNModal';

describe('EditISBNModal Component', () => {
  const handleEditClick = jest.fn();
  const onChangeBlurEvent = jest.fn();
  const handleFieldChange = jest.fn();
  test('Should render EditISBNModal Component', () => {
    const wrapper = shallow(<EditISBNModal
      handleEditClick={handleEditClick}
      onChangeBlurEvent={onChangeBlurEvent}
      handleFieldChange={handleFieldChange}
      ISBN="Random ISBN?"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render EditISBNModal Component WITH ERRORS', () => {
    const wrapper = shallow(<EditISBNModal
      handleEditClick={handleEditClick}
      onChangeBlurEvent={onChangeBlurEvent}
      handleFieldChange={handleFieldChange}
      ISBN="Random ISBN?"
      error="Something went wrong"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

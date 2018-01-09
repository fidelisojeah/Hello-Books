import React from 'react';
import 'raf/polyfill';

import EditImageModal from
  '../../../../src/components/edit-modal/EditImageModal';

describe('EditImageModal Component', () => {
  const handleEditClick = jest.fn();
  const handleImageEditClick = jest.fn();
  const onImageDrop = jest.fn();
  test('Should render EditImageModal Component', () => {
    const wrapper = shallow(<EditImageModal
      handleEditClick={handleEditClick}
      handleImageEditClick={handleImageEditClick}
      isLoading={false}
      onImageDrop={onImageDrop}
      image="xyz.jpg"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

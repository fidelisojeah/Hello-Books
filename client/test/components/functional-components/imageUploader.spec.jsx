import React from 'react';
import 'raf/polyfill';

import ImageUploader from
  '../../../src/components/common/ImageUploader';

describe('Image Uploader Component', () => {
  test('Should render Image Uploader Component', () => {
    const handleClick = jest.fn();
    const onImageDrop = jest.fn();
    const image = '';
    const wrapper = shallow(<ImageUploader
      handleClick={handleClick}
      image={image}
      isLoading={false}
      multiple={false}
      onImageDrop={onImageDrop}
      uploadText="Upload Images"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

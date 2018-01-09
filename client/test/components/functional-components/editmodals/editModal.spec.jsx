import React from 'react';
import 'raf/polyfill';

import EditModal from
  '../../../../src/components/edit-modal/EditModal';

describe('EditModal Component', () => {
  const handleEditClick = jest.fn();
  const onChangeBlurEvent = jest.fn();
  const handleFieldChange = jest.fn();
  const handleImageEditClick = jest.fn();
  const handleYearChangeClick = jest.fn();
  const onImageDrop = jest.fn();
  describe('When element is Publish Year', () => {
    test('Should render EditModal Component with new Publish Year',
      () => {
        const wrapper = shallow(<EditModal
          bookName="Random Book"
          oldBookQuantity={3}
          updateQuantity={jest.fn()}
          description="Random Book Description of a random Book"
          element="publish year"
          handleEditClick={handleEditClick}
          handleFieldChange={handleFieldChange}
          handleImageEditClick={handleImageEditClick}
          handleYearChangeClick={handleYearChangeClick}
          ISBN="Random ISBN"
          isLoading={false}
          newImageURL="new.xyz"
          oldBookName="old Book Name"
          oldDescription="old Desc"
          oldISBN="old-1029101"
          oldPublishYear="1989"
          onChangeBlurEvent={onChangeBlurEvent}
          onImageDrop={onImageDrop}
          publishyear="1900-01-01"
          yearList={[1900, 1901, 1902]}
          yearListShow={false}
        />);
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
      }
    );
    test('Should render EditModal Component with old Publish Year',
      () => {
        const wrapper = shallow(<EditModal
          bookName="Random Book"
          oldBookQuantity={3}
          updateQuantity={jest.fn()}
          element="publish year"
          handleEditClick={handleEditClick}
          handleFieldChange={handleFieldChange}
          handleImageEditClick={handleImageEditClick}
          handleYearChangeClick={handleYearChangeClick}
          ISBN="Random ISBN"
          isLoading={false}
          newImageURL="new.xyz"
          oldBookName="old Book Name"
          oldDescription="old Desc"
          oldISBN="old-1029101"
          oldPublishYear="1989-01-01"
          onChangeBlurEvent={onChangeBlurEvent}
          onImageDrop={onImageDrop}
          yearList={[1900, 1901, 1902]}
          yearListShow={false}
        />);
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
      }
    );
  });
  describe('When element is Description', () => {
    test('Should render EditModal Component with new description',
      () => {
        const wrapper = shallow(<EditModal
          bookName="Random Book"
          oldBookQuantity={3}
          updateQuantity={jest.fn()}
          description="Random Book Description of a random Book"
          element="Description"
          handleEditClick={handleEditClick}
          handleFieldChange={handleFieldChange}
          handleImageEditClick={handleImageEditClick}
          handleYearChangeClick={handleYearChangeClick}
          ISBN="Random ISBN"
          isLoading={false}
          newImageURL="new.xyz"
          oldBookName="old Book Name"
          oldDescription="old Desc"
          oldISBN="old-1029101"
          oldPublishYear="1989"
          onChangeBlurEvent={onChangeBlurEvent}
          onImageDrop={onImageDrop}
          publishyear="1900-01-01"
          yearList={[1900, 1901, 1902]}
          yearListShow={false}
        />);
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
      }
    );
    test('Should render EditModal Component with old description',
      () => {
        const wrapper = shallow(<EditModal
          bookName="Random Book"
          oldBookQuantity={3}
          updateQuantity={jest.fn()}
          element="Description"
          handleEditClick={handleEditClick}
          handleFieldChange={handleFieldChange}
          handleImageEditClick={handleImageEditClick}
          handleYearChangeClick={handleYearChangeClick}
          ISBN="Random ISBN"
          isLoading={false}
          newImageURL="new.xyz"
          oldBookName="old Book Name"
          oldDescription="old Desc"
          oldISBN="old-1029101"
          oldPublishYear="1989"
          onChangeBlurEvent={onChangeBlurEvent}
          onImageDrop={onImageDrop}
          publishyear="1900-01-01"
          yearList={[1900, 1901, 1902]}
          yearListShow={false}
        />);
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
      }
    );
  });
  describe('When element is ISBN', () => {
    test('Should render EditModal Component with new ISBN',
      () => {
        const wrapper = shallow(<EditModal
          oldBookQuantity={3}
          updateQuantity={jest.fn()}
          bookName="Random Book"
          description="Random Book Description of a random Book"
          element="ISBN"
          handleEditClick={handleEditClick}
          handleFieldChange={handleFieldChange}
          handleImageEditClick={handleImageEditClick}
          handleYearChangeClick={handleYearChangeClick}
          ISBN="Random ISBN"
          isLoading={false}
          newImageURL="new.xyz"
          oldBookName="old Book Name"
          oldDescription="old Desc"
          oldISBN="old-1029101"
          oldPublishYear="1989"
          onChangeBlurEvent={onChangeBlurEvent}
          onImageDrop={onImageDrop}
          publishyear="1900-01-01"
          yearList={[1900, 1901, 1902]}
          yearListShow={false}
        />);
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
      }
    );
    test('Should render EditModal Component with old ISBN',
      () => {
        const wrapper = shallow(<EditModal
          oldBookQuantity={3}
          updateQuantity={jest.fn()}
          bookName="Random Book"
          element="ISBN"
          handleEditClick={handleEditClick}
          handleFieldChange={handleFieldChange}
          handleImageEditClick={handleImageEditClick}
          handleYearChangeClick={handleYearChangeClick}
          isLoading={false}
          newImageURL="new.xyz"
          oldBookName="old Book Name"
          oldDescription="old Desc"
          oldISBN="old-1029101"
          oldPublishYear="1989"
          onChangeBlurEvent={onChangeBlurEvent}
          onImageDrop={onImageDrop}
          publishyear="1900-01-01"
          yearList={[1900, 1901, 1902]}
          yearListShow={false}
        />);
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
      }
    );
  });
  describe('When element is Book Name', () => {
    test('Should render EditModal Component with new Book Name',
      () => {
        const wrapper = shallow(<EditModal
          oldBookQuantity={3}
          updateQuantity={jest.fn()}
          bookName="Random Book"
          description="Random Book Description of a random Book"
          element="Book Name"
          handleEditClick={handleEditClick}
          handleFieldChange={handleFieldChange}
          handleImageEditClick={handleImageEditClick}
          handleYearChangeClick={handleYearChangeClick}
          ISBN="Random ISBN"
          isLoading={false}
          newImageURL="new.xyz"
          oldBookName="old Book Name"
          oldDescription="old Desc"
          oldISBN="old-1029101"
          oldPublishYear="1989"
          onChangeBlurEvent={onChangeBlurEvent}
          onImageDrop={onImageDrop}
          publishyear="1900-01-01"
          yearList={[1900, 1901, 1902]}
          yearListShow={false}
        />);
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
      }
    );
    test('Should render EditModal Component with old Book Name',
      () => {
        const wrapper = shallow(<EditModal
          oldBookQuantity={3}
          updateQuantity={jest.fn()}
          element="Book Name"
          handleEditClick={handleEditClick}
          handleFieldChange={handleFieldChange}
          handleImageEditClick={handleImageEditClick}
          handleYearChangeClick={handleYearChangeClick}
          isLoading={false}
          newImageURL="new.xyz"
          oldBookName="old Book Name"
          oldDescription="old Desc"
          oldISBN="old-1029101"
          oldPublishYear="1989"
          onChangeBlurEvent={onChangeBlurEvent}
          onImageDrop={onImageDrop}
          publishyear="1900-01-01"
          yearList={[1900, 1901, 1902]}
          yearListShow={false}
        />);
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
      }
    );
  });
  describe('When element is image', () => {
    test('Should render EditModal Component with new image',
      () => {
        const wrapper = shallow(<EditModal
          oldBookQuantity={3}
          updateQuantity={jest.fn()}
          bookName="Random Book"
          description="Random Book Description of a random Book"
          element="image"
          handleEditClick={handleEditClick}
          handleFieldChange={handleFieldChange}
          handleImageEditClick={handleImageEditClick}
          handleYearChangeClick={handleYearChangeClick}
          ISBN="Random ISBN"
          isLoading={false}
          newImageURL="new.xyz"
          oldBookName="old Book Name"
          oldDescription="old Desc"
          oldISBN="old-1029101"
          oldPublishYear="1989"
          onChangeBlurEvent={onChangeBlurEvent}
          onImageDrop={onImageDrop}
          publishyear="1900-01-01"
          yearList={[1900, 1901, 1902]}
          yearListShow={false}
        />);
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
      }
    );
  });
  describe('When Wrong element is specified', () => {
    test('Should render EditModal Component with new image',
      () => {
        const wrapper = shallow(<EditModal
          oldBookQuantity={3}
          updateQuantity={jest.fn()}
          bookName="Random Book"
          description="Random Book Description of a random Book"
          element="nonsense"
          handleEditClick={handleEditClick}
          handleFieldChange={handleFieldChange}
          handleImageEditClick={handleImageEditClick}
          handleYearChangeClick={handleYearChangeClick}
          ISBN="Random ISBN"
          isLoading={false}
          newImageURL="new.xyz"
          oldBookName="old Book Name"
          oldDescription="old Desc"
          oldISBN="old-1029101"
          oldPublishYear="1989"
          onChangeBlurEvent={onChangeBlurEvent}
          onImageDrop={onImageDrop}
          publishyear="1900-01-01"
          yearList={[1900, 1901, 1902]}
          yearListShow={false}
        />);
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
      }
    );
  });
});

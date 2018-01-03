import React from 'react';
import 'raf/polyfill';

import ActionButton from
  '../../../src/components/edit-modal/ActionButton';
import EditBookModal from
  '../../../src/components/edit-modal/EditBookModal';
import EditDescModal from
  '../../../src/components/edit-modal/EditDescModal';
import EditImageModal from
  '../../../src/components/edit-modal/EditImageModal';
import EditISBNModal from
  '../../../src/components/edit-modal/EditISBNModal';
import EditModal from
  '../../../src/components/edit-modal/EditModal';
import YearListChange from
  '../../../src/components/edit-modal/YearListChange';

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
describe('YearListChange Component', () => {
  const handleEditClick = jest.fn();
  const onChangeBlurEvent = jest.fn();
  const handleFieldChange = jest.fn();
  const handleYearChangeClick = jest.fn();
  test('Should render YearListChange Component', () => {
    const wrapper = shallow(<YearListChange
      handleEditClick={handleEditClick}
      handleFieldChange={handleFieldChange}
      handleYearChangeClick={handleYearChangeClick}
      onChangeBlurEvent={onChangeBlurEvent}
      publishYear="1900-01-01"
      yearList={[1900, 1901, 1902, 1903]}
      yearListShow={false}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render YearListChange Component WITH ERRORS', () => {
    const wrapper = shallow(<YearListChange
      error="Something went wrong"
      handleEditClick={handleEditClick}
      handleFieldChange={handleFieldChange}
      handleYearChangeClick={handleYearChangeClick}
      onChangeBlurEvent={onChangeBlurEvent}
      publishYear="1900-01-01"
      yearList={[1900, 1901, 1902, 1903]}
      yearListShow
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render YearListChange Component with year click', () => {
    const wrapper = shallow(<YearListChange
      handleEditClick={handleEditClick}
      handleFieldChange={handleFieldChange}
      handleYearChangeClick={handleYearChangeClick}
      onChangeBlurEvent={onChangeBlurEvent}
      publishYear="1900-01-01"
      yearList={[1900, 1901, 1902, 1903]}
      yearListShow
    />);
    expect(wrapper.length).toBe(1);
    wrapper.find('#year-list li').first().simulate('mouseDown');
    expect(handleYearChangeClick).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
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

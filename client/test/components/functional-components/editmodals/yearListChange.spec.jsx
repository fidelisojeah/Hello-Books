import React from 'react';
import 'raf/polyfill';

import YearListChange from
  '../../../../src/components/edit-modal/YearListChange';

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

import React from 'react';
import 'raf/polyfill';
import Sorter from
  '../../../src/components/common/Sorter';
import TextField from
  '../../../src/components/common/TextField';

describe('Sorter Component', () => {
  let buttonClicked;
  const sortFunction = jest.fn((event, clicked) => {
    buttonClicked = clicked;
  });
  test('Should render Sorter Component', () => {
    const wrapper = shallow(<Sorter
      sortFunction={sortFunction}
      sortType="alphabetical"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render Sorter Component and click newest', () => {
    const wrapper = shallow(<Sorter
      sortFunction={sortFunction}
      sortType="rating"
    />);
    expect(wrapper.length).toBe(1);
    wrapper.find('.c-right a').first().simulate('click');
    expect(sortFunction).toHaveBeenCalled();
    expect(buttonClicked).toEqual('newest');
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render Sorter Component and click alphabetical', () => {
    const wrapper = shallow(<Sorter
      sortFunction={sortFunction}
      sortType="newest"
    />);
    expect(wrapper.length).toBe(1);
    wrapper.find('.c-right a').last().simulate('click');
    expect(sortFunction).toHaveBeenCalled();
    expect(buttonClicked).toEqual('alphabetical');
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render Sorter Component and click rating', () => {
    const wrapper = shallow(<Sorter
      sortFunction={sortFunction}
      sortType="rating"
    />);
    expect(wrapper.length).toBe(1);
    wrapper.find('.-active').last().simulate('click');
    expect(sortFunction).toHaveBeenCalled();
    expect(buttonClicked).toEqual('rating');
    expect(wrapper).toMatchSnapshot();
  });
});

describe('TextField Component', () => {
  const checkExists = jest.fn();
  const onChange = jest.fn();
  test('Should render TextField Component with text', () => {
    const wrapper = shallow(<TextField
      formField="form-group"
      isRequired
      field="username"
      value=""
      label="Enter Your Username"
      type="text"
      onChange={onChange}
      checkExists={checkExists}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render TextField Component with textarea', () => {
    const wrapper = shallow(<TextField
      formField="form-group"
      field="description"
      value=""
      label="Enter Your Description"
      isRequired={false}
      type="textarea"
      onChange={onChange}
      checkExists={checkExists}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render TextField Component with errors', () => {
    const wrapper = shallow(<TextField
      formField="form-group"
      field="description"
      isRequired={false}
      value=""
      compoundError={[
        {
          field: 'description',
          error: 'description is crap'
        },
        {
          field: 'username',
          error: 'username is crap'
        }
      ]}
      label="Enter Your Description"
      type="text"
      onChange={onChange}
      checkExists={checkExists}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render TextField Component with errors', () => {
    const wrapper = shallow(<TextField
      formField="form-group"
      field="description"
      value=""
      isRequired={false}
      inputError="description"
      errorMessage="description is crap"
      label="Enter Your Description"
      type="text"
      onChange={onChange}
      checkExists={checkExists}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render TextField Component with errors', () => {
    const wrapper = shallow(<TextField
      formField="form-group"
      field="description"
      value=""
      isRequired={false}
      errField="description is crap"
      label="Enter Your Description"
      type="text"
      autocomplete="no"
      onChange={onChange}
      checkExists={checkExists}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render TextField Component with errors', () => {
    const wrapper = shallow(<TextField
      formField="form-group"
      field="description"
      value=""
      compoundError={[
        {
          field: 'description',
          error: 'description is crap'
        }
      ]}
      label="Enter Your Description"
      type="textarea"
      onChange={onChange}
      checkExists={checkExists}
      isRequired={false}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render TextField Component with errors', () => {
    const wrapper = shallow(<TextField
      formField="form-group"
      field="description"
      value=""
      isRequired
      inputError="description"
      errorMessage="description is crap"
      label="Enter Your Description"
      type="textarea"
      onChange={onChange}
      checkExists={checkExists}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render TextField Component with errors', () => {
    const wrapper = shallow(<TextField
      formField="form-group"
      field="description"
      value=""
      isRequired={false}
      errField="description is crap"
      label="Enter Your Description"
      type="textarea"
      autocomplete="no"
      onChange={onChange}
      checkExists={checkExists}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

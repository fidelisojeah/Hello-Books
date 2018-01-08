import React from 'react';
import 'raf/polyfill';

import Pagination from
  '../../../src/components/common/Pagination';

describe('Pagination', () => {
  test('should render Pagination Component', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Pagination
      currentPage={1}
      totalPages={10}
      paginationFunction={onClick}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render Pagination Component', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Pagination
      totalPages={10}
      paginationFunction={onClick}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render Pagination Component', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Pagination
      currentPage={8}
      totalPages={10}
      paginationFunction={onClick}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render Pagination Component', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Pagination
      currentPage={2}
      totalPages={4}
      paginationFunction={onClick}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render middle page of Pagination Component',
    () => {
      const onClick = jest.fn();
      const wrapper = shallow(<Pagination
        currentPage={5}
        totalPages={10}
        paginationFunction={onClick}
      />);
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
  test('should Not show pages',
    () => {
      const onClick = jest.fn();
      const wrapper = shallow(<Pagination
        currentPage={50}
        totalPages={10}
        paginationFunction={onClick}
      />);
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
  test('should Simulate click of page',
    () => {
      const onClick = jest.fn();
      const wrapper = shallow(<Pagination
        currentPage={5}
        totalPages={10}
        paginationFunction={onClick}
      />);
      expect(wrapper.length).toBe(1);
      wrapper.find('.pagination-div button').first().simulate('click');
      expect(onClick).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
});

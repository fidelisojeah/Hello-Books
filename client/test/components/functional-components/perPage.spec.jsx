import React from 'react';
import 'raf/polyfill';

import PerPage from '../../../src/components/common/PerPage';

describe('Page Limit Selector', () => {
  test('should render Page Limit Changer Component with 50 as active', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<PerPage
      limit={50}
      perPageFunction={onClick}
    />);
    expect(wrapper.find('span')).toHaveLength(4);
    expect(wrapper.find('.-active')).toHaveLength(1);
    expect(wrapper.find('#pp50').hasClass('-active')).toBe(true);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render Page Limit Changer Component with 10 as active', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<PerPage
      limit={10}
      perPageFunction={onClick}
    />);
    expect(wrapper.find('span')).toHaveLength(4);
    expect(wrapper.find('.-active')).toHaveLength(1);
    expect(wrapper.find('#pp10').hasClass('-active')).toBe(true);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render Page Limit Changer Component with 100 as active', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<PerPage
      limit={100}
      perPageFunction={onClick}
    />);
    expect(wrapper.find('span')).toHaveLength(4);
    expect(wrapper.find('.-active')).toHaveLength(1);
    expect(wrapper.find('#pp100').hasClass('-active')).toBe(true);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test(`should render Page Limit Changer
   Component with 100 as active then change on click`,
    () => {
      let limit = 100;
      const onClick = jest.fn((event, value) => {
        limit = value;
      });
      const wrapper = shallow(<PerPage
        limit={limit}
        perPageFunction={onClick}
      />);
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('span')).toHaveLength(4);
      expect(wrapper.find('.-active')).toHaveLength(1);
      expect(wrapper.find('#pp100').hasClass('-active')).toBe(true);
      wrapper.find('#pp10').simulate('click');
      expect(onClick).toHaveBeenCalled();
      wrapper.find('#pp100').simulate('click');
      expect(onClick).toHaveBeenCalled();
      wrapper.find('#pp50').simulate('click');
      expect(wrapper).toMatchSnapshot();
    });
});

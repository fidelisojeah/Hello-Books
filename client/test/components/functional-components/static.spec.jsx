import React from 'react';
import 'raf/polyfill';

import ToastrComponent from '../../../src/components/ToastrComponent';
import ToastrModal from '../../../src/components/ToastrModal';
import SiteCache from '../../../src/components/SiteCache';

import LoadingPage from '../../../src/components/pages/LoadingPage';
import BreadCrumbs from '../../../src/components/common/BreadCrumbs';
import LayoutHeader from '../../../src/components/common/LayoutHeader';
import PerPage from '../../../src/components/common/PerPage';


describe('Toastr Component', () => {
  test('should render toastr component', () => {
    const wrapper = shallow(<ToastrComponent />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('Toastr Modal Component', () => {
  test('should render Toastr Modalcomponent', () => {
    const wrapper = shallow(<ToastrModal />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should close modal', () => {
    const wrapper = shallow(<ToastrModal />);
    wrapper.find('.close').simulate('click',
      { preventDefault() { } });
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('LoadingPage', () => {
  test('should render LoadingPage component', () => {
    const wrapper = shallow(<LoadingPage />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('Site Cache Overlay', () => {
  test('should render site Cache component', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<SiteCache
      handleClick={onClick}
    />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
    wrapper.find('div').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
describe('BreadCrumbs', () => {
  test('should render breadcrumb component', () => {
    const wrapper = shallow(<BreadCrumbs
      breadCrumbLinks={[
        {
          linkName: 'Home',
          link: '/'
        }
      ]}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('Layout Header', () => {
  test('should render Title Header Component', () => {
    const wrapper = shallow(<LayoutHeader
      headerTitle="Test Header"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

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

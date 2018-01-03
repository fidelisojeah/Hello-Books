import React from 'react';
import 'raf/polyfill';

import Footer from
  '../../../src/components/Footer';
import Navbar from
  '../../../src/components/Navbar';
import Hamburger from
  '../../../src/components/Hamburger';

describe('Footer', () => {
  test('should render footer', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('NavBar', () => {
  test('should render NavBar', () => {
    const show = jest.fn();
    const logout = jest.fn();
    const wrapper = shallow(<Navbar
      show={show}
      logout={logout}
      username="randomPerson"
    />);
    expect(wrapper.length).toBe(1);
    wrapper.find('.usrBtn').first().simulate('click');
    expect(show).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
describe('Hamburger Menu Bar', () => {
  test('should render hamburger component', () => {
    const wrapper = shallow(<Hamburger />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

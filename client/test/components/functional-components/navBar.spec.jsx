import React from 'react';
import 'raf/polyfill';

import Navbar from
  '../../../src/components/Navbar';

describe('NavBar', () => {
  test('should render NavBar', () => {
    const show = jest.fn();
    const logout = jest.fn();
    const wrapper = shallow(<Navbar
      show={show}
      logout={logout}
      user={{
        username: 'randomPerson',
        role: 'Admin'
      }}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.profile-name').text()).toEqual('randomPerson');
    wrapper.find('.usrBtn').first().simulate('click');
    expect(show).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});

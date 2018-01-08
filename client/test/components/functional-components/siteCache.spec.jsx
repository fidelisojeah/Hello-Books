import React from 'react';
import 'raf/polyfill';

import SiteCache from '../../../src/components/SiteCache';

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

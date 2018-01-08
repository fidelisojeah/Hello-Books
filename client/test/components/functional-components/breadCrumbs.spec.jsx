import React from 'react';
import 'raf/polyfill';

import BreadCrumbs from '../../../src/components/common/BreadCrumbs';

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

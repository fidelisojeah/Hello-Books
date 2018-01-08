import React from 'react';
import 'raf/polyfill';

import NotFoundComponent from
  '../../../src/components/common/NotFoundComponent';

describe('Not Found Component', () => {
  test('Should render Not Found Component', () => {
    const wrapper = shallow(<NotFoundComponent
      errorMessage="Stuff Not Found!!!"
      links={[
        {
          linkName: 'Home',
          link: '/'
        }
      ]}
      title="Stuff"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

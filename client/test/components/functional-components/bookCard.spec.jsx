import React from 'react';
import 'raf/polyfill';

import BookCard from
  '../../../src/components/common/BookCard';

describe('Book Card Component', () => {
  test('Should render Book Card Component', () => {
    const bookAuthors = [{
      id: 1,
      name: 'Random Author',
      dateofBirth: '1990-12-12'
    }, {
      id: 2,
      name: 'Second Author',
      dateofBirth: '1900-12-12'
    }];

    const wrapper = shallow(<BookCard
      bookID={1}
      removeFromCategory={jest.fn()}
      allowEdit={false}
      bookName="Some random Book"
      synopsis="Random description about random Books"
      imgHref="xyz.jpg"
      ratingCount="4"
      ratingSum="90"
      bookAuthors={bookAuthors}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.book-title').text()).toEqual('Some random Book');
    expect(wrapper).toMatchSnapshot();
  });
});

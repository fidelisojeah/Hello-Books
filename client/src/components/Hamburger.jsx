import React from 'react';

const removeSiteCache = (event) => {
  if (!event.target.matches('.header--right') &&
    !event.target.matches('.c-hamburger') &&
    !event.target.matches('.toggle-menu')
  ) {
    document.body.classList.remove('with--sidebar');
    window.removeEventListener('click', removeSiteCache);
  }
};

const menuReduce = (event) => {
  event.preventDefault();
  window.addEventListener('click', removeSiteCache);
  document.body.classList.add('with--sidebar');
};

const Hamburger = () => {
  return (
    <div className="header--menu-opener">
      <span
        id="hamburger"
        role="presentation"
        onClick={menuReduce}
        className="c-hamburger c-hamburger--htx"
      >
        <span className="toggle-menu">toggle menu</span>
      </span>
    </div>
  );
};

export default Hamburger;

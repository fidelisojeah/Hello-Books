import React from 'react';

const menuReduce = (event) => {
  event.preventDefault();
  document.body.classList.add('with--sidebar');
};

const Hamburger = () => {
  return (
    <div className="header--menu-opener">
      <span
        id="hamburger"
        role="presentation"
        onClick={menuReduce}
        className="c-hamburger c-hamburger--htx visible-xs-block visible-sm-block"
      >
        <span>toggle menu</span>
      </span>
    </div>
  );
};

export default Hamburger;

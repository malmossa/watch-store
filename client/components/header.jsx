import React from 'react';

function Header(props) {
  const cartText = props.cartItemCount === 1 ? 'item' : 'items';
  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="navbar-brand text-white ml-5" href="#">
        <img src="images/doller.png" width="30" height="30" className="d-inline-block align-top mr-1" />
          Wicked Sales
      </div>
      <div className="text-white mr-5">
        <span className="mr-2">{`${props.cartItemCount} ${cartText}`}</span>
        <i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
      </div>
    </nav>
  );
}

export default Header;

import React from 'react';

function Header(props) {
  const cartText = props.cartItemCount === 1 ? 'item' : 'items';
  return (
    <nav className="navbar navbar-light bg-info">
      <div className="navbar-brand text-white ml-5" href="#">
        <img src="images/logo.png" width="200" height="50" className="d-inline-block align-top mr-1" />
      </div>
      <div onClick={() => props.setView('cart', {})} className="text-white mr-5 cart-div">
        <span className="mr-2">{`${props.cartItemCount} ${cartText}`}</span>
        <i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
      </div>
    </nav>
  );
}

export default Header;

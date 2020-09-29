import React from 'react';

function CartSummaryItem(props) {
  const item = props.item;
  const price = props.item.price.toString();
  let dollars, cents;
  if (price.length === 4) {
    dollars = price.substr(0, 2);
    cents = price.substr(2);
  } else {
    dollars = price.substr(0, 1);
    cents = price.substr(1, 2);
  }
  return (
    <div className="row mb-4 border d-flex align-items-stretch">
      <div className="col-4">
        <img height="200" width="300" src={item.image} className="product-image" alt={item.name} />
      </div>
      <div className="col-6 pt-4">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text"><small className="text-secondary">${dollars}.{cents}</small></p>
        <p className="card-text">{item.shortDescription}</p>
      </div>
    </div>
  );
}

export default CartSummaryItem;

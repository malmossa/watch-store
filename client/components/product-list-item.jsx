import React from 'react';

function ProductListItem(props) {
  const price = props.product.price.toString();
  let dollars;
  let cents;

  if (price.length <= 4) {
    dollars = price.slice(0, price.length - 2);
    cents = price.slice(price.length - 2);
  }

  return (
    <div className="col-4 product-card d-flex align-items-stretch">
      <div className="card mb-3">
        <img height="150" src={props.product.image} className="card-img-top product-image" alt={props.product.name} />
        <div className="card-body">
          <h5 className="card-title">{props.product.name}</h5>
          <p className="card-text"><small className="text-secondary">${dollars}.{cents}</small></p>
          <p className="card-text">{props.product.shortDescription}</p>
        </div>
      </div>
    </div>

  );
}

export default ProductListItem;

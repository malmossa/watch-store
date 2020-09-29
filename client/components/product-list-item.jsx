import React from 'react';

function ProductListItem(props) {
  const price = props.product.price.toString();
  let dollars, cents;
  if (price.length === 4) {
    dollars = price.substr(0, 2);
    cents = price.substr(2);
  } else {
    dollars = price.substr(0, 1);
    cents = price.substr(1, 2);
  }

  return (
    <div className="col-4 d-flex align-items-stretch product">
      <div onClick={() => props.setView('details', { productId: props.product.productId, dollars: dollars, cents: cents })} className="card product-card">
        <img height="200" src={props.product.image} className="card-img-top product-image" alt={props.product.name} />
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

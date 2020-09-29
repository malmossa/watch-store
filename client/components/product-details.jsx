import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(response => response.json())
      .then(data => this.setState(state => ({ product: data })));
  }

  render() {
    const product = this.state.product;
    if (product === null) return null;
    return (
      <div className="container border p-3 mt-5">
        <div className="row">
          <a onClick={() => this.props.setView('catalog', {})} className="text-muted pl-4 mb-4 back-to-catalog">&lt; Back to catalog</a>
        </div>
        <div className="row">
          <div className="col-4">
            <img className="product-image" height="300px" width="300px" src={product.image} alt={product.name}></img>
          </div>
          <div className="col-7">
            <h2>{product.name}</h2>
            <p className="text-muted">${this.props.params.dollars}.{this.props.params.cents}</p>
            <p className="card-text">{product.shortDescription}</p>
            <button onClick={() => this.props.addToCart(product)} type="button" className="btn btn-primary mt-1">Add to Cart</button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="mt-4 pl-2">{product.longDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;

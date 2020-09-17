import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => this.setState(state => ({ products: data })));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="card-deck">
          {
            this.state.products.map(product => {
              return (
                <ProductListItem key={product.name} product={product} />
              );
            })
          }
        </div>
      </div>

    );
  }
}

export default ProductList;

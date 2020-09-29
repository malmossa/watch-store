import React from 'react';
import Header from './header';
import ProductDetails from './product-details';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { name: 'catalog', params: {} },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
        const newCart = this.state.cart.slice();
        newCart.push(data);
        this.setState({ cart: newCart });
      });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => this.setState({ cart: data }));
  }

  setView(name, params) {
    this.setState({
      view:
        { name: name, params: params }
    });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} />
          <ProductList setView={this.setView} />
        </div>
      );
    } else {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} />
          <ProductDetails addToCart={this.addToCart} params={this.state.view.params} setView={this.setView} />
        </div>
      );
    }
  }
}

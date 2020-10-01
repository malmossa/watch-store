import React from 'react';
import Header from './header';
import ProductDetails from './product-details';
import ProductList from './product-list';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Carousel from './carousel';
import Modal from './modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { name: 'catalog', params: {} },
      cart: [],
      modalOpen: true
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  modalToggle() {
    this.setState({ modalOpen: !this.state.modalOpen });
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
      .then(data => {
        this.setState({ cart: data });
      });
  }

  placeOrder(order) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(() => {
        this.setState({ cart: [] });
        this.setState({ view: { name: 'catalog', params: {} } });
      });
  }

  setView(name, params) {
    this.setState({
      view:
        { name: name, params: params }
    });
  }

  render() {
    const header = <Header setView={this.setView} cartItemCount={this.state.cart.length} />;
    let modal = null;
    if (this.state.modalOpen) {
      modal = <Modal modalToggle={this.modalToggle} />;
    }
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          {header}
          {modal}
          <Carousel />
          <ProductList setView={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <div>
          {header}
          <CartSummary setView={this.setView} cart={this.state.cart} />
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div>
          {header}
          <ProductDetails addToCart={this.addToCart} params={this.state.view.params} setView={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <div>
          {header}
          <CheckoutForm setView={this.setView} cart={this.state.cart} placeOrder={this.placeOrder} />
        </div>
      );
    }
  }
}

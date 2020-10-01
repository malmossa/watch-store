import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const order = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.handleReset();
    this.props.placeOrder(order);
    this.props.setView('checkout', {});
  }

  handleReset() {
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
    document.getElementById('checkoutForm').reset();
  }

  render() {
    const cartTotal = this.props.cart.reduce((acc, cur) => acc + cur.price, 0).toString();
    let dollars, cents;
    if (cartTotal.length === 3) {
      dollars = cartTotal.substr(0, 1);
      cents = cartTotal.substr(-2);
    } else {
      dollars = cartTotal.slice(0, -2);
      cents = cartTotal.substr(-2);
    }
    return (
      <div className="container mt-4">
        <h2 className="mt-3 mb-3">My Cart</h2>
        <h6 className="text-danger font-weight-bold">*This form is for educational purposes only, please do not provide personal information.</h6>
        <div>
          <h6 className="pb-4 pt-3 text-muted">{`Order Total: $${dollars}.${cents}`}</h6>
        </div>
        <div className="row">
          <form id="checkoutForm" onSubmit={this.handleSubmit} onReset={this.handleReset} className="col-12">
            <div>
              <label>Name*</label>
            </div>
            <div>
              <input required value={this.state.name} onChange={this.handleChange} name="name" type="text" className="border rounded input-group mb-3"></input>
            </div>
            <div>
              <label>Credit Card*</label>
            </div>
            <div>
              <input required value={this.state.creditCard} onChange={this.handleChange} name="creditCard" type="text" className="border rounded input-group mb-3"></input>
            </div>
            <div>
              <label>Shipping Address*</label>
            </div>
            <div>
              <textarea required value={this.state.shippingAddress} onChange={this.handleChange} name="shippingAddress" className="shipping-address border rounded input-group mb-3"></textarea>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <a onClick={() => this.props.setView('catalog', {})} className="text-muted mt-3 mb-4 back-to-catalog">&lt; Continue Shopping</a>
              <button className="mt-3 mb-4 btn btn-primary">Place Order</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;

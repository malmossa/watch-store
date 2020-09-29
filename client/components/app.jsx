import React from 'react';
import Header from './header';
import ProductDetails from './product-details';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { name: 'catalog', params: {} }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {

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
          <Header />
          <ProductList setView={this.setView} />
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <ProductDetails params={this.state.view.params} setView={this.setView} />
        </div>
      );
    }
  }
}

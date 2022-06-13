import { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };
  render() {
    const { query } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery query={query} />
      </div>
    );
  }
}

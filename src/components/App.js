import { Component } from 'react';
import ImageGallery from './ImageGallery';

const KEY = '26823171-490067530a76e346906bfc05d';

export default class App extends Component {
  state = {
    gallery: [],
    page: 1,
  };
  componentDidMount() {
    fetch(
      `https://pixabay.com/api/?q=cat&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(gallery => this.setState({ gallery: gallery.hits }));
  }
  componentDidUpdate() {
    console.log(this.state.gallery);
  }
  render() {
    return (
      <>
        <ImageGallery gallery={this.state.gallery} />
      </>
    );
  }
}

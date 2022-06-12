import { Component } from 'react';

const KEY = '26823171-490067530a76e346906bfc05d';

export default class App extends Component {
  state = {
    gallery: null,
    page: 1,
  };
  componentDidMount() {
    fetch(
      `https://pixabay.com/api/?q=cat&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(gallery => this.setState({ gallery: gallery.hits }));
  }
  render() {
    return (
      <>
        {this.state.gallery &&
          this.state.gallery.map(galleryItem => (
            <li key={galleryItem.id} className="gallery-item">
              <img src={galleryItem.webformatURL} alt="webformatURL" />
            </li>
          ))}
      </>
    );
  }
}

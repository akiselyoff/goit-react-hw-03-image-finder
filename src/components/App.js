import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';
import ImageGallery from './ImageGallery';

const KEY = '26823171-490067530a76e346906bfc05d';

export default class App extends Component {
  state = {
    gallery: [],
    page: 1,
    loading: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    fetch(
      `https://pixabay.com/api/?q=cat&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(gallery => this.setState({ gallery: gallery.hits }))
      .finally(() => this.setState({ loading: false }));
  }
  componentDidUpdate() {
    console.log(this.state.gallery);
  }
  render() {
    return (
      <>
        {this.state.loading && (
          <TailSpin color="#00BFFF" height={80} width={80} />
        )}
        <ImageGallery gallery={this.state.gallery} />
      </>
    );
  }
}

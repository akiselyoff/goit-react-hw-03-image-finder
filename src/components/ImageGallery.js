import { Component } from 'react';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';
import ImageGalleryItem from './ImageGalleryItem';
import ImageGalleryError from './ImageGalleryError';

const KEY = '26823171-490067530a76e346906bfc05d';

class ImageGallery extends Component {
  state = {
    query: '',
    gallery: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${nextQuery}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.status.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`По запросу ${nextQuery} ничего не найдено`)
          );
        })
        .then(gallery =>
          this.setState({ gallery: gallery.hits, status: 'resolved' })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  render() {
    const { gallery, error, status } = this.state;

    if (status === 'idle') {
      return <h1>Enter your query</h1>;
    }
    if (status === 'pending') {
      return <TailSpin color="#00BFFF" height={80} width={80} />;
    }
    if (status === 'rejected') {
      return <ImageGalleryError message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <ul>
          {gallery.map(galleryItem => {
            return (
              <ImageGalleryItem
                key={galleryItem.id}
                galleryItem={galleryItem}
              />
            );
          })}
        </ul>
      );
    }
  }
}

export default ImageGallery;

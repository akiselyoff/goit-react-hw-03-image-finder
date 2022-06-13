import { Component } from 'react';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';
import fetchGallery from '../fetchAPI';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import ImageGalleryError from './ImageGalleryError';
import Button from '../Button/Button';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    gallery: [],
    query: '',
    page: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending', page: 1, gallery: null });

      fetchGallery
        .fetchAPI(nextQuery, nextPage)
        .then(gallery =>
          this.setState({
            gallery: gallery.hits,
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevPage !== nextPage && prevQuery === nextQuery) {
      this.setState({ status: 'pending' });
      console.log(prevQuery);
      console.log(nextQuery);
      console.log(prevQuery === nextQuery);

      fetchGallery
        .fetchAPI(nextQuery, nextPage)
        .then(gallery => {
          console.log(prevState.gallery);
          console.log(gallery);
          this.setState({
            gallery: [...prevState.gallery, ...gallery.hits],
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleLoadMore = () => {
    console.log('load more');

    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

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
        <>
          <ul className={s.ImageGallery}>
            {gallery.map(galleryItem => {
              return (
                <ImageGalleryItem
                  key={galleryItem.id}
                  galleryItem={galleryItem}
                />
              );
            })}
          </ul>
          <Button onClick={this.handleLoadMore} />
        </>
      );
    }
  }
}

export default ImageGallery;

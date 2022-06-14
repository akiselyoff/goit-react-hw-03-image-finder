import { Component } from 'react';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';
import fetchGallery from '../fetchAPI';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import ImageGalleryError from './ImageGalleryError';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    gallery: [],
    query: '',
    page: 1,
    error: null,
    status: 'idle',
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending', page: 1 });

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
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  onImageClick = evt => {
    if (evt.target.nodeName === 'IMG') {
      const imgId = Number(evt.target.attributes.id.value);

      this.state.gallery.forEach(item => {
        const itemId = Number(item.id);

        if (itemId === imgId) {
          console.log(item.largeImageURL);
          this.setState({
            largeImageURL: item.largeImageURL,
            isModalOpen: true,
          });
        }
      });
    }
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { gallery, error, status, isModalOpen } = this.state;

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
          {isModalOpen && (
            <Modal
              imgModal={this.state.largeImageURL}
              closeModal={this.closeModal}
            />
          )}
          <ul className={s.ImageGallery}>
            {gallery.map(galleryItem => {
              return (
                <ImageGalleryItem
                  onImageClick={this.onImageClick}
                  key={galleryItem.id}
                  galleryItem={galleryItem}
                />
              );
            })}
          </ul>

          {gallery.length > 0 && <Button onClick={this.handleLoadMore} />}
        </>
      );
    }
  }
}

export default ImageGallery;

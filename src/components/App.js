import { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from './Searchbar/Searchbar';
import fetchGallery from './fetchAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryError from './ImageGallery/ImageGalleryError';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export default class App extends Component {
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

    if (prevPage !== nextPage || prevQuery === nextQuery) {
      this.setState({ status: 'pending' });

      fetchGallery
        .fetchAPI(nextQuery, nextPage)
        .then(gallery => {
          this.setState({
            gallery: [...prevState.gallery, ...gallery.hits],
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleFormSubmit = query => {
    this.setState({ query });
  };

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
          this.setState({
            dataModalImg: item,
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
    const { gallery, query, error, status, isModalOpen } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && <h1>Enter your query</h1>}
        {status === 'pending' && (
          <TailSpin
            ariaLabel="loading"
            color="#00BFFF"
            height={80}
            width={80}
          />
        )}
        {status === 'resolved' && <ImageGallery query={query} />}
        {status === 'rejected' && <ImageGalleryError message={error.message} />}
        {gallery.length > 0 && <Button onClick={this.handleLoadMore} />}
        {isModalOpen && (
          <Modal
            imgModal={this.state.dataModalImg}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}

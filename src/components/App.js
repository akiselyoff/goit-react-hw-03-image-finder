import { PureComponent } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from './Searchbar/Searchbar';
import fetchGallery from './fetchAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryError from './ImageGallery/ImageGalleryError';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import LoaderSpinner from './LoaderSpinner/LoaderSpinner';

export default class App extends PureComponent {
  state = {
    gallery: [],
    query: '',
    page: 1,
    error: null,
    status: 'idle',
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    console.log('prevQuery: ' + prevQuery);
    console.log('nextQuery: ' + nextQuery);
    console.log(prevQuery === nextQuery);

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending', gallery: [], page: 1 });

      fetchGallery
        .fetchAPI(nextQuery, nextPage)
        .then(gallery => {
          this.setState({
            gallery: gallery.hits,
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevPage !== nextPage && nextPage !== 1) {
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
    console.log(this.state.dataModalImg);
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { gallery, error, status, isModalOpen } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && <h1>Enter your query</h1>}
        {status === 'pending' && <LoaderSpinner />}
        {status === 'resolved' && (
          <ImageGallery gallery={gallery} onImageClick={this.onImageClick} />
        )}
        {status === 'rejected' && <ImageGalleryError message={error.message} />}
        {status === 'resolved' && gallery.length > 0 && (
          <Button onClick={this.handleLoadMore} />
        )}
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

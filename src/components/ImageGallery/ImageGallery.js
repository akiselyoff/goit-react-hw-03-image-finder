import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    gallery: this.props.gallery,
  };

  render() {
    const { gallery } = this.state;

    return (
      <ul className={s.ImageGallery}>
        {gallery.map(galleryItem => {
          return (
            <ImageGalleryItem
              onImageClick={this.props.onImageClick}
              key={galleryItem.id}
              galleryItem={galleryItem}
            />
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string,
};

export default ImageGallery;

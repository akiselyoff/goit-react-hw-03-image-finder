import { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  render() {
    return (
      <ul className={s.ImageGallery}>
        {this.props.gallery.map(galleryItem => {
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
  galleryItem: PropTypes.shape({ id: PropTypes.number.isRequired }),
};

export default ImageGallery;

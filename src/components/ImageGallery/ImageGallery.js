import { Component } from 'react';

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

export default ImageGallery;

import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ gallery }) => {
  return (
    <ul>
      {gallery.map(galleryItem => {
        return (
          <ImageGalleryItem key={galleryItem.id} galleryItem={galleryItem} />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.array,
};

export default ImageGallery;

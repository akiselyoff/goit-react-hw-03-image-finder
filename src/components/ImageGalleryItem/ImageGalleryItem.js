import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ galleryItem, onImageClick }) => {
  return (
    <li onClick={onImageClick} className={s.GalleryItem}>
      <img
        className={s.ImageGalleryItem}
        id={galleryItem.id}
        src={galleryItem.webformatURL}
        alt={galleryItem.tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  galleryItem: PropTypes.shape({
    id: PropTypes.number,
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

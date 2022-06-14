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

export default ImageGalleryItem;

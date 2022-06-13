import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ galleryItem }) => {
  return (
    <li className={s.GalleryItem}>
      <img
        className={s.ImageGalleryItem}
        src={galleryItem.webformatURL}
        alt={galleryItem.webformatURL}
      />
    </li>
  );
};

export default ImageGalleryItem;

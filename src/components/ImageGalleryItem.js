const ImageGalleryItem = ({ galleryItem }) => {
  return (
    <li className="gallery-item">
      <img src={galleryItem.webformatURL} alt={galleryItem.webformatURL} />
    </li>
  );
};

export default ImageGalleryItem;

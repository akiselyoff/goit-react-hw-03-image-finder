import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

class Modal extends Component {
  handleKeyDown = evt => {
    if (evt.key === 'Escape') {
      const { closeModal } = this.props;
      closeModal();
    }
  };
  handleClick = evt => {
    if (evt.target.nodeName !== 'IMG') {
      const { closeModal } = this.props;
      closeModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('click', this.handleClick);
  }

  render() {
    const { imgModal } = this.props;
    return (
      <div className={s.Overlay}>
        <div className={s.Modal}>
          <img src={imgModal.largeImageURL} alt={imgModal.tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imgModal: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),

  closeModal: PropTypes.func.isRequired,
};

export default Modal;

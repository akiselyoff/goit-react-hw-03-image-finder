import { Component } from 'react';
import PropTypes from 'prop-types';
import { BiSearchAlt2 } from 'react-icons/bi';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = { query: '' };

  queryChange = evt => {
    this.setState({ query: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.query.trim() === '') {
      alert('Enter your query');
      return;
    }

    this.props.onSubmit(this.state.query);
    // this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <BiSearchAlt2 style={{ margin: '7px auto' }} />
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.queryChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

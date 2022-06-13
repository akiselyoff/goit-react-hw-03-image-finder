import { Component } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

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
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">
              <BiSearchAlt2 />
            </span>
          </button>

          <input
            className="input"
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

export default Searchbar;

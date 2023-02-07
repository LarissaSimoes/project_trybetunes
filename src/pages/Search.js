import React from 'react';
import Header from '../components/Header';

const MIN_LENGTH = 2;
class Search extends React.Component {
  state = {
    isButtonDisabled: true,
    search: '',
  };

  enableButton = () => {
    const { search } = this.state;
    const approvedSearch = search.length < MIN_LENGTH;

    this.setState({
      isButtonDisabled: approvedSearch,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value,
    }, this.enableButton);
  };

  render() {
    const { isButtonDisabled, search } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        Search
        <form>
          <label htmlFor="search">
            <input
              data-testid="search-artist-input"
              name="search"
              type="text"
              placeholder="Nome do artista"
              value={ search }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

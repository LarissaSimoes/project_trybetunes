import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_LENGTH = 2;
class Search extends React.Component {
  state = {
    isButtonDisabled: true,
    search: '',
    isLoading: false,
    albums: [],
    prevSearch: '',
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

  searchFunc = async (e) => {
    e.preventDefault();
    const { search } = this.state;
    this.setState({
      isLoading: true,
      prevSearch: search,
    });
    const albumsResp = await searchAlbumsAPI(search);
    this.setState({
      isLoading: false,
      search: '',
      albums: albumsResp,
    });
  };

  render() {
    const { isButtonDisabled, search, isLoading, albums, prevSearch } = this.state;

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
              id="search"
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.searchFunc }
            type="submit"
          >
            Pesquisar
          </button>
          { isLoading ? (<Loading />) : null }
        </form>
        {prevSearch && (

          <h2>
            Resultado de álbuns de:
            {' '}
            {prevSearch}
          </h2>
        )}
        {albums.length === 0 ? (
          <h2>Nenhum álbum foi encontrado</h2>
        ) : (
          <div>
            {
              albums.map((album, index) => (
                <div key={ index }>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <img src={ album.artworkUrl100 } alt={ album.artistName } />
                    <p>{ album.collectionName }</p>
                    <span>{ album.artistName }</span>
                  </Link>
                </div>
              ))
            }
          </div>
        )}
      </div>
    );
  }
}

export default Search;

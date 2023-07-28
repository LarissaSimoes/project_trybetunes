import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.getFavorites();
  }

  async getFavorites() {
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, isLoading: false });
  }

  handleFavorites = async (music, checked) => {
    console.log('oi');
    this.setState({ isLoading: true });
    if (checked) {
      await removeSong(music);
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        isLoading: false,
        favoriteSongs,
      });
    } else {
      await addSong(music);
    }
  };

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        {isLoading && <Loading />}
        <Header />
        <h2>Lista de Músicas Favoritas</h2>
        {favoriteSongs.length === 0 && <p>Nenhuma música favorita encontrada.</p>}
        {favoriteSongs.map((music, index) => (
          <li key={ index }>
            <MusicCard
              music={ music }
              handleFavorites={ this.handleFavorites }
              checked={ favoriteSongs
                .find((song) => song.trackId === music.trackId) }
            />
          </li>
        ))}

      </div>
    );
  }
}

export default Favorites;

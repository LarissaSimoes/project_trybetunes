import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    isLoading: true,
    favoriteSongs: [],
  };

  async componentDidMount() {
    await this.getFavorites();
  }

  async getFavorites() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, isLoading: false });
  }

  handleRemoveSong = async (song) => {
    this.setState({ isLoading: true });
    await removeSong(song);
    this.setState((prevState) => ({
      favoriteSongs: prevState.favoriteSongs.filter((s) => s.trackId !== song.trackId),
      isLoading: false,
    }));
  };

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        {isLoading && <Loading />}
        <Header />
        <h2>Lista de Músicas Favoritas</h2>
        {favoriteSongs.length === 0 && <p>Nenhuma música favorita encontrada.</p>}
        {favoriteSongs.map((song) => (
          <MusicCard
            key={ song.trackId }
            music={ song }
            onRemove={ this.handleRemoveSong }
          />
        ))}

      </div>
    );
  }
}

export default Favorites;

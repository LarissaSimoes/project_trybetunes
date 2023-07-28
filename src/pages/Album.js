import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    musicsList: [],
    favoriteSongs: [],
    isLoading: false,
  };

  componentDidMount() {
    this.musicsRequest();
  }

  musicsRequest = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsResponse = await getMusics(id);
    this.setState({ musicsList: musicsResponse });
  };

  handleFavorites = async (music, checked) => {
    console.log('oi');
    this.setState({ isLoading: true });
    if (checked) {
      await removeSong(music);
    } else {
      await addSong(music);
    }
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongs,
    });
  };

  render() {
    const { musicsList, isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          { musicsList.length > 0 && (
            <>
              <h2 data-testid="album-name">{musicsList[0].collectionName}</h2>
              <h3 data-testid="artist-name">{musicsList[0].artistName}</h3>
              <section>
                { isLoading ? <Loading />
                  : musicsList.map((music, index) => index > 0 && (
                    <li key={ index }>
                      <MusicCard
                        music={ music }
                        checked={ favoriteSongs
                          .find((song) => song.trackId === music.trackId) }
                        handleFavorites={ this.handleFavorites }
                      />
                    </li>
                  ))}
              </section>
            </>
          )}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;

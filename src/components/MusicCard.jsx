import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isLoading: false,
    checked: false,
  };

  componentDidMount() {
    this.getFavorites();
  }

  async getFavorites() {
    const { music } = this.props;
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    const isMusicFavorite = favoriteSongs.find((song) => song.trackId === music.trackId);
    if (isMusicFavorite) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
    this.setState({ isLoading: false });
  }

  handleFavorites = async () => {
    const { music } = this.props;
    const { checked } = this.state;

    this.setState({ isLoading: true });

    if (checked) {
      await removeSong(music);
      this.setState({ checked: false });
    } else {
      await addSong(music);
      this.setState({ checked: true });
    }

    this.setState({ isLoading: false });
  };

  render() {
    const { music } = this.props;
    const { trackName, trackNumber, previewUrl, trackId } = music;
    const { isLoading, checked } = this.state;

    return (
      <div key={ trackNumber }>
        <p>{ trackName }</p>
        <audio
          key={ trackNumber }
          src={ previewUrl }
          data-testid="audio-component"
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
          Favorita
          <input
            id={ trackId }
            type="checkbox"
            checked={ checked }
            onChange={ this.handleFavorites }
          />
        </label>
        { isLoading && <Loading /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.object,
}.isRequired;

export default MusicCard;

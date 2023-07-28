import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    checked: false,
  };

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites() {
    const { checked } = this.props;
    this.setState({ isLoading: true });
    if (checked) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
    this.setState({ isLoading: false });
  }

  render() {
    console.log(this.props);
    const { music, handleFavorites } = this.props;
    const { trackName, trackNumber, previewUrl, trackId } = music;
    const { isLoading, checked } = this.state;
    console.log(handleFavorites);
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
            onChange={ () => handleFavorites(music, checked) }

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

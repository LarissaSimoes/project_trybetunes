import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
  };

  render() {
    const { music } = this.props;
    const { trackName, trackNumber, previewUrl } = music;
    const { isLoading } = this.state;

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
        { isLoading && <Loading /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.object,
}.isRequired;

export default MusicCard;

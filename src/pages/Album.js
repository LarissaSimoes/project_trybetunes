import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    musicsList: [],
  };

  componentDidMount() {
    this.musicsRequest();
  }

  musicsRequest = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsResponse = await getMusics(id);
    this.setState({ musicsList: musicsResponse });
  };

  render() {
    const { musicsList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          { musicsList.length > 0 && (
            <>
              <h2 data-testid="album-name">{musicsList[0].collectionName}</h2>
              <h3 data-testid="artist-name">{musicsList[0].artistName}</h3>
              <section>
                {
                  musicsList.map((music, index) => index > 0 && (
                    <li key={ index }>
                      <MusicCard
                        music={ music }
                      />
                    </li>
                  ))
                }
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

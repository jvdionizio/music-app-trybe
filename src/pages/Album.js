import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import * as musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      load: true,
    };
  }

  componentDidMount() {
    this.albumMusics();
  }

  albumMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await musicsAPI.default(id);
    this.setState({
      musics,
      load: false,
    });
  }

  render() {
    const { load, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          load ? <Loading /> : (
            musics.map((music) => (
              <MusicCard
                musicObj={ music }
                trackId={ music.trackId }
                artworkUrl100={ music.artworkUrl100 }
                collectionName={ music.collectionName }
                artistName={ music.artistName }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                key={ music.trackName }
              />
            ))
          )
        }
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

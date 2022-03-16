import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import * as musicsAPI from '../services/musicsAPI';
import * as favoritesAPI from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      favoriteSongs: [],
      load: true,
    };
  }

  componentDidMount() {
    this.albumMusics();
    this.gettingFavorites();
  }

  albumMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await musicsAPI.default(id);
    this.setState({
      musics,
    });
  }

  // me baseie no código do Jonathan Reis para fazer a verificação dos favoritos

  gettingFavorites = async () => {
    const favoriteSongs = await favoritesAPI.getFavoriteSongs();
    this.setState({
      favoriteSongs,
      load: false,
    });
  }

  compareFavorite = (trackId) => {
    const { favoriteSongs } = this.state;
    return favoriteSongs.some((music) => music.trackId === trackId);
  }

  render() {
    const { load, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          load ? <Loading /> : (
            musics.map((music, index) => (
              <MusicCard
                musicObj={ music }
                trackId={ music.trackId }
                artworkUrl100={ music.artworkUrl100 }
                collectionName={ music.collectionName }
                artistName={ music.artistName }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                isFavorite={ this.compareFavorite(music.trackId) }
                key={ index }
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

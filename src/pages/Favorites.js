import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import * as favoritesAPI from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      load: true,
    };
  }

  componentDidMount() {
    this.gettingFavorites();
  }

  gettingFavorites = async () => {
    const favoriteSongs = await favoritesAPI.getFavoriteSongs();
    this.setState({
      favoriteSongs,
      load: false,
    });
  }

  removeFromFavoritelist = async () => {
    this.setState({
      load: true,
    });
    this.gettingFavorites();
  }

  render() {
    const { favoriteSongs, load } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Músicas Favoritas:</p>
        {
          load ? <Loading /> : (
            favoriteSongs.map((music, index) => (
              <MusicCard
                musicObj={ music }
                trackId={ music.trackId }
                artworkUrl100={ music.artworkUrl100 }
                collectionName={ music.collectionName }
                artistName={ music.artistName }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                isFavorite
                key={ index }
                recall={ this.removeFromFavoritelist }
              />
            ))
          )
        }
      </div>
    );
  }
}

export default Favorites;

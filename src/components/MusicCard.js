import React from 'react';
import PropTypes from 'prop-types';
import * as favoriteApi from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      load: false,
      favorite: false,
    };
  }

  componentDidMount() {
    const { isFavorite } = this.props;
    this.setState({
      favorite: isFavorite,
    });
  }

    addFavorite = () => {
      const { musicObj } = this.props;
      this.setState({
        load: true,
      });
      favoriteApi.addSong(musicObj).then(() => {
        this.setState({ load: false });
      });
    }

    removeFavorite = () => {
      const { recall } = this.props;
      const { musicObj } = this.props;
      this.setState({
        load: true,
      });
      favoriteApi.removeSong(musicObj).then(() => {
        this.setState({ load: false });
        if (recall) {
          recall();
        }
      });
    }

    verifyChecked = () => {
      const { favorite } = this.state;
      return favorite ? this.removeFavorite() : this.addFavorite();
    }

    handleClick = ({ target }) => {
      const { name, checked } = target;
      this.setState({
        [name]: checked,
      }, this.verifyChecked());
    }

    render() {
      const {
        trackName,
        previewUrl,
        artworkUrl100,
        collectionName,
        artistName,
        trackId,
      } = this.props;
      const { load, favorite } = this.state;
      if (trackName === undefined && previewUrl === undefined) {
        return (
          <div>
            <img src={ artworkUrl100 } alt={ collectionName } />
            <p data-testid="album-name">{ collectionName }</p>
            <p data-testid="artist-name">{ artistName }</p>
            <hr />
          </div>
        );
      }
      if (!load) {
        return (
          <div>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code> audio </code>
              {' '}
              .
            </audio>
            <label htmlFor={ `checkbox-music-${trackId}` }>
              {'Favorita '}
              <input
                id={ `checkbox-music-${trackId}` }
                name="favorite"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleClick }
                type="checkbox"
                checked={ favorite }
              />
            </label>
          </div>
        );
      }
      return (
        <Loading />
      );
    }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

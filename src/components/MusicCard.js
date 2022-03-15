import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      load: false,
      favorite: false,
    };
  }

    addFavorite = () => {
      const { musicObj } = this.props;
      this.setState({
        load: true,
      });
      addSong(musicObj).then(() => {
        this.setState({ load: false });
      });
    }

    handleClick = ({ target }) => {
      const { name, checked } = target;
      this.setState({
        [name]: checked,
      }, this.addFavorite);
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
            <label htmlFor="favorite">
              <input
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

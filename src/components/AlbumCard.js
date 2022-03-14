import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

class AlbumCard extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }

  cardClick = () => {
    this.setState({
      clicked: true,
    });
  }

  render() {
    const { album: {
      artworkUrl100,
      collectionName,
      artistName,
      collectionId } } = this.props;
    const { clicked } = this.state;
    if (clicked) {
      return <Redirect to={ `/album/${collectionId}` } />;
    }
    return (
      <div
        onClick={ this.cardClick }
        onKeyDown={ this.cardClick }
        data-testid={ `link-to-album-${collectionId}` }
        // coloquei as propiedades role e tabIndex para concertar o lint vide https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable
        role="link"
        tabIndex={ 0 }
      >
        <img src={ artworkUrl100 } alt={ collectionName } />
        <p>{ collectionName }</p>
        <p>{ artistName }</p>
        <hr />
      </div>
    );
  }
}

export default AlbumCard;

AlbumCard.propTypes = {
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  artistName: PropTypes.string,
  collectionId: PropTypes.number,
}.isRequired;

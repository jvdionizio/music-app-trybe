import PropTypes from 'prop-types';
import React from 'react';
import Loading from './Loading';
import AlbumCard from './AlbumCard';

class Albuns extends React.Component {
  render() {
    const { load, albuns, artist } = this.props;
    if (!load) {
      return (
        <div>
          {
            !albuns.length > 0
              ? <p>Nenhum álbum foi encontrado</p>
              : (
                <div>
                  <p>{`Resultado de álbuns de: ${artist}`}</p>
                  {albuns.map((album) => (
                    <AlbumCard
                      key={ album.collectionId }
                      album={ album }
                      { ...this.props }
                    />))}
                </div>
              )
          }
        </div>
      );
    }
    return (
      <Loading />
    );
  }
}

export default Albuns;

Albuns.propTypes = {
  load: PropTypes.bool,
  albuns: PropTypes.array,
}.isRequired;

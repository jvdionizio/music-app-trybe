import React from 'react';
import Albuns from '../components/Albuns';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      artist: '',
      artistName: '',
      btnDisable: true,
      load: false,
      albuns: [],
      clicked: false,
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    }, this.validate);
  }

  handleClick(event) {
    const { artist } = this.state;
    event.preventDefault();
    this.setState({
      load: true,
      clicked: true,
      artistName: artist,
    }, async () => {
      const albuns = await searchAlbumsAPI(artist);
      this.setState({
        load: false,
        albuns,
        artist: '',
      });
    });
  }

  validate = () => {
    const artistLength = 2;
    const {
      artist,
    } = this.state;
    const isArtistValid = artist.length >= artistLength;
    const validForm = isArtistValid;
    this.setState({
      btnDisable: !validForm,
    });
  }

  render() {
    const { artist, btnDisable, load, albuns, clicked, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="artist"
            type="text"
            data-testid="search-artist-input"
            value={ artist }
            onChange={ this.handleChange }
            placeholder="Nome do Artista"
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ btnDisable }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        {clicked && <Albuns
          load={ load }
          albuns={ albuns }
          artist={ artistName }
          { ...this.props }
        />}
      </div>
    );
  }
}

export default Search;

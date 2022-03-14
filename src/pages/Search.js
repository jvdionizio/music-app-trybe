import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    // this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      artist: '',
      btnDisable: true,
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    }, this.validate);
  }

  // handleClick(event) {
  //   const { name } = this.state;
  //   event.preventDefault();
  //   this.setState({
  //     load: true,
  //   }, async () => {
  //     await userApi.createUser({ name });
  //     this.setState({
  //       load: false,
  //       logged: true,
  //     });
  //   });
  // }

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
    const { artist, btnDisable } = this.state;
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
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ btnDisable }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

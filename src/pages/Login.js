import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import * as userApi from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      btnDisable: true,
      load: false,
      logged: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validate);
  }

  handleClick(event) {
    const { name, email, description, image } = this.state;
    event.preventDefault();
    this.setState({
      load: true,
    }, async () => {
      await userApi.createUser({ name, email, image, description });
      this.setState({
        load: false,
        logged: true,
      });
    });
  }

  validate = () => {
    const nameLength = 3;
    const {
      name,
    } = this.state;
    const isNameValid = name.length >= nameLength;
    const validForm = isNameValid;
    this.setState({
      btnDisable: !validForm,
    });
  }

  render() {
    const {
      name,
      email,
      image,
      description,
      btnDisable,
      load,
      logged,
    } = this.state;

    return (
      <div data-testid="page-login">
        {
          load
            ? <Loading />
            : (
              <form>
                <input
                  name="name"
                  type="text"
                  data-testid="login-name-input"
                  placeholder="Seu Nome"
                  value={ name }
                  onChange={ this.handleChange }
                />
                <br />
                <input
                  name="email"
                  type="text"
                  placeholder="Seu Email"
                  value={ email }
                  onChange={ this.handleChange }
                />
                <br />
                <input
                  name="image"
                  type="text"
                  placeholder="Foto de Perfil"
                  value={ image }
                  onChange={ this.handleChange }
                />
                <br />
                <input
                  name="description"
                  type="text"
                  placeholder="Descrição"
                  value={ description }
                  onChange={ this.handleChange }
                />
                <br />
                <button
                  type="submit"
                  disabled={ btnDisable }
                  onClick={ this.handleClick }
                  data-testid="login-submit-button"
                >
                  Entrar
                </button>
              </form>
            )
        }
        {logged && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;

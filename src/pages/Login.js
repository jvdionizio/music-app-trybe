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
      btnDisable: true,
      load: false,
      logged: false,
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
    const { name } = this.state;
    event.preventDefault();
    this.setState({
      load: true,
    }, async () => {
      await userApi.createUser({ name });
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
                  value={ name }
                  onChange={ this.handleChange }
                />
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

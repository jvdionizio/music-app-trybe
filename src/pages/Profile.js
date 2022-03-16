import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import * as userAPI from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      load: true,
      clicked: false,
    };
  }

  componentDidMount() {
    this.gettingUser();
  }

  gettingUser = async () => {
    const user = await userAPI.getUser();
    const { name, email, image, description } = user;
    this.setState({
      name,
      email,
      image,
      description,
      load: false,
    });
  }

  handleClick = () => {
    this.setState({
      clicked: true,
    });
  }

  render() {
    const {
      name,
      email,
      image,
      description,
      load,
      clicked,
    } = this.state;
    if (clicked) {
      return (
        <Redirect to="/profile/edit" />
      );
    }
    return (
      <div data-testid="page-profile">
        <Header />
        {
          load ? <Loading /> : (
            <div>
              <img data-testid="profile-image" src={ image } alt={ name } />
              <div>
                <p>Nome</p>
                <p>{name}</p>
              </div>
              <div>
                <p>Email</p>
                <p>{email}</p>
              </div>
              <div>
                <p>Descrição</p>
                <p>{description}</p>
              </div>
              <button
                type="submit"
                onClick={ this.handleClick }
              >
                Editar perfil
              </button>
            </div>
          )
        }

      </div>
    );
  }
}

export default Profile;

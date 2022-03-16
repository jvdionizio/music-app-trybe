import React from 'react';
import { Link } from 'react-router-dom';
import * as userAPI from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      load: true,
    };
  }

  componentDidMount() {
    this.gettingUser();
  }

 gettingUser = async () => {
   const user = await userAPI.getUser();
   this.setState({
     user,
     load: false,
   });
 };

 render() {
   const { user, load } = this.state;
   return (
     <div>
       <header data-testid="header-component">
         {
           load ? <Loading />
             : (
               <>
                 <p data-testid="header-user-name">{user.name}</p>
                 <Link
                   to="/search"
                   data-testid="link-to-search"
                 >
                   Pesquisa
                 </Link>
                 <Link
                   to="/favorites"
                   data-testid="link-to-favorites"
                 >
                   Favoritos
                 </Link>
                 <Link
                   to="/profile"
                   data-testid="link-to-profile"
                 >
                   Perfil
                 </Link>
               </>
             )
         }
       </header>
     </div>
   );
 }
}

export default Header;

import React from 'react';
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
               <p data-testid="header-user-name">{user.name}</p>
             )
         }
       </header>
     </div>
   );
 }
}

export default Header;

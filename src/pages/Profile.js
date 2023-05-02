import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  state = {
    user: {},
    isLoading: true,
  };

  componentDidMount() {
    this.setUser();
  }

  setUser = async () => {
    const user = await getUser();
    this.setState({ user, isLoading: false });
    console.log(user);
  };

  render() {
    const { user, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        { isLoading && <Loading /> }
        <Header />
        <h2>{user.name}</h2>
        <p>
          Email:
          {' '}
          {user.email}
        </p>
        <p>
          Descrição:
          {' '}
          {user.description}
        </p>
        <img src={ user.image } alt="Imagem do perfil" data-testid="profile-image" />
        <Link to="/profile/edit">Editar perfil</Link>

      </div>
    );
  }
}

export default Profile;

import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Profile extends React.Component {
  state = {
    user: {},
    isLoading: true,
  };

  componentDidMount() {
    getUser().then((user) => this.setUser(user));
  }

  setUser = (user) => {
    // this.setState({ isLoading: true });
    // const user = await getUser();
    this.setState({ user, isLoading: false });
    // console.log(user);
  };

  render() {
    const { user, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />

        { isLoading ? <Loading />
          : (
            <div>
              <section>
                <h2>{user.name}</h2>
                <p>
                  {user.email}
                </p>
                <p>
                  {user.description}
                </p>
                <img
                  src={ user.image }
                  alt="Imagem do perfil"
                  data-testid="profile-image"
                />

              </section>
              <div>
                <button><Link to="/profile/edit">Editar perfil</Link></button>
              </div>
            </div>
          )}

      </div>
    );
  }
}

export default Profile;

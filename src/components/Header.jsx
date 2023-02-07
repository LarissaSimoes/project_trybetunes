import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    isLoading: true,
    name: '',
  };

  async componentDidMount() {
    const user = await getUser();
    const { name } = user;
    this.setState({
      isLoading: false,
      name,
    });
  }

  render() {
    const { name, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">
          Pesquisar
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favoritas
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Favoritas
        </Link>
        Header
        { isLoading ? (<Loading />) : null }
        <p data-testid="header-user-name">
          Olá
          { ' ' }
          { name }
        </p>
      </header>
    );
  }
}

export default Header;

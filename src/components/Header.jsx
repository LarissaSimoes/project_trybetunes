import React from 'react';
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
        Header
        { isLoading ? (<Loading />) : null }
        <p data-testid="header-user-name">{ name }</p>
      </header>
    );
  }
}

export default Header;

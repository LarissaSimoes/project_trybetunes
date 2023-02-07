import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const MIN_LENGTH = 3;
class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    userName: '',
    isLoading: false,
  };

  enableButton = () => {
    const { userName } = this.state;
    const approvedName = userName.length < MIN_LENGTH;

    this.setState({
      isButtonDisabled: approvedName,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value,
    }, this.enableButton);
  };

  userLogin = async () => {
    const { userName } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    }, async () => {
      await createUser({ name: userName });
      history.push('/search');
    });
  };

  render() {
    const { isButtonDisabled, userName, isLoading } = this.state;

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="login-name-input"
              type="text"
              id="name"
              name="userName"
              value={ userName }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ this.userLogin }
          >
            Entrar
          </button>

          { isLoading ? (<Loading />) : null }
          ;

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;

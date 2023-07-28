import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    isLoading: true,

    isValid: false,
  };

  async componentDidMount() {
    try {
      const user = await getUser();
      this.setState({
        name: user.name,
        email: user.email,
        description: user.description,
        image: user.image,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.validateForm);
  };

  validateForm = () => {
    const { name, email, description, image } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = name !== ''
    && email !== '' && image && description !== '' && emailRegex.test(email);
    this.setState({ isValid });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, description, image } = this.state;
    const userInfo = {
      name,
      email,
      description,
      image,
    };
    try {
      // this.setState({ isSaving: true });
      await updateUser(userInfo);
      const { history } = this.props;
      history.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { name, email, description, image, isLoading, isValid } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Loading />

          : (
            <form onSubmit={ this.handleSubmit }>
              <label htmlFor="name">
                Nome:
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={ name }
                  data-testid="edit-input-name"
                  onChange={ this.handleInputChange }
                />

              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={ email }
                  data-testid="edit-input-email"
                  onChange={ this.handleInputChange }
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <textarea
                  name="description"
                  id="description"
                  value={ description }
                  data-testid="edit-input-description"
                  onChange={ this.handleInputChange }
                />
              </label>
              <label htmlFor="image">
                Foto:
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={ image }
                  data-testid="edit-input-image"
                  onChange={ this.handleInputChange }
                />
              </label>
              <button
                type="submit"
                disabled={ !isValid }
                data-testid="edit-button-save"
              >
                {/* {isSaving ? 'Salvando...' : 'Salvar'} */}
                Editar perfil
              </button>
            </form>
          )}

      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;

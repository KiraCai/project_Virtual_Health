import React from 'react';
import { Link } from 'react-router-dom';
import { signupClient } from "./api/apiSignUp";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {
        lastName: '',
        firstName: '',
        email: '',
        tel: '',
        password: ''
      },
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      input: {
        ...prevState.input,
        [name]: value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { lastName, firstName, email, tel, password } = this.state.input;

    if (this.validate()) {
      console.log(this.state);
      let input = {};
      input['password'] = '';
      input['confirm_password'] = '';
      this.setState({ input: input });
      alert('Le formulaire est soumis');
    }

    signupClient(lastName, firstName, email, tel, password)
        .then(response => {
          console.log('User signed up:', response);
        })
        .catch(error => {
          console.error('Signup error:', error);
        });
  };

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    if (!input['password']) {
      isValid = false;
      errors['password'] = 'Veuillez entrer votre mot de passe.';
    }
    if (!input['confirm_password']) {
      isValid = false;
      errors['confirm_password'] =
        'Veuillez entrer votre mot de passe de confirmation.';
    }
    if (typeof input['password'] !== 'undefined') {
      if (input['password'].length < 8) {
        isValid = false;
        errors['password'] = 'Veuillez ajouter au moins 8 caractères.';
      }
    }
    if (
      typeof input['password'] !== 'undefined' &&
      typeof input['confirm_password'] !== 'undefined'
    ) {
      if (input['password'] != input['confirm_password']) {
        isValid = false;
        errors['confirm_password'] = 'Les mots de passe ne correspondent pas.';
      }
    }
    this.setState({
      errors: errors,
    });
    return isValid;
  }
  render() {
    return (
      <main className="mainSign thin">
        <div className="signPage fat">
          <div className="titleStyle">Inscription</div>
          <div id="layoutCart">
            <form id="signForm" method="post" onSubmit={this.handleSubmit}>
              <div className="input-box">
                <label>Nom </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Entrez votre nom"
                  pattern="^[a-zA-Z]+$"
                  value={this.state.input.lastName}
                  onChange={this.handleChange}
                  aria-required="true"
                  required
                />
              </div>
              <div className="input-box">
                <label>Prénom </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Entrez votre prénom"
                  pattern="^[a-zA-Z]+$"
                  value={this.state.input.firstName}
                  onChange={this.handleChange}
                  aria-required="true"
                  required
                />
              </div>
              <div className="input-box">
                <label>e-mail </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Entrez votre e-mail"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  value={this.state.input.email}
                  onChange={this.handleChange}
                  aria-required="true"
                  required
                />
              </div>
              <div className="input-box">
                <label>Téléphone </label>
                <input
                  type="text"
                  name="tel"
                  placeholder="+33123456789"
                  pattern="^\+[0-9]{11}$"
                  value={this.state.input.tel}
                  onChange={this.handleChange}
                  aria-required="true"
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="password"> Mot de passe </label>

                <input
                  type="password"
                  name="password"
                  value={this.state.input.password}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Entrez votre mot de passe"
                  id="password"
                  pattern="(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}"
                  maxLength="20"
                  autoComplete="new-password"
                  required
                />
                <div className="text-danger">{this.state.errors.password}</div>

                <div className="articleHome articleClue">
                  <p className="thin rules">
                    Le mot de passe doit contenir au moins 8 chiffre ; <br />
                    Le mot de passe doit contenir au moins un caractère spécial:
                    !@#$%^&* ; <br />
                    Le mot de passe doit contenir au moins une lettre latine
                    minuscule ; <br />
                    Le mot de passe doit contenir au moins une lettre latine
                    majuscule ; <br />
                    Le mot de passe comprend au moins 6 des caractères ci-dessus
                    et au maximum 20.
                  </p>
                </div>
              </div>
              <div className="input-box">
                <label htmlFor="password"> Répéter le mot de passe:</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={this.state.input.confirm_password}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Répéter le mot de passe"
                  id="confirm_password"
                  maxLength="20"
                  required
                />
                <div className="text-danger">
                  {this.state.errors.confirm_password}
                </div>
              </div>
              <div className="input-box">
                <input
                  type="submit"
                  value="inscription"
                  className="btn buttonStyleDark"
                />
              </div>
              <div className="input-box">
                <label> Déjà inscrit?</label>
                <div className="btnLink">
                  <Link className="btn buttonStyleDark thin" to="/login">
                    entrez
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}
export default SignUp;

import React from 'react';
import { Link } from 'react-router-dom';
import { signupUser } from "./api/apiLogin";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {
        email: '',
        password: ''
      },
      errors: {},
    };
  }
  // Обработчик изменения input
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      input: {
        ...prevState.input,
        [name]: value,
      },
    }));
  };

  // Обработчик отправки формы
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state.input;
    // Можно добавить валидацию здесь (по желанию). Вызов функции из apiLogin.js, чтобы отправить данные
    signupUser(email, password)
        .then(response => {
          console.log('User signed up:', response);
        })
        .catch(error => {
          console.error('Signup error:', error);
        });
  };

  render() {
    return (
        <main className="mainSign thin">
          <div className="signPage fat">
            <div className="titleStyle">Connection</div>

            <div id="layoutCart">
              <form id="signForm" method="post" onSubmit={this.handleSubmit}>
                <div className="input-box">
                  <label>e-mail </label>
                  <input
                      type="email"
                      name="email"
                      placeholder="Entrez votre e-mail"
                      pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}"
                      value={this.state.input.email}
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
                      autoComplete="on"
                      required
                  />
                  <div className="text-danger">{this.state.errors.password}</div>
                </div>
                <div className="input-box">
                  <input
                      type="submit"
                      value="entrez"
                      className="btn buttonStyleDark"
                  />
                </div>
                <div className="input-box">
                  <label> Pas encore inscrit ?</label>
                  <div className="btnLink">
                    <Link className="btn buttonStyleDark thin" to="/signup">
                      inscription
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
export default Login;

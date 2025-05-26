import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {loginUser} from "./api/apiLogin";

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Обработчик изменения input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(input.email, input.password);
      console.log('User login:', response);
      navigate('/profile'); // Перенаправление на страницу профиля
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ password: 'Erreur de connexion. Vérifiez vos informations.' });
    }
  };

  return (
        <main className="mainSign thin">
          <div className="signPage fat">
            <div className="titleStyle">Connection</div>

            <div id="layoutCart">
              <form id="signForm" method="post" onSubmit={handleSubmit}>
                <div className="input-box">
                  <label>e-mail </label>
                  <input
                      type="email"
                      name="email"
                      placeholder="Entrez votre e-mail"
                      pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}"
                      value={input.email}
                      onChange={handleChange}
                      aria-required="true"
                      required
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="password"> Mot de passe </label>
                  <input
                      type="password"
                      name="password"
                      value={input.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Entrez votre mot de passe"
                      id="password"
                      pattern="(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}"
                      maxLength="20"
                      autoComplete="on"
                      required
                  />
                  <div className="text-danger">{errors.password}</div>
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
export default Login;

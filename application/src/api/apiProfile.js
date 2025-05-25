import axios from 'axios';

export const profile = axios.get('/api/v0.1/users/profile', {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
})
    .then(res => {
        // пользовательские данные
    })
    .catch(err => {
        // если токен недействителен — можно разлогинить
        logout;
    });

const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/api/v0.1/users/login");
};
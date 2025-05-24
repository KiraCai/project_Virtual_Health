import axios from 'axios';

export const signupUser = async (email, password) => {
    try {
        const response = await axios.post(
            "/api/v0.1/users/login",
            { email, password }, // отправка как JSON
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("Пользователь вошел в систему:", response.data);
        console.log("email" + email);
        console.log("password" + password)
    } catch (error) {
        console.error("Ошибка входа в систему:", error.response || error);
    }
};
import axios from 'axios';

export const loginUser = async (email, password) => {
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
        console.log("User logged in:", response.data);
        console.log("email" + email);
        console.log("password" + password)
    } catch (error) {
        console.error("Login error:", error.response || error);
    }
};
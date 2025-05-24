import axios from 'axios';

export const signupClient = async (lastName, firstName,email, tel, password) => {
    try {
        const response = await axios.post(
            "/api/v0.1/users/signup",
            { lastName, firstName, email, tel, password }, // send like JSON
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("User has registered:", response.data);
        console.log("last name: " + lastName);
        console.log("first name: " + firstName);
        console.log("email: " + email);
        console.log("phone: " + tel);
        console.log("password: " + password);
    } catch (error) {
        console.error("Registration error:", error.response || error);
    }
};
import axios from 'axios';
import {logout} from "./apiProfile";

/*export const fetchTest = async () => {
    try {
        const response = await axios.get('/api/v0.1/users/test', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data; // Ожидается, что данные - это массив болезней
    } catch (error) {
        sessionStorage.removeItem("token");
        logout();
        throw error;
    }
};*/
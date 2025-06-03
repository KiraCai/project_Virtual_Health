import axios from 'axios';
import {logout} from "./apiProfile";

export const fetchDiseases = async () => {
    try {
        const response = await axios.get('/api/v0.1/users/diseases', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        sessionStorage.removeItem("token");
        logout();
        throw error;
    }
};

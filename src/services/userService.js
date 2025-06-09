import api from "./api";

export const getUsername = async () => {
    const response = await api.get("/username");
    return response.data;
};
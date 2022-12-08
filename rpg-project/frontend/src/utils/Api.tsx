import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

type AxiosConfig = {
    headers: {
        Authorization: string;
    };
};

const cfg = () => {
    let config = {} as AxiosConfig;
    config.headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return config;
};

export { cfg };

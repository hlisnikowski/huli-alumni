import { config } from "@fortawesome/fontawesome-svg-core";
import axios, { AxiosRequestConfig } from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { User } from "../models/Hero";
import { api } from "../utils/Api";

type UserContextProviderProps = {
    children: ReactNode;
};

export type TodoModel = {
    title: string;
    description: string;
    finish: string;
    done: boolean;
};

type HeroCtx = {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    todos: TodoModel[];
    setTodos: Dispatch<SetStateAction<TodoModel[]>>;
    logged: boolean;
    setLogged: Dispatch<SetStateAction<boolean>>;
};

export const UserContext = createContext({} as HeroCtx);
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState({} as User);
    const [todos, setTodos] = useState({} as TodoModel[]);
    const [userLoaded, setUserLoaded] = useState(false);
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const token = `Bearer ${localStorage.getItem("token")}`;
        axios
            .get("http://localhost:8080/api/user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setUser(res.data);
                console.log(res.data);
                setTodos([
                    { title: "Homework", description: "Do projects", done: false, finish: "2022-11-21" },
                    { title: "Homework #2", description: "Learn about companies", done: false, finish: "2022-11-18" },
                    { title: "Homework #3", description: "Rest", done: true, finish: "2022-11-20" },
                ]);
                setUserLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, todos, setTodos, logged, setLogged }}>
            {children}
        </UserContext.Provider>
    );
};

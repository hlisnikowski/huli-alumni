import { config } from "@fortawesome/fontawesome-svg-core";
import axios, { AxiosRequestConfig } from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { User } from "../models/User";
import { api, cfg } from "../utils/Api";

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
    const [logged, setLogged] = useState(false);

    return (
        <UserContext.Provider value={{ user, setUser, todos, setTodos, logged, setLogged }}>
            {children}
        </UserContext.Provider>
    );
};

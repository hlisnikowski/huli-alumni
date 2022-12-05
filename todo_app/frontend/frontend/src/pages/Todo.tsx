import React, { useRef, useState, useEffect } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Row, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/todologo.png";
import "../style/login.css";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/Api";
import MainNavbar from "../components/MainNavbar";
import { useUserContext } from "../hooks/UserContext";

const Todo = () => {
    const { todos } = useUserContext();

    return (
        <>
            <MainNavbar />
            <Container>
                {todos.length > 0 &&
                    todos.map((todo, index) => (
                        <Card bg={"primary"} key={index} text={"white"} style={{ width: "18rem" }} className="mb-2">
                            <Card.Header>{todo.done}</Card.Header>
                            <Card.Body>
                                <Card.Title> {todo.title} </Card.Title>
                                <Card.Text>{todo.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
            </Container>
        </>
    );
};

export default Todo;

import React, { useRef, useState, useEffect } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../style/style.css";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

import { api } from "../utils/Api";
import { useUserContext } from "../hooks/UserContext";

const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (loginSuccess || localStorage.getItem("login") == "true") {
            localStorage.setItem("login", "true");
            navigate("/user");
        }
    }, [loginSuccess]);

    const togglePasswordShowing = () => {
        setPasswordShown(!passwordShown);
    };

    const login = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isLoginInvalid()) return;

        api.post("/login", {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
        })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
                setLoginSuccess(true);
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.message);
            });
    };

    const isLoginInvalid = (): boolean => {
        if (emailRef.current && passwordRef.current) {
            if (emailRef.current.value.length <= 0 || passwordRef.current.value.length <= 0) {
                setError("Please, enter all the credentials.");
                return true;
            }
            return false;
        }
        return true;
    };

    return (
        <>
            <div className="login-form">
                <div className="login-card">
                    <Form>
                        <Row className="align-items-center">
                            <Col>
                                <img className="login-img" src={logo} />

                                <h2 className="login-h w-100">THE FOREST</h2>
                            </Col>
                        </Row>
                        <div className="h-line"></div>
                        <Row className="align-items-center">
                            <Col>
                                <InputGroup className="mb-2 w-100">
                                    <InputGroup.Text>@</InputGroup.Text>
                                    <Form.Control ref={emailRef} placeholder="Email" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col>
                                <InputGroup className="mb-2 w-100">
                                    <InputGroup.Text onClick={togglePasswordShowing}>
                                        <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type={passwordShown ? "text" : "password"}
                                        placeholder="Password"
                                        ref={passwordRef}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>

                        <Col>
                            <Button
                                onClick={(e) => login(e)}
                                variant="success"
                                type="submit"
                                className="mb-2 w-100 c-btn"
                            >
                                Login
                            </Button>
                        </Col>
                        <div style={{ textAlign: "center" }}>
                            <a href="/register">No account ? Register.</a>
                        </div>
                        {error.length > 0 && (
                            <Row>
                                <Col>
                                    <Alert
                                        style={{ textAlign: "center", marginTop: "10px" }}
                                        key="danger"
                                        variant="danger"
                                    >
                                        {error}
                                    </Alert>
                                </Col>
                            </Row>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Login;

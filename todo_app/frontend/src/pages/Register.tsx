import React, { useRef, useState } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/todologo.png";
import { api } from "../utils/Api";
import "../style/login.css";
import MainNavbar from "../components/MainNavbar";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [error, setError] = useState("");
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const togglePasswordShowing = () => {
        setPasswordShown(!passwordShown);
    };

    const navigate = useNavigate();

    const register = (e: React.MouseEvent) => {
        e.preventDefault();

        if (isRegisterInvalid()) return;

        api.post("/register", {
            username: usernameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
        })
            .then((res) => {
                navigate("/");
            })
            .catch((err) => {
                setError(err.response.data);
            });
    };

    const isRegisterInvalid = (): boolean => {
        if (emailRef.current && passwordRef.current && usernameRef.current) {
            if (
                emailRef.current.value.length <= 0 ||
                usernameRef.current.value.length <= 0 ||
                passwordRef.current.value.length <= 0
            ) {
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
                            <Col xxl="auto">
                                <img className="login-img" src={logo} />
                                <h2 className="login-h">TODO APP</h2>
                            </Col>
                            <Col>
                                <InputGroup className="mb-2 w-100">
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faUser} />
                                    </InputGroup.Text>
                                    <Form.Control ref={usernameRef} placeholder="Username" />
                                </InputGroup>
                            </Col>
                        </Row>
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
                                        ref={passwordRef}
                                        type={passwordShown ? "text" : "password"}
                                        placeholder="Password"
                                    />
                                </InputGroup>
                            </Col>
                        </Row>

                        <Col>
                            <Button onClick={(e) => register(e)} type="submit" className="mb-2 w-100">
                                Register
                            </Button>
                        </Col>
                        <div style={{ textAlign: "center" }}>
                            <a href="/">Already have account ? Login.</a>
                        </div>
                        {error.length > 0 && (
                            <Row>
                                <Col>
                                    <Alert
                                        style={{ marginTop: "10px", marginBottom: "5px" }}
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

export default Register;

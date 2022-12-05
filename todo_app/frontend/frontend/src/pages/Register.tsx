import React, { useRef, useState } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/todologo.png";

import "../style/login.css";
import MainNavbar from "../components/MainNavbar";

const Register = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [error, setError] = useState("");
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const togglePasswordShowing = () => {
        setPasswordShown(!passwordShown);
    };

    const register = (e: React.MouseEvent) => {
        e.preventDefault();
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
                                    <Form.Control placeholder="Username" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col>
                                <InputGroup className="mb-2 w-100">
                                    <InputGroup.Text>@</InputGroup.Text>
                                    <Form.Control placeholder="Email" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col>
                                <InputGroup className="mb-2 w-100">
                                    <InputGroup.Text onClick={togglePasswordShowing}>
                                        <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} />
                                    </InputGroup.Text>
                                    <Form.Control type={passwordShown ? "text" : "password"} placeholder="Password" />
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
                                    <Alert key="danger" variant="danger">
                                        This is a alert—check it out!
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

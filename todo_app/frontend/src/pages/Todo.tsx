import React, { useRef, useState, useEffect } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Row, Card, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCalendar, faCheck, faClose, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import "../style/login.css";
import "../style/todo.css";
import { api, cfg } from "../utils/Api";
import MainNavbar from "../components/MainNavbar";
import { useUserContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";

const Todo = () => {
    // Main data
    const { todos, setTodos, setUser, user } = useUserContext();
    const [data, setData] = useState(false);

    // EDIT MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = (title: string) => {
        setShow(true);
        sMsg("");
        sLastTitle(title);
    };
    const [lastTitle, sLastTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [eMsg, sMsg] = useState("");

    // Navigation
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/user", cfg())
            .then((res) => {
                setUser(res.data[0]);
                setTodos(res.data[1]);
            })
            .catch((err) => {
                navigate("/");
            });
    }, [data]);

    const editTodo = (e: React.MouseEvent, type: string, title: string) => {
        e.preventDefault();
        switch (type) {
            case "delete":
                deleteTodo(title);
                break;
            case "check":
                checkTodo(title);
        }
    };

    const changeDescription = (e: React.MouseEvent) => {
        e.preventDefault();

        if (desc.length < 1) return;
        api.patch(
            "/todo/change-title",
            {
                title: lastTitle,
                description: desc,
            },
            cfg()
        )
            .then((res) => {
                handleClose();
                setData(true);
            })
            .catch((err) => {
                sMsg(err.response.data);
            });
        setData(false);
    };

    const deleteTodo = (title: string) => {
        title = title.replace(/\s/g, "_");
        api.delete("/todo/" + title, cfg())
            .then((res) => {
                setData(true);
            })
            .catch((err) => {
                console.log("err");
            });
        setData(false);
    };

    const checkTodo = (title: string) => {
        title = title.replace(/\s/g, "_");
        console.log(title);
        const config = cfg();
        api.patch("/todo/" + title, {}, config)
            .then((res) => {
                setData(true);
            })
            .catch((err) => {
                console.log("err");
            });

        setData(false);
    };

    return (
        <>
            <MainNavbar username={user.username} setData={setData} />
            <Container className="mt-2">
                <Row className="cards">
                    {todos.length > 0 &&
                        todos.map((todo, index) => (
                            <Col key={index}>
                                <Card
                                    bg={todo.done == true ? "success" : "danger"}
                                    key={index}
                                    text={"white"}
                                    className="mt-2  c-card"
                                >
                                    <Card.Header style={{ display: "" }}>
                                        <p style={{ marginBottom: "-2px" }}>
                                            <FontAwesomeIcon icon={faCalendar} /> {todo.finish}{" "}
                                        </p>

                                        <p style={{ textAlign: "right", marginBottom: "-2px", marginTop: "-25px" }}>
                                            <a
                                                onClick={(e) => editTodo(e, "check", todo.title)}
                                                style={{ textDecoration: "none", color: "white" }}
                                                href=""
                                            >
                                                <FontAwesomeIcon icon={todo.done ? faCheck : faClose} />
                                            </a>
                                            {" | "}
                                            <a
                                                onClick={(e) => editTodo(e, "delete", todo.title)}
                                                style={{ textDecoration: "none", color: "white" }}
                                                href=""
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </a>
                                        </p>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title className="d-flex">
                                            {todo.title}
                                            <FontAwesomeIcon
                                                style={{
                                                    cursor: "pointer",
                                                    position: "absolute",
                                                    top: "56px",
                                                    right: "10px",
                                                }}
                                                onClick={() => handleShow(todo.title)}
                                                icon={faEdit}
                                            />{" "}
                                        </Card.Title>
                                        <Card.Text>{todo.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Description</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control onChange={(e) => setDesc(e.currentTarget.value)} type="text" autoFocus />
                            </Form.Group>
                        </Form>
                        <div className="modal-error">
                            {eMsg.length > 1 && (
                                <p style={{ color: "red", textAlign: "center", padding: "0px", marginTop: "-10px" }}>
                                    {eMsg}
                                </p>
                            )}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(e) => changeDescription(e)}>
                            Change
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};

export default Todo;

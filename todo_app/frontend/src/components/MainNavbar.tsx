import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSignOut } from "@fortawesome/free-solid-svg-icons";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Navbar, Button, Col, Container, Form, InputGroup, Row, Nav, Modal } from "react-bootstrap";
import { api, cfg } from "../utils/Api";
import { useNavigate } from "react-router-dom";

type NavBarProp = {
    username: string;
    setData: Dispatch<SetStateAction<boolean>>;
};

const MainNavbar = ({ username, setData }: NavBarProp) => {
    const [show, setShow] = useState(false);

    const [tTitle, sTitle] = useState("");
    const [tDesc, sDesc] = useState("");
    const [tDate, sDate] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        console.log(type);

        switch (type) {
            case "title":
                sTitle(e.currentTarget.value);
                break;
            case "desc":
                sDesc(e.currentTarget.value);
                break;
            case "date":
                sDate(e.currentTarget.value);
                break;
        }
    };

    const addNewTodo = (e: React.MouseEvent) => {
        e.preventDefault();
        handleClose();
        if (tTitle.length < 1 || tDate.length < 1 || tDesc.length < 1) return;
        api.post(
            "/todo",
            {
                title: tTitle,
                description: tDesc,
                finish: tDate,
                done: false,
            },
            cfg()
        )
            .then((res) => {
                console.log(res.data);
                setData(true);
            })
            .catch((err) => {
                console.log(err);
            });
        sTitle("");
        sDate("");
        sDesc("");
        setData(false);
    };

    const navigate = useNavigate();
    const logout = () => {
        localStorage.setItem("token", "");
        navigate("/");
    };

    return (
        <>
            <Navbar
                style={{
                    backgroundColor: "#0D6EFD",
                    height: "48px",
                    borderBottom: "2px solid black",
                    boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                }}
            >
                <Container>
                    <div className="add-todo">
                        <Button
                            onClick={handleShow}
                            style={{ backgroundColor: "#3A9DEC", width: "180px", border: "2px solid #0457d1" }}
                        >
                            <FontAwesomeIcon icon={faAdd} /> Add TODO
                        </Button>
                    </div>

                    <p className="top-name" style={{ color: "white", textAlign: "right" }}>
                        {username} : <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faSignOut} onClick={logout} />
                    </p>
                </Container>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New TODO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={(e) => handleForm(e as any, "title")} type="text" autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={(e) => handleForm(e as any, "desc")} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Date to finish</Form.Label>
                            <Form.Control onChange={(e) => handleForm(e as any, "date")} type="date" autoFocus />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => addNewTodo(e)}>
                        Add TODO
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MainNavbar;

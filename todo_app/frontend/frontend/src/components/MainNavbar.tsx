import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Alert, Button, Col, Container, Form, InputGroup, Row, Nav } from "react-bootstrap";

const MainNavbar = () => {
    return (
        <>
            <Navbar
                style={{
                    backgroundColor: "#0D6EFD",
                    height: "45px",
                }}
            >
                <Container>
                    <div className="add-todo">
                        <Button style={{ backgroundColor: "#3A9DEC" }}>
                            <FontAwesomeIcon icon={faAdd} /> Add Todo
                        </Button>
                    </div>
                    <p style={{ textAlign: "right" }}>Mirek</p>
                </Container>
            </Navbar>
        </>
    );
};

export default MainNavbar;

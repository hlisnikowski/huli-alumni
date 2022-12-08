import { Dropdown, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";

const MainNavbar = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">My App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary">Account</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#profile">Profile</Dropdown.Item>
                            <Dropdown.Item href="#settings">Settings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#logout">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>
        </>
    );
};

export default MainNavbar;

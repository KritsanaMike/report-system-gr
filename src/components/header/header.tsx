import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
export default function Header() {
    return (
        <>
            <Container>
                <Navbar className="bg-body-tertiary">
                    <Navbar.Brand href="#home">Brand link</Navbar.Brand>
                </Navbar>
            </Container>
        </>
    );
};
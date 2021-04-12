import React from 'react'
import { Navbar, NavDropdown, Nav, Button, Form, FormControl } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';

import NavBarOption from './NavBarOption'
import './NavBar.css'

function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Urban Legend</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/signup'>
                <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/urban'>
                <Nav.Link>Urban</Nav.Link>
            </LinkContainer>
                <Nav.Link onClick={null}>Logout</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar


import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Icon } from 'semantic-ui-react';

import NavBarOption from './NavBarOption';
import './NavBar.css';
import { delAuth } from '../actions/userActions';
import api from '../service/api';

function NavBar({ userId, username, delAuth, avatar }) {
	const handleLogout = () => {
		localStorage.removeItem('token');
		delAuth();
		window.history.pushState({}, '', '/');
		window.location.reload();
	};
	return (
		<Navbar bg='light' expand='lg' sticky='top'>
			<Navbar.Brand href='#home'>Urban Legend</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<LinkContainer to='/'>
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>

					<LinkContainer to='/urban'>
						<Nav.Link>Urban</Nav.Link>
					</LinkContainer>
					<LinkContainer to='/discuss'>
						<Nav.Link>Forum</Nav.Link>
					</LinkContainer>
					{/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
				</Nav>
				{username ? (
					<Nav className='ms-auto'>
						<LinkContainer to='/newpost'>
							<Nav.Link>
								<Icon.Group size='large'>
									<Icon name='edit outline' color='grey' />
								</Icon.Group>
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to={`/profile/${userId}`}>
							<Nav.Link>
								<img src={api.AVATAR + avatar} width='20' />{' '}
								{username}
							</Nav.Link>
						</LinkContainer>
						<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
					</Nav>
				) : (
					<Nav className='ms-auto'>
						<LinkContainer to='/login'>
							<Nav.Link>Login</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/signup'>
							<Nav.Link>Signup</Nav.Link>
						</LinkContainer>
					</Nav>
				)}
				{/* <Form inline>
					<FormControl
						type='text'
						placeholder='Search'
						className='mr-sm-2'
					/>
					<Button variant='outline-success'>Search</Button>
				</Form> */}
			</Navbar.Collapse>
		</Navbar>
	);
}

const mapStateToProps = (state) => {
	return {
		username: state.auth.username,
		userId: state.auth.id,
		avatar: state.auth.avatar,
	};
};

export default connect(mapStateToProps, { delAuth })(NavBar);

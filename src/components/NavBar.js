import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Icon } from 'semantic-ui-react';

import './NavBar.css';
import { delAuth } from '../actions/userActions';
import { setCityKeyword } from '../actions/postActions';

function NavBar({ userId, username, delAuth, setCityKeyword, avatar }) {
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
					<LinkContainer
						to='/discuss'
						onClick={() => setCityKeyword('Global')}
					>
						<Nav.Link>Convos</Nav.Link>
					</LinkContainer>
				</Nav>
				{username ? (
					<Nav className='ms-auto'>
						<LinkContainer to={`/profile/${userId}`}>
							<Nav.Link>
								<img
									className='user-avatar'
									alt='user-avatar'
									src={avatar}
									width='20'
									height='20'
								/>{' '}
								{username}
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/newpost'>
							<Nav.Link>
								<Icon.Group size='large'>
									<Icon name='edit outline' color='grey' />
								</Icon.Group>
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

export default connect(mapStateToProps, { delAuth, setCityKeyword })(NavBar);

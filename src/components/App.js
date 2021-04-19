import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import Login from './Login';
import Signup from './Signup';
import UrbanContainer from './UrbanContainer';
import ForumContainer from './ForumContainer';
import UserProfile from './UserProfile';
import Footer from './Footer';

import { setAuth } from '../actions/userActions';
import api from '../service/api';

import './App.css';
import PostsContainer from './PostsContainer';

const App = ({ user, setAuth }) => {
	useEffect(() => {
		//* get user info into state from the backend
		//* if token presents
		const token = localStorage.token;
		if (token) {
			api.user.getCurrentUser().then((r) => setAuth(r));
		}
	}, [setAuth]);

	return (
		<div className='app'>
			{/* SideBar/NAVBAR */}

			{/* main Feed/All Post from the newest */}

			{/* Map widget */}
			<Router>
				<NavBar />
				<Route exact path='/' render={() => <UrbanContainer />} />
				<Route
					path='/login'
					render={(routerProps) => (
						<Login routerProps={routerProps} />
					)}
				/>
				<Route
					path='/signup'
					render={(routerProps) => (
						<Signup routerProps={routerProps} />
					)}
				/>
				<Route path='/discuss' render={() => <ForumContainer />} />
				<Route
					path='/profile/:id'
					render={(routerProps) => (
						<UserProfile routerProps={routerProps} />
					)}
				/>
				<Route
					path='/posts/:id'
					render={(routerProps) => (
						<PostsContainer routerProps={routerProps} />
					)}
				/>
				{/* <Footer /> */}
			</Router>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { user: state.auth };
};

export default connect(mapStateToProps, { setAuth })(App);

import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import NavBar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import UrbanContainer from "./UrbanContainer";
import ForumContainer from "./ForumContainer";

import { setAuth } from "../actions/userActions";
import api from "../service/api";

import "./App.css";

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
				<Route path='/login' render={() => <Login />} />
				<Route path='/signup' render={() => <Signup />} />
				<Route path='/urban' render={() => <UrbanContainer />} />
				<Route path='/discuss' render={() => <ForumContainer />} />
			</Router>
		</div>
	);
};

const mapStateToProps = (state) => {
	console.log(state);
	return { user: state.auth };
};

export default connect(mapStateToProps, { setAuth })(App);

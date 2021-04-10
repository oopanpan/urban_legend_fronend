import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import NavBar from './NavBar'
import Signup from './Signup'

import { setAuth } from '../reducers/authReducer'

const App = () => {

    useEffect(() => {
        //* get user info into state from the backend
        //* if token presents
        const token = localStorage.token
        if (token) {

        }
    }, [])

    return (
        <div>
            <NavBar />
            <Router>
                <Route path='/signup' render={() => <Signup /> } />
            </Router>
        </div>
    )
}


export default connect(null, { setAuth })(App);
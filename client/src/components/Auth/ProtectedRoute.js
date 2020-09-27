import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';

const ProtectedRoute = (props) => {
    // const {isAuthenticated } = useContext(AuthContext);
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    const Component = props.component;
    
    return isAuthenticated ? (
        <Component />
    ) : (
        <Redirect to ={{pathname: '/login'}} />
    );

}

export default ProtectedRoute;
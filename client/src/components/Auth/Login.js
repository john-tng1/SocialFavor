import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AuthService from '../../context/AuthService';

import { Container, Row, Col, Button, Modal } from 'react-bootstrap';


const Login = (props) => {
  const [user, setUser] = useState({ username: '', password: '' });
  const authContext = useContext(AuthContext);
  const {isLogged, setLogged } = useContext(AuthContext);
  const [message, setMessage] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await AuthService.login(user).then(data => {
      console.log('After successful login: ', data);
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
<<<<<<< HEAD

        //Show Login successfully message
        setMessage();
        setShowModal(true);
      } else{
        setMessage(<div className="text-danger text-center">Invalid username or password</div>);
=======
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        props.history.push('/');   // Redirect back to Homepage
>>>>>>> ec696fec4ca19f91f9a9a89cf720f472dc687f9d
      }
    });
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const redirect = () => {
    setLogged(true);
    setShowModal(false);
    props.history.push('/');
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col lg="6" md="6" sm="8">
          <form onSubmit={handleSubmit}>
            <p className="h4 text-center mb-4">Log In</p>

            <div className="form-group">
              <label htmlFor="email" className="grey-text">
                Your username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="grey-text">
                Your password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="text-center mt-4">
              <Button
                color="indigo"
                type="submit"
                className="white-text pl-3 pr-3"
              >
                Log In
              </Button>
            </div>
            {message}
          </form>
          
          <p className="font-small grey-text d-flex justify-content-end">
            Not a member?
            <a href="/register" className="blue-text ml-1">
              Sign up
            </a>
          </p>
          <Modal size="sm" show={showModal} onHide={handleClose}>
            <Modal.Body>
              <p>Login Sucessfully!</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={redirect}>Go Back to Homepage</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

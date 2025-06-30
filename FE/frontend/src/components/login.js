import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';

function LoginSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    const route = isLogin ? 'login' : 'signup';
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${route}`, {
        email,
        password,
      });
      alert(res.data.message);
      console.log(res.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong';
      console.error('Full error response:', err.response?.data); // Log full response
      if (isLogin && errorMessage === 'User not found') {
        alert('User doesn\'t exist. Pls sign up');
      } else {
        alert(errorMessage);
      }
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5" style={{ maxWidth: '900px' }}>
      <MDBRow className="justify-content-center align-items-center">
        <MDBCol md="6" className="d-none d-md-block text-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone"
            style={{ maxHeight: '80vh', objectFit: 'contain' }}
          />
        </MDBCol>

        <MDBCol md="6">
          <form onSubmit={handleSubmit}>
            <h3 className="mb-4 text-center">{isLogin ? 'Sign In' : 'Sign Up'}</h3>

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox name="remember" label="Remember me" />
              <a href="#">Forgot password?</a>
            </div>

            <MDBBtn type="submit" className="mb-4 w-100" size="lg">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </MDBBtn>

            <div className="text-center">
              <p>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <span
                  style={{ color: 'blue', cursor: 'pointer' }}
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </span>
              </p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginSignup;
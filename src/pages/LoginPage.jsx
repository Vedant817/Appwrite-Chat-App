import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from 'react-router'
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { user, handleUserLogin } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value })
    console.log(credentials);
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form onSubmit={(e)=> handleUserLogin(e, credentials)}>
          <div className="field--wrapper">
            <label>Email: </label>
            <input type="email" required name="email" placeholder="Enter your Email" value={credentials.email} onChange={(e)=> {handleInputChange(e)}} />
          </div>
          <div className="field--wrapper">
            <label>Password: </label>
            <input type="password" required name="password" placeholder="Enter your Password" value={credentials.password} onChange={(e)=> {handleInputChange(e)}} />
          </div>
          <div className="field--wrapper">
            <input className="btn btn--lg btn--main" type="submit" value="Login" />
          </div>
        </form>
        <p>Do not have an account? Register <Link to='/register'>here</Link></p>
      </div>
    </div>
  )
}

export default LoginPage
import React, { useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/useContext'

const Login = () => {

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {setCurrentUser} = useContext(UserContext)


  const handleInputChange = (e) =>{
    setUserData(prevState=>{
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const LoginUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = await response.data;
      setCurrentUser(user)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message)
    }
  }

  return (
    <section className='login'>
      <div className="container">
        <h2>Sign In</h2>
        <form className='form login_form' onSubmit={LoginUser}>
          {error &&<p className='form_error-message'>{error}</p>}
          <input type="text" placeholder='Email' name='email' value={userData.email} onChange={handleInputChange} />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={handleInputChange} />
          <button type='submit' className='btn primary'>Login</button>
        </form>
        <small>Dont't have an account ? <Link to='/register'>Sign up</Link></small>
      </div>
    </section>
  )
}

export default Login
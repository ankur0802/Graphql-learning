import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setformData] = useState({ })

  const handleChange = (e)=>{
    setformData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(formData);
    navigate('/')
  }

  return (
    <div className='container'>
        <h5>Login!!</h5>
        <form onSubmit={handleSubmit} >
            <input
             type="email"
             placeholder='enter email..'
             name='email'
             onChange={handleChange}
             required
            />

            <input
             type="password"
             placeholder='enter password..'
             name='password'
             onChange={handleChange}
             required
            />
            <Link to='/signup'><p>Don't have an account?</p></Link>
            <button className='btn #673ab7 deep-purple' type='submit'> Login </button>
        </form>

    </div>
  )
}


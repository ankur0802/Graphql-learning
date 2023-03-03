import React, {useState} from 'react'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(email, password);
  }

  return (
    <div className='container'>
        <h5>Login!!</h5>
        <form onSubmit={(e)=>handleSubmit(e)} >
            <input
             type="email"
             placeholder='enter email..'
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             required
            />

            <input
             type="password"
             placeholder='enter password..'
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             required
            />
            <button className='btn #673ab7 deep-purple' type='submit'> Login </button>
        </form>

    </div>
  )
}



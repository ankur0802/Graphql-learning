import React from 'react'

export default function Profile() {
  return (
    <div className='container'>
        <div className='center-align'>
            <img className='circle' style={{border:'2px solid', marginTop:'10px'}} src="https://robohash.org/name.png?size=200x200" alt="pic" />
            <h5>User Name</h5>
            <h6>Email - abc@abc.com</h6>
        </div>
        <h3>Your quots</h3>
        <blockquote>
            <h6>if code works don't touch it </h6>
         
        </blockquote>
        <blockquote>
            <h6>if code works don't touch it </h6>
       
        </blockquote>
    </div>
  )
}

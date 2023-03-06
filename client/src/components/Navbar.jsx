import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav-wrapper #673ab7 deep-purple">
      <div >
        <Link to="/" className="brand-logo ">
          Quotes App
        </Link>
        <ul id="nav-mobile" className="right">
    
          <li> <Link to="login">Login</Link> </li>
          <li><Link to="signup">Signup</Link></li>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="create">Create</Link></li>
        
        </ul>
      </div>
    </nav>
  );
}

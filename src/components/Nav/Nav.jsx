import './Nav.css'
import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'  //component that will lead you to where you want it to go through route given


export class Nav extends Component {
  render() {
    return (
     <nav className='Navbar'>
        <div className="h1-logo">
            <h1>
                <Link to='/'>Home</Link>  
            </h1>
        </div>
        <div className="right-side-nav">
            <ul>{
                this.props.user ? 
                <li>
                    <NavLink to="/profile">
                        {this.props.user.username}
                    </NavLink>
                </li> :
                <li>
                    <NavLink to='/sign-up'>
                        Create Account
                    </NavLink>
                </li>
                }
                {
                this.props.user ?
                <li>
                    <NavLink to='/login' onClick={this.props.handleUserLogout}>
                        Logout
                    </NavLink>
                </li> 
                :
                <li>
                    <NavLink to='/login'>
                        Login
                    </NavLink>
                </li>
                }

            </ul>
        </div>
    </nav>
    )
  }
}

export default Nav
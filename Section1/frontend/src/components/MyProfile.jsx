import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Home from './Home';
import useUserContext from '../UserContext';

const MyProfile = () => {
  const {LoggedIn, logout} = useUserContext();
 if(!LoggedIn)
 return<Home/>
 

  return (
    <div className='create-post-body vh-100'>
        <div className='body2'>
      <header className="header-bar2 mb-3">
        <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h3 className="my-0 mr-md-auto fw-bold ">
            <a href="/" className="text-white text-decoration-none">
              DevLink
            </a>
          </h3>
          <div className="flex-row my-3 my-md-0 ms-auto">
            <a
              href="#"
              className="text-white mr-2 header-search-icon"
              title="Search"
              data-toggle="tooltip"
              data-placement="bottom"
            >
              <i className="fas fa-search " />
            </a>
            <span
              className="text-white mr-2 header-chat-icon"
              title="Chat"
              data-toggle="tooltip"
              data-placement="bottom"
            >
              <NavLink to="/myprofilechat"><i className="fas fa-comment mx-4 text-white" /></NavLink>
            </span>
            <Link to='/myprofile' className="mr-2">
              <img
                title="My Profile"
                data-toggle="tooltip"
                data-placement="bottom"
                style={{ width: 32, height: 32, borderRadius: 16 }}
                src="https://gravatar.com/avatar/f64fc44c03a8a7eb1d52502950879659?s=128"
              />
            </Link>
            <Link className="btn btn-sm btn-success mr-2 mx-4" to="/createpost">
              Create Post
            </Link>
            <Link to='/home'>
              <button className="btn btn-sm btn-secondary" onClick={logout}>SIGN OUT</button>
            </Link>
          </div>
        </div>
      </header>
      </div>

      <h1></h1>
    </div>
  )
}

export default MyProfile
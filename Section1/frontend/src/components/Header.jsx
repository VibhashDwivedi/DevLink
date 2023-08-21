import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Home from './Home';
import useUserContext from '../UserContext';

const Header = () => {

  const [currentUser, setcurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  );
  // //const {LoggedIn} = useUserContext();
  //  if(currentUser===null)
  //  return<Home/>
  const {LoggedIn, logout} = useUserContext();
 if(!LoggedIn)
 return<Home/>

  return (

    <div className='body2'>
      <header className="header-bar2 mb-3">
        <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h3 className="my-0 mr-md-auto fw-bold ">
            <a href="/" className="text-white text-decoration-none">
              DevLink
            </a>
          </h3>
          <div className="flex-row my-3 my-md-0 ms-auto">
            <Link to="/feed"
              className="text-white mr-2 header-search-icon mx-4"
              title="Search"
              data-toggle="tooltip"
              data-placement="bottom"
            >
             <i class="fa-solid fa-house-user"></i>
            </Link>
            <Link to="/search"
              className="text-white mr-2 header-search-icon"
              title="home"
              data-toggle="tooltip"
              data-placement="bottom"
            >
              <i className="fas fa-search " />
            </Link>
            <span
              className="text-white mr-2 header-chat-icon"
              title="Chat"
              data-toggle="tooltip"
              data-placement="bottom"
            >
              <NavLink to="/chatvisible"><i className="fas fa-comment mx-4 text-white" /></NavLink>
            </span>
            <Link to='/myprofile' className="mr-2">
            <img width={40} height={40} className='mx-2 rounded-circle' src={"http://localhost:8000/"+currentUser.avatar} alt="" />
            </Link>
            <Link className="btn btn-sm btn-success mr-2 mx-4" to="/createpost">
              Create Post
            </Link>
            <Link to="/home">
              <button className="btn btn-sm btn-secondary" onClick={logout}>SIGN OUT</button>
            </Link>
          </div>
        </div>
      </header>
      </div>
  )
}

export default Header
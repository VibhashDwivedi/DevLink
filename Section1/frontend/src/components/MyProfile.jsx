import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Home from './Home';
import useUserContext from '../UserContext';

const MyProfile = () => {
  const {LoggedIn, logout} = useUserContext();
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  );

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
              title="Search"
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
              <NavLink to="/myprofilechat"><i className="fas fa-comment mx-4 text-white" /></NavLink>
            </span>
            <Link to='/myprofile' className="mr-2">
            <img width={40} height={40} className='mx-2 rounded-circle' src={"http://localhost:8000/"+currentUser.avatar} alt="" />
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
<div className=' d-flex justify-content-center '>
<div className="card mt-5 rounded-0 shadow-lg w-25 ">
        <div className="card-body p-5">
          <div className='text-center'>
          <img width={90} height={90} className='mx-2 rounded-circle' src={"http://localhost:8000/"+currentUser.avatar} alt="" />
          </div>
          <h5 className="card-title mx-4   mt-4 text-dark me-auto">Name : {currentUser.username}</h5>
          <h5 className="card-title mx-4 text-dark me-auto">Email : {currentUser.email}</h5>
          <h5 className="card-title mx-4   text-dark me-auto">Profile : {currentUser.profile}</h5>
        </div>
        <div className="card-footer  py-4 d-flex justify-content-between ">
          <Link><button className="btn btn-primary mx-5">Edit</button></Link>
          <Link><button className="btn btn-danger mx-5">Delete</button></Link>
        </div>
      </div>
</div>
     
    </div>
  )
}

export default MyProfile
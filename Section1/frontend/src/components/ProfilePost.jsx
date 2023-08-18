import React, { useState } from 'react'
import Header from './Header'
import '../css/createpost.css'
import { Link, NavLink } from 'react-router-dom'
import Home from './Home'
import useUserContext from '../UserContext'
const ProfilePost = () => {

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
              <NavLink to="/profilepostchat"><i className="fas fa-comment mx-4 text-white" /></NavLink>
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
        <div className="container py-md-5 container--narrow">
  <h2>
    <img
      className="avatar-small"
      src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
    />{" "}
    John
    <form className="ml-2 d-inline" action="#" method="post">
      <button className="btn btn-sm btn-primary">
        Follow
        <i className="fa fa-user-plus" />
      </button>
    </form>
  </h2>
  <h5>Web Developer</h5>
  <div className="profile-nav nav nav-tabs pt-2 mb-4">
    <a href="#" className="profile-nav-link nav-item nav-link active">
      Post: 3
    </a>
    <a href="#" className="profile-nav-link nav-item nav-link">
      Followers: 3
    </a>
    <a href="#" className="profile-nav-link nav-item nav-link">
      Followings: 3
    </a>
  </div>
  <div className="list-group">
    <a href="#" className="list-group-item list-group-item-action">
      <img
        className="avatar-tiny"
        src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"
      />
      <strong>Example Post #1</strong> on 1/3/2019
    </a>
    <a href="#" className="list-group-item list-group-item-action">
      <img
        className="avatar-tiny"
        src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"
      />
      <strong>Example Post #2</strong> on 1/3/2019
    </a>
    <a href="#" className="list-group-item list-group-item-action">
      <img
        className="avatar-tiny"
        src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"
      />
      <strong>Example Post #3</strong> on 1/3/2019
    </a>
  </div>
</div>


            </div>
  )
}

export default ProfilePost
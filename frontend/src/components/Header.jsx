import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Home from './Home';
import useUserContext from '../UserContext';
import pic from '../images/usericon.jpg';

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

 const displayprofile = () => {
  if(currentUser.avatar===""){
    return <i  className="fa-solid fa-user fa-2xl " style={{color:'#e8e8e8'}}></i>
  }
  else{
return <img width={40} height={40} className='mx-2 rounded-circle' src={"https://devlink-project.onrender.com/"+currentUser.avatar} alt="" />
   }
 }

  return (

    <div className='body2'>
      <header className="header-bar2 mb-3">
        <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h3 className="my-0 mr-md-auto fw-bold ">
            <div  className="text-white text-decoration-none">
              DevLink
            </div>
          </h3>
          <div className="flex-row my-3 my-md-0 ms-auto">
            <Link to="/feed"
              className="text-white mr-2 header-search-icon mx-3"
              title="Home"
              data-toggle="tooltip"
              data-placement="bottom"
            >
             <i class="fa-solid fa-house-user"></i>
            </Link>
            <Link to="/search"
              className="text-white me-3 header-search-icon"
              title="Search"
              data-toggle="tooltip"
              data-placement="bottom"
            >
              <i className="fas fa-search " />
            </Link>
            
            <Link to='/myprofile' className="mr-2" title='Profile'>
            {displayprofile()}
             </Link>
            <Link className="btn btn-sm btn-success mr-2 mx-3" to="/createpost">
              Create Post
            </Link>
            <Link to="/home">
              <button className="btn btn-sm btn-danger" onClick={logout}>SIGN OUT</button>
            </Link>
          </div>
        </div>
      </header>
      </div>
  )
}

export default Header
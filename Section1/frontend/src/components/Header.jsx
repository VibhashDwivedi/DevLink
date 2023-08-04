import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
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
              <i className="fas fa-comment mx-4" />
            </span>
            <a href="#" className="mr-2">
              <img
                title="My Profile"
                data-toggle="tooltip"
                data-placement="bottom"
                style={{ width: 32, height: 32, borderRadius: 16 }}
                src="https://gravatar.com/avatar/f64fc44c03a8a7eb1d52502950879659?s=128"
              />
            </a>
            <Link className="btn btn-sm btn-success mr-2 mx-4" to="/createpost">
              Create Post
            </Link>
            <form action="#" method="POST" className="d-inline">
              <button className="btn btn-sm btn-secondary">SIGN OUT</button>
            </form>
          </div>
        </div>
      </header>
      </div>
  )
}

export default Header
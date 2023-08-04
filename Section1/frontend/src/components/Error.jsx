import React from 'react'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
    <div>
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
        <a className="btn btn-sm btn-success mr-2 mx-4" href="#">
          Create Post
        </a>
        <form action="#" method="POST" className="d-inline">
          <button className="btn btn-sm btn-secondary">Sign Out</button>
        </form>
      </div>
    </div>
  </header>
  <div class="container py-md-5 container--narrow">
        <div class="text-center">
            <h2>Whoops, we cannot find that page.</h2>
            <p class="lead text-muted">You can always visit the <Link to="/home" className='text-decoration-none' >homepage</Link> to get a fresh start.</p>
        </div>
    </div>
</div>
    </div>
  )
}

export default Error
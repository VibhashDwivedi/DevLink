import React from 'react'
import Header from './Header'
import '../css/createpost.css'
import { Link, NavLink } from 'react-router-dom'


const Post = () => {
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
              <NavLink to="/postchat"><i className="fas fa-comment mx-4 text-white" /></NavLink>
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
<div className="container py-md-5 container--narrow">
  <div className="d-flex justify-content-between">
    <h2>Example post Title here</h2>
    <span className="pt-2">
      <a
        href="#"
        className="text-primary mr-2"
        data-toggle="tooltip"
        data-placement="top"
        title="Edit"
      >
        <i className="fas fa-edit mx-2" />
      </a>
      <form className="delete-post-form d-inline" action="#" method="post">
        <button
          className="delete-post-button text-danger"
          data-toggle="tooltip"
          data-placement="top"
          title="Delete"
        >
          <i className="fas fa-trash" />
        </button>
      </form>
    </span>
  </div>
  <p className="text-muted small mb-4">
    <a href="#">
      <img
        className="avatar-tiny"
        src="https://gravatar.com/avatar/f64fc44c03a8a7eb1d52502950879659?s=128"
      />
    </a>
    Posted by <a href="#">kittydoe</a> on 2/3/2021
  </p>
  <div className="body-content">
    <p>My roommate yells at me when I destroy things, but I do what I want.</p>
    <p>
      My roommate yells at me when I destroy things, but I do what I want.Lorem
      ipsum dolor sit amet, consectetur adipisicing elit
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
      praesentium laboriosam unde fuga accusamus reiciendis laudantium quis
      consequatur, beatae temporibus nemo, tempora voluptatum, perspiciatis
      accusantium ullam molestiae cupiditate incidunt architecto.
    </p>
  </div>
</div>

</div>
  )
}

export default Post
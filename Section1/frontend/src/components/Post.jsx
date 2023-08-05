import React from 'react'
import Header from './Header'
import '../css/createpost.css'


const Post = () => {
  return (
    <div>
<Header/>
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
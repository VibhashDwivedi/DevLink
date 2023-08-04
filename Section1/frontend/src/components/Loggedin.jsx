import React from 'react'

const Loggedin = () => {
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
        <a className="btn btn-sm btn-success mr-2 mx-4" href="#">
          Create Post
        </a>
        <form action="#" method="POST" className="d-inline">
          <button className="btn btn-sm btn-secondary">Sign Out</button>
        </form>
      </div>
    </div>
  </header>
  {/* body starts here*/}
  <div className="container py-md-5 container--narrow">
    <h2 className="text-center mb-4">The Latest From Those You Follow</h2>
    <div className="list-group">
      <a href="#" className="list-group-item list-group-item-action">
        <img
          className="avatar-tiny"
          src="https://gravatar.com/avatar/f64fc44c03a8a7eb1d52502950879659?s=128"
        />
        <strong>Example Post #1</strong>
        <span className="text-muted small">by kittydoe on 1/3/2019</span>
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        <img
          className="avatar-tiny"
          src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"
        />
        <strong>Example Post #2</strong>
        <span className="text-muted small">by barksalot on 1/3/2019</span>
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        <img
          className="avatar-tiny"
          src="https://gravatar.com/avatar/f64fc44c03a8a7eb1d52502950879659?s=128"
        />
        <strong>Example Post #1</strong>
        <span className="text-muted small">by kittydoe on 1/3/2019</span>
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        <img
          className="avatar-tiny"
          src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"
        />
        <strong>Example Post #2</strong>
        <span className="text-muted small">by barksalot on 1/3/2019</span>
      </a>
    </div>
  </div>
  </div>
  )
}

export default Loggedin
import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import '../css/createpost.css'

const Loggedin = () => {
  return (
    <div className='create-post-body vh-100'>
 <Header/>
  <div className="container py-md-5 container--narrow">
    <h2 className="text-center mb-4 text-light">The Latest From Those You Follow</h2>
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
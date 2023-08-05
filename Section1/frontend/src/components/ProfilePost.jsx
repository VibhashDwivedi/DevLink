import React from 'react'
import Header from './Header'

const ProfilePost = () => {
  return (
    <div>
        <Header/>
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
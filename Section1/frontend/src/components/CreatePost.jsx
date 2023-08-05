import React from 'react'
import '../css/createpost.css'
import Header from './Header'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import { Link, NavLink } from 'react-router-dom'



const CreatePost = () => {

  const postSchema = Yup.object().shape({
    title: Yup.string()
    .required('Required'),
    content: Yup.string().required('Required'),
  });





  const postForm = useFormik({
    initialValues:{
        title :'',
      content: ''
},
onSubmit : (values)=>{
    console.log(values);
},
validationSchema:postSchema
});




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
              <NavLink to="/createpostchat"><i className="fas fa-comment mx-4 text-white" /></NavLink>
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
<div >
  <div className="container py-md-3 container--narrow">
        <form action="#" method="post" onSubmit={postForm.handleSubmit}>
            <div className="form-group">
                <label htmlFor="post-title" className="text-light mb-1 fw-bold fs-3 title">Title</label>
                <p  className='error-label'>{postForm.touched.title? postForm.errors.title :''}</p>
                <input  name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" autoComplete="off"  onChange={postForm.handleChange} value={postForm.values.title}/>
            </div>

            <div className="form-group">
                <label htmlFor="post-body" className=" text-light mb-1"><small>Content</small></label>
                <p  className='error-label'>{postForm.touched.content? postForm.errors.content :''}</p>
                <textarea name="content" id="post-body" className="form-control tall-textarea body-content" type="text" autoComplete="off" onChange={postForm.handleChange} value={postForm.values.content}></textarea>
            </div>

            <button type='submit' className="btn btn-info mt-2">Publish Post</button>
        </form>
    </div>
  </div>
  </div>
  )
}

export default CreatePost
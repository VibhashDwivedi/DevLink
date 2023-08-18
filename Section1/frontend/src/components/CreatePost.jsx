import React, { useState } from 'react'
import '../css/createpost.css'
import Header from './Header'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom'
import Home from './Home'
import useUserContext from '../UserContext'



const CreatePost = () => {

  const [currentUser, setcurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  );

  const postSchema = Yup.object().shape({
    title: Yup.string()
    .required('Required'),
    content: Yup.string().required('Required'),
  });





  const postForm = useFormik({
    initialValues:{
        title :'',
      content: '',
      username: sessionStorage.getItem('user'),
},
onSubmit: async (values) => {
   console.log(values);
    //sending request to backend
  const res = await fetch("http://localhost:8000/post/add",
  {method:'POST',
   body:JSON.stringify(values),
   headers:{
    'Content-Type': 'application/json'
   } ,

  
});
  
 console.log(res.status);
 if(res.status === 200){
  toast.success('Post Created Successfully😊')
}

 

} ,

validationSchema:postSchema
});

const {LoggedIn, logout} = useUserContext();
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
              <NavLink to="/createpostchat"><i className="fas fa-comment mx-4 text-white" /></NavLink>
            </span>
            <Link to='/myprofile' className="mr-2">
            <img width={40} height={40} className='mx-2 rounded-circle' src={"http://localhost:8000/"+currentUser.avatar} alt="" />
            </Link>
            <Link className="btn btn-sm btn-success mr-2 mx-4" to="/createpost">
              Create Post
            </Link>
            <Link to="/home">
              <button className="btn btn-sm btn-secondary" onClick={logout}>SIGN OUT</button>
            </Link>
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
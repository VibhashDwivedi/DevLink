import React, { useState } from 'react'
import '../css/createpost.css'
import Header from './Header'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Home from './Home'
import useUserContext from '../UserContext'



const CreatePost = () => {
  const navigate = useNavigate();

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
      username: currentUser.username,
      avatar: currentUser.avatar,
      profile: currentUser.profile,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
},
onSubmit: async (values) => {
   console.log(values);
    //sending request to backend
  const res = await fetch("https://devlink-project.onrender.com/post/add",
  {method:'POST',
   body:JSON.stringify(values),
   headers:{
    'Content-Type': 'application/json'
   } ,

  
});
  
 console.log(res.status);
 if(res.status === 200){
  toast.success('Post Created Successfully😊')
  navigate('/myprofile')
}

 

} ,

validationSchema:postSchema
});

const displayprofile = () => {
  if(currentUser.avatar===""){
    return <i  className="fa-solid fa-user fa-2xl " style={{color:'#e8e8e8'}}></i>
  }
  else{
return <img width={40} height={40} className='mx-2 rounded-circle' src={"https://devlink-project.onrender.com/"+currentUser.avatar} alt="" />
   }
 }
// disable button after click

  

const {LoggedIn, logout} = useUserContext();
 if(!LoggedIn)
 return<Home/>
 


  return (
       <div className='create-post-body vh-100'>

<div className='body2'>
      <header className="header-bar2 mb-3">
        <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h3 className="my-0 mr-md-auto fw-bold ">
            <div className="text-white text-decoration-none">
              DevLink
            </div>
          </h3>
          <div className="flex-row my-3 my-md-0 ms-auto">
          <Link to="/feed"
              className="text-white mr-2 header-search-icon mx-4"
              title="Search"
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
           
            <Link to='/myprofile' className="mr-2">
           {displayprofile()}
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
                <label htmlFor="post-title" className="text-light mb-1 fw-bold fs-3 title2">Title</label>
                <p  className='error-label'>{postForm.touched.title? postForm.errors.title :''}</p>
                <input placeholder='Title here' name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" autoComplete="off"  onChange={postForm.handleChange} value={postForm.values.title}/>
            </div>

            <div className="form-group">
                <label htmlFor="post-body" className=" text-light mb-1 fs-4 fw-bold">Content</label>
                <p  className='error-label'>{postForm.touched.content? postForm.errors.content :''}</p>
                <textarea placeholder='Content goes here...' name="content" id="post-body" className="form-control tall-textarea body-content" type="text" autoComplete="off" onChange={postForm.handleChange} value={postForm.values.content}></textarea>
            </div>

            <button type='submit' className="btn btn-info mt-2" >Publish Post</button>
            {/* make button clickable only once */}






        </form>
    </div>
  </div>
  </div>
  )
}

export default CreatePost
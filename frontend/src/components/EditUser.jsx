import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useUserContext from '../UserContext';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import Home from './Home';
import Header from './Header';


const EditUser = () => {
    const navigate = useNavigate();
    const {LoggedIn} = useUserContext();

    const [currentUser, setCurrentUser] = useState(
      JSON.parse(sessionStorage.getItem("user"))
    );

    const [selImage, setselImage] = useState(currentUser.avatar)
    const fetchUserData = async () => {
        const res = await fetch("https://devlink-project.onrender.com/user/getbyid/"+currentUser._id);
        console.log(res.status);

        const data = await res.json();
        console.log(data);
    };

    useEffect(()=>{
        fetchUserData();
    }, [currentUser]);
   
    
  
    const userNameRegex = /^[a-zA-Z0-9_-]*$/;


    const SignupSchema = Yup.object().shape({
        username: Yup.string()
          .min(5, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required')
        .matches(userNameRegex, 'Username can only contain alphanumeric characters, underscores and hyphens')
          .test("username", "Username already registered", function (username) {
            return username===currentUser.username? true: checkAvailabilityUsername(username);}
            ),
          profile:Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required')
        //validate if email is present
        .test("email", "Email already registered", function (email) {
         return  email===currentUser.email? true :checkAvailabilityEmail(email);}
          ),
        password: Yup.string().min(8,'Too Short!').required('Required'),
      });
   
    //check if email is present
    const checkAvailabilityEmail = async (email) => {
      const res = await fetch("https://devlink-project.onrender.com/user/checkemail/"+email,
      {method:'GET',
      headers:{
        'Content-Type': 'application/json'
      } ,
      });
      console.log(res.status);
      if(res.status === 200){
        return true;

      }else if(res.status === 401){
        return false;
      }
    }
    

    //check if username is present
    const checkAvailabilityUsername = async (username) => {
      const res = await fetch("https://devlink-project.onrender.com/user/checkusername/"+username,
      {method:'GET',
      headers:{
        'Content-Type': 'application/json'
      } ,
      });
      console.log(res.status);
      if(res.status === 200){
        return true;

      }else if(res.status === 401){
        return false;
      }
    }
   
    
    const signupForm = useFormik({
      initialValues: {
        username: currentUser.username,
        profile:currentUser.profile,
        email: currentUser.email,
        password: currentUser.password,
        avatar: currentUser.avatar
      },
  
      onSubmit: async (values) => {
        values.avatar= selImage;
         console.log(values);
          //sending request to backend
        const res = await fetch("https://devlink-project.onrender.com/user/update/"+currentUser._id,
        {method:'PUT',
         body:JSON.stringify(values),
         headers:{
          'Content-Type': 'application/json'
         } ,
  
        
      });
        
       console.log(res.status);
       if(res.status === 200){
        Swal.fire({
          icon:'success',
          title: 'Update Successful',
        });
      
        
      const data = await res.json();
      //setcurrentUser(data)
      sessionStorage.setItem('user',JSON.stringify(data));

      navigate('/myprofile');
      }else{
        Swal.fire({
          icon:'error',
          title: 'Oops',
          text: 'Some error occured'
      });
  
  
        }
  
       
  
  } ,
  validationSchema : SignupSchema
    });

    const uploadFile=  async(e)=>{
        let file = e.target.files[0];
        if(file.name==='')
        setselImage(currentUser.avatar)
        else
        setselImage(file.name);
        const fd = new FormData();
        fd.append('myfile', file);
        const res =await fetch ('https://devlink-project.onrender.com/util/uploadfile',{
          method:'PUT',
          body :fd
        });
      
        console.log(res.status);
      }

   
      if(!LoggedIn)
      return <Home/>
      

    
   
    return (
        <div className='create-post-body '>
        <div style={{position:'fixed'}} className='w-100'><Header /></div>
      <div className="d-flex align-items-center justify-content-center ">
      <div className="card p-5 pt-3 shadow-lg " style={{border:'none', marginTop:'100px'}}>
            <div className="card-body">
           <div className='text-center fs-3 fw-bold'>Edit Details</div>
            <form action="#" method="POST" id="registration-form" onSubmit={signupForm.handleSubmit}>
          <div className="form-group">
            {/* <label htmlFor="username-register" className="text-muted mb-1">
              <small className='mx-4'>Username</small>
            </label> */}
            <p  className='error-label'>{signupForm.touched.username? signupForm.errors.username :''}</p>

           <div className="d-flex">
           <i class="fa-solid fa-user fa-2x me-3"></i>
           <input
              name="username"
              id="username-register"
              className="form-control"
              type="text"
              placeholder="Pick a username"
            //   autoComplete="off"
              onChange={signupForm.handleChange}
              value={signupForm.values.username}
            />
           </div>

           
          </div>
          <div className="form-group">
            {/* <label htmlFor="type-register" className="text-muted mb-1">
              <small>Profile</small>
            </label> */}
            <p  className='error-label'>{signupForm.touched.profile? signupForm.errors.profile :''}</p>
           <div className="d-flex">
           <i class="fa-solid fa-user-tie fa-2x me-3"></i>
           <select
              name="profile"
              id="profile-register"
              className="form-control text-muted"
              type="text"
              placeholder="Pick a profile"
              autoComplete="off"
              onChange={signupForm.handleChange}
              value={signupForm.values.profile}
            >
              <option >Pick a Profile</option>
              <option value="Android Developer">Android Developer</option>
              <option value="Web Developer">Web Developer</option>
              <option value="Blockchain Developer">Blockchain Developer</option>
              <option value="ML Engineer">ML Engineer</option>
              <option value="Coding Instructor">Coding Instructor</option>
            </select>
           </div>
           
            
          </div>
          <div className="form-group">
            {/* <label htmlFor="email-register" className="text-muted mb-1">
              <small>Email</small>
            </label> */}
            <p  className='error-label'>{signupForm.touched.email? signupForm.errors.email :''}</p>
           
           <div className="d-flex">
           <i class="fa-solid fa-envelope fa-2x me-3"></i>
           <input
              name="email"
              id="email-register"
              className="form-control"
              type="text"
              placeholder="you@example.com"
            //   autoComplete="off"
              onChange={signupForm.handleChange}
              value={signupForm.values.email}
            />
           </div>
           
          </div>
          <div className="form-group">
            {/* <label htmlFor="password-register" className="text-muted mb-1" >
              <small>Password</small>
            </label> */}
            <p  className='error-label'>{signupForm.touched.password? signupForm.errors.password:''}</p>
           <div className="d-flex">
           <i class="fa-solid fa-key fa-2x me-3"></i>
           <input
              name="password"
              id="password-register"
              className="form-control"
              type="password"
              placeholder='Password here (Min 8 Characters)'
              onChange={signupForm.handleChange}
              value={signupForm.values.password}
            />
             <i class="fa-solid fa-eye px-2" style={{marginLeft:'-35px',marginTop:'10px'}}
             onClick={

function(){
  var x = document.getElementById("password-register");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }

}
}></i>
           </div>
            
          </div>
          {/* <label htmlFor="" className='form-label'>Profile Pic</label> */}

         <div className="d-flex mt-4">
         <i class="fa-solid fa-camera fa-2x me-3"></i>
         <input
             type="file"
             id=""
             className="form-control "
             placeholder='Upload Profile Pic'
             onChange={uploadFile}/>
         </div>

          
         <div className="d-flex justify-content-center">
         <button
            type="submit"
            className="py-2 mt-4 btn btn-lg btn-info   m-auto"
          >
            Update Details 
          </button>
         </div>
         
        </form>
            </div>
        </div>
     
    </div>
    </div>
    )
}

export default EditUser
import React, { useState } from 'react'
import { useFormik} from 'formik'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import useUserContext from '../UserContext'
import { useNavigate } from 'react-router-dom'





const Home = () => {

const{setLoggedIn} = useUserContext();
  const navigate = useNavigate();
  const [selImage, setselImage] = useState('');

 const userNameRegex = /^[a-zA-Z0-9_-]*$/;

    const loginSchema = Yup.object().shape({
        username: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
        password: Yup.string().required('Required'),
      });

      const SignupSchema = Yup.object().shape({
        username: Yup.string()
          .min(5, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required')
        .matches(userNameRegex, 'Username can only contain alphanumeric characters, underscores and hyphens')
          .test("username", "Username already registered", function (username) {
            return checkAvailabilityUsername(username);}
            ),
          profile:Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required')
        //validate if email is present
        .test("email", "Email already registered", function (email) {
          return checkAvailabilityEmail(email);}
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



    const loginForm = useFormik({
        initialValues:{
            username: '',
          password: ''
    },
    onSubmit : async (values) => {

      
      console.log(values);
      
      //submit values to backend
      const res = await fetch("https://devlink-project.onrender.com/user/authenticate",
      {method:'POST',
       body:JSON.stringify(values),
       headers:{
        'Content-Type': 'application/json'
       } ,
  
      
    });
    
    console.log(res.status);
    if(res.status === 200){
      Swal.fire({
        icon: 'success',
        title:'Login Successful'
      })
     
      const data = await res.json();
      sessionStorage.setItem('user',JSON.stringify(data));
     // console.log(data.username);
      setLoggedIn(true);
      navigate('/feed');


    }else if(res.status === 401){
      Swal.fire('Invalid Credentials','Invalid Email or Password.','warning')
    }
    else{
      Swal.fire({
        icon:'error',
        title: 'Oops',
        text: 'Some error occured'
    });
    }
    
    
    },
      validationSchema: loginSchema
});


//function to show password


    const signupForm = useFormik({
        initialValues: {
          username: '',
          profile:'',
          email: '',
          password: '',
        },
        onSubmit: async (values) => {
          values.avatar= selImage;
          console.log(values);
           //sending request to backend
         const res = await fetch("https://devlink-project.onrender.com/user/add",
         {method:'POST',
          body:JSON.stringify(values),
          headers:{
           'Content-Type': 'application/json'
          } ,
   
         
       });
         
        console.log(res.status);
        if(res.status === 200){
         Swal.fire({
           icon:'success',
           title: 'Signup Success',
           text: 'Now Login To Continue'
         });
        //reset signup form

        signupForm.resetForm();
       }else{
         Swal.fire({
           icon:'error',
           title: 'Oops',
           text: 'Some error occured'
       });
   
   
         }
   
        
   
   } ,
   validationSchema : SignupSchema,
   //validateOnChange : false,
        });


        const uploadFile=  async(e)=>{
          let file = e.target.files[0];
          setselImage(file.name);
          const fd = new FormData();
          fd.append('myfile', file);
          const res =await fetch ('https://devlink-project.onrender.com/util/uploadfile',{
            method:'POST',
            body :fd
          });
        
          console.log(res.status);
        }

  return (
    <div className='body'>

   





  <header className="header-bar mb-3">
    <div className="container d-flex flex-column flex-md-row align-items-center p-3">
      <h3 className="my-0 mr-md-auto fw-bold ">
        <a href="/" className="text-white text-decoration-none">
          DevLink
        </a>
      </h3>
      <form action="#" method="post" className="mb-0 pt-2 pt-md-0 ms-auto" onSubmit={loginForm.handleSubmit}>
        <div className="row align-items-center ">
          <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
            <input
              name="username"
              className="form-control form-control-sm input-dark"
              type="text"
              placeholder="Username"
              autoComplete=""
              onChange={loginForm.handleChange}
              value={loginForm.values.username}
            />
          </div>
          <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0 d-flex">
            <input
              name="password"
              className="form-control form-control-sm input-dark"
              id='typepass'
              type="password"
              placeholder="Password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
            />
            <i className="fa-solid fa-eye"   style={{marginLeft:'-30px',marginTop:'10px'}}
             onClick={

function(){
  var x = document.getElementById("typepass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }

}
}></i>
             
            </div>
           
          <div className="col-md-auto ">
            <button
            type='submit'
              className="btn btn-primary btn-sm login"
              style={{ width: "100%" }}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </header>
  {/* body starts here*/}
  <div className="container  ">
    <div className="row align-items-center">
      <div className="col-lg-7 mb-lg-5">
        <h2 className="display-4 text-light">Space for Developers to Link👨‍💻!!</h2>
        <p className=" fs-5  description">
          Enjoy post and tweets on new technologies by developers for
          developers!!
        </p>
      </div>
      <div className="col-lg-5 pl-lg-5 mb-3 py-lg-5">
        <div className="card p-5 pt-3 shadow-lg signup-card" style={{border:'none'}}>
            <div className="card-body">
            <i className="fa-solid fa-lock fa-2x d-block text-center mb-3"></i> 
            <form action="#" method="POST" id="registration-form" onSubmit={signupForm.handleSubmit}>
          <div className="form-group">
            {/* <label htmlFor="username-register" className="text-muted mb-1">
              <small className='mx-4'>Username</small>
            </label> */}
            <p  className='error-label'>{signupForm.touched.username? signupForm.errors.username :''}</p>

           <div className="d-flex">
           <i className="fa-solid fa-user fa-2x me-3"></i>
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
           <i className="fa-solid fa-user-tie fa-2x me-3"></i>
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
           <i className="fa-solid fa-envelope fa-2x me-3"></i>
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
           <i className="fa-solid fa-key fa-2x me-3"></i>
           <input
              name="password"
              id="password-register"
              className="form-control"
              type="password"
              placeholder='Password here (Min 8 Characters)'
              onChange={signupForm.handleChange}
              value={signupForm.values.password}
            />
             <i className="fa-solid fa-eye px-2" style={{marginLeft:'-35px',marginTop:'10px'}}
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
         <i className="fa-solid fa-camera fa-2x me-3"></i>
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
            className="py-2 mt-4  btn btn-lg btn-info   me-4"
          >
            Sign up for DevLink
          </button>
         </div>
         
        </form>
            </div>
        </div>
        
      </div>
    </div>
  </div>

</div>
  )
}

export default Home
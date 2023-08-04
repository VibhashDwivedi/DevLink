import React from 'react'
import { useFormik} from 'formik'
import * as Yup from 'yup'

const Home = () => {

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
          .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8,'Too Short!').required('Required'),
      });


    const loginForm = useFormik({
        initialValues:{
            username: '',
          password: ''
    },
    onSubmit : (values)=>{
        console.log(values);
    },
    validationSchema:loginSchema
});

    const signupForm = useFormik({
        initialValues: {
          username: '',
          email: '',
          password: ''
        },
        onSubmit : (values)=>{
            console.log(values);
        },
        validationSchema : SignupSchema
        });


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
          <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
            <input
              name="password"
              className="form-control form-control-sm input-dark"
              type="password"
              placeholder="Password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
            />
          </div>
          <div className="col-md-auto ">
            <button
            type='submit'
              className="btn btn-primary btn-sm login"
              style={{ width: "100%" }}
            >
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  </header>
  {/* body starts here*/}
  <div className="container py-md-2 ">
    <div className="row align-items-center">
      <div className="col-lg-7 mb-lg-5">
        <h2 className="display-4 text-light">Space for Developers to Link👨‍💻!!</h2>
        <p className=" fs-5  description">
          Enjoy post and tweets on new technologies by developers for
          developers!!
        </p>
      </div>
      <div className="col-lg-5 pl-lg-5 mb-3 py-lg-5">
        <div className="card p-5 pt-3 shadow-lg " style={{border:'none'}}>
            <div className="card-body">
            <i className="fa-solid fa-lock fa-2x d-block text-center mb-3"></i> 
            <form action="#" method="POST" id="registration-form" onSubmit={signupForm.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username-register" className="text-muted mb-1">
              <small>Username</small>
            </label>
            <p  className='error-label'>{signupForm.touched.username? signupForm.errors.username :''}</p>
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
          <div className="form-group">
            <label htmlFor="type-register" className="text-muted mb-1">
              <small>Profile</small>
            </label>
           
            <select
              name="profile"
              id="profile-register"
              className="form-control"
              type="text"
              placeholder="Pick a profile"
              autoComplete="off"
            >
              <option value="Android Developer">Android Developer</option>
              <option value="Web Developer">Web Developer</option>
              <option value="Blockchain Developer">Blockchain Developer</option>
              <option value="ML Engineer">ML Engineer</option>
              <option value="Coding Instructor">Coding Instructor</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email-register" className="text-muted mb-1">
              <small>Email</small>
            </label>
            <p  className='error-label'>{signupForm.touched.email? signupForm.errors.email :''}</p>
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
          <div className="form-group">
            <label htmlFor="password-register" className="text-muted mb-1">
              <small>Password</small>
            </label>
            <p  className='error-label'>{signupForm.touched.password? signupForm.errors.password:''}</p>
            <input
              name="password"
              id="password-register"
              className="form-control"
              type="password"
              placeholder="Create a password"
              onChange={signupForm.handleChange}
              value={signupForm.values.password}
            />
          </div>
          <button
            type="submit"
            className="py-2 mt-4 btn btn-lg btn-info btn-block"
          >
            Sign up for DevSpace
          </button>
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
import React, { useEffect, useState } from 'react'
import Header from './Header'
import '../css/createpost.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Home from './Home'
import useUserContext from '../UserContext'
import { toast } from 'react-hot-toast'
const ProfilePost = () => {
  const navigate = useNavigate();

  const {LoggedIn, logout} = useUserContext();
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  );
  const [Tlist, setTlist] = useState([]);

  const fetchUserData1 = async () =>{
    const res = await fetch('http://localhost:8000/post/getall');

    console.log(res.status);

    if(res.status ===200){
        const data = await res.json();
        setTlist(data);
        // setsearch(data);
    }
};
useEffect(() => {
  fetchUserData1();
}, []);

const countPost = () => {
  let count = 0;
  for(let i = 0; i<Tlist.length; i++){
    if(Tlist[i].username === currentUser.username ){
        count++;
         }
}
console.log(count);
return count;
}


const deletepost = async  (id) =>{
  console.log(id);
  const res = await  fetch('http://localhost:8000/post/delete/'+id, {method:'DELETE'});
  if(res.status === 200){
      fetchUserData1();
      toast.success('Post deleted successfully')
  } 
}

const displayPost = () => {
  //display posts of curentuser
  const post = [];
  for(let i = 0; i<Tlist.length; i++){
    if(Tlist[i].username === currentUser.username ){
        post.push(Tlist[i]);
         }
        }
        console.log(post);

       
          
          return post.map((posts) => {
            return (
              <div className='card shadow-lg mt-4'  style={{border:'none'}}>
              <div className='card-header  card-header-bg '>
              <div className="d-flex"><img src={"http://localhost:8000/"+posts.avatar} alt=""   className='rounded-circle'  width={35} height={35}/>
              <div className="text-black fw-3  mx-2 fs-4">{posts.username}</div>
            
              
              {/* <div className=' text-muted ' style={{marginLeft:'300px'}}></div> */}
              <div className=' text-muted ms-auto' >
                📅{posts.date}   ⌚{posts.time}  </div>
             
    
             </div>
            
             <div className=' text-muted mx-5' >{posts.profile}</div>
           
              </div>
              <div className=" text-black fw-bold mx-2 mt-2 fs-4">{posts.title}</div>
               <div className=' text-black mx-3 pb-2 fw-light  '>{posts.content}</div>
                <div className=' text-black mx-3 pb-2 fw-light  '><i className="fa-solid fa-heart " style={{color:'red'}}></i><>  </>  {posts.likes}</div>
               <div className=" p-4 py-2 mx-5" style={{marginTop:'-40px'}} onClick={()=> {deletepost(posts._id)}}><button >
                Delete
               </button>
               </div>
               <div className=" p-4 py-2 ms-auto" style={{marginTop:'-40px'}}><i onClick={()=>{navigate('/editpost/'+posts._id)}} class="fa-regular fa-pen-to-square" title='Edit'></i></div>
               </div>
            )
          })
}





  if(!LoggedIn)
  return<Home/>
  
   return (
    <div className='create-post-body vh-200'>
        <div className='body2'>
      <header className="header-bar2 mb-3">
        <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h3 className="my-0 mr-md-auto fw-bold ">
            <a href="/" className="text-white text-decoration-none">
              DevLink
            </a>
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
              
              className="text-white mr-2 header-search-icon"
              title="Search"
              data-toggle="tooltip"
              data-placement="bottom"
            >
              <i className="fas fa-search " />
            </Link>
            <span
              className="text-white mr-2 header-chat-icon"
              title="Chat"
              data-toggle="tooltip"
              data-placement="bottom"
            >
              <NavLink to="/profilepostchat"><i className="fas fa-comment mx-4 text-white" /></NavLink>
            </span>
            <Link to='/myprofile' className="mr-2">
            <img width={40} height={40} className='mx-2 rounded-circle' src={"http://localhost:8000/"+currentUser.avatar} alt="" />
            </Link>
            <Link className="btn btn-sm btn-success mr-2 mx-4" to="/createpost">
              Create Post
            </Link>
            <Link to='/home'>
              <button className="btn btn-sm btn-secondary" onClick={logout}>SIGN OUT</button>
            </Link>
          </div>
        </div>
      </header>
      </div>
        <div className="container py-md-5 container--narrow card-header">
          <div className="card">
            <div className="card-header">
            <h2 >
  <img width={40} height={40} className='mx-2 rounded-circle' src={"http://localhost:8000/"+currentUser.avatar} alt="" />
    {currentUser.username}
  </h2>

  <p className=' text-muted ' style={{marginTop:'-20px' , marginLeft:'58px'}}>{currentUser.profile}</p>
  
  <div className="profile-nav nav nav-tabs pt-2 mb-4">
<button className="btn btn-dark">
Posts : {countPost()}
</button>
<button className="btn btn-dark mx-4">
Followers : 3
</button>
<button className="btn btn-dark">
Following : 3
</button>

            </div>
          </div>
  
  
  </div>
  {
    displayPost()
  }
 
</div>


            </div>
  )
}

export default ProfilePost
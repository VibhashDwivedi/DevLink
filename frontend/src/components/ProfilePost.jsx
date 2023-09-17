import React, { useEffect, useState } from 'react'
import Header from './Header'
import '../css/createpost.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Home from './Home'
import useUserContext from '../UserContext'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'
const ProfilePost = () => {
 
  const navigate = useNavigate();

  const {LoggedIn, logout} = useUserContext();

 
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  );
  const [Tlist, setTlist] = useState([]);
const [Likes, setLikes] = useState([]);
  const [followed,setfollowed]=useState([]);
  const[myfollowers,setmyfollowers]=useState([]);
 
  const fetchFollowData = async () => {
    const res = await fetch("https://devlink-project.onrender.com/follow/getall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      //console.log(data);
      setfollowed(data);
    }

  }
  useEffect(() => {
    fetchFollowData();
  }, []);

  const fetchUserData1 = async () =>{
    const res = await fetch('https://devlink-project.onrender.com/post/getall');

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

const fetchUserLikes = async () => {
  const res = await fetch("https://devlink-project.onrender.com/likes/getall") 
    console.log(res.status);

    if(res.status ===200){
        const data = await res.json();
        setLikes(data);
        // setsearch(data);
    }
}

useEffect(() => {
  fetchUserLikes();
}, []);

const countLikes = (x) => {
  let count = 0;
  for(let i = 0; i<Likes.length; i++){
    if(Likes[i].postId === x ){
        count++;
         }
        }
return count;
}




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

const countFollowers = () => {
  let count = 0;
  for(let i = 0; i<followed.length; i++){
    if(followed[i].following === currentUser.username ){
        count++;
         }
        }
return count;
}

const countFollowing = () => {
  let count = 0;
  for(let i = 0; i<followed.length; i++){
    if(followed[i].userId === currentUser._id ){
        count++;
         }
        }
return count;
}

 

const deletepost = async  (id) =>{
  console.log(id);
  //pass alert before deleting
  const c =  window.confirm('Are you sure you want to delete this post? ');
  if(c===true ){
  const res = await  fetch('https://devlink-project.onrender.com/post/delete/'+id, {method:'DELETE'});
  if(res.status === 200){
      fetchUserData1();
      toast.success('Post deleted successfully')
  } 
}
else 
{
  toast.error('Post not deleted')
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

        post.sort((a,b) => {
          if(a.date > b.date) return -1;
          if(a.date < b.date) return 1;
          if(a.time > b.time) return -1;
          if(a.time < b.time) return 1;
          return 0;
        });
    
          
          return post.map((posts) => {
            return (
              <div className='card shadow-lg mt-4 p-2'  style={{border:'none', backgroundColor:'white'}}>
              {/* <div className='card-header  card-header-bg '> */}
              {/* <div className="d-flex"><img src={"http://localhost:8000/"+posts.avatar} alt=""   className='rounded-circle'  width={35} height={35}/> */}
              {/* <div className="text-black fw-3  mx-2 fs-4">{posts.username}</div> */}
            
              
              {/* <div className=' text-muted ' style={{marginLeft:'300px'}}></div> */}
              {/* <div className=' text-muted ms-auto' >
                📅{posts.date}   ⌚{posts.time}  </div> */}
             
    
             {/* </div> */}
            
             {/* <div className=' text-muted mx-5' >{posts.profile}</div> */}
           
              {/* </div> */}
              <div className="d-flex">
              <div className=" text-black fw-bold mx-2  fs-4">{posts.title}</div>
              <div className=' text-muted ms-auto mx-2 mt-1' >
                📅{posts.date}   ⌚{posts.time}  </div> 
              </div>
              
               <div className=' text-black mx-2 pb-2 fw-light  '>{posts.content}</div>
               <div className=' text-black mx-2 pb-2 fw-light  '><i className="fa-solid fa-heart " style={{color:'red'}}></i> {countLikes(posts._id)}</div>
                
               <div className=" p-4 py-2 ms-auto" style={{marginTop:'-40px'}}>
               <i style={{color:'blue'}} onClick={()=>{navigate('/editpost/'+posts._id)}} class="fa-regular fa-pen-to-square" title='Edit'></i>
               <i class="fa-solid fa-trash-can mx-3" title="delete" style={{color:'red'}} onClick={()=> {deletepost(posts._id)}}></i>
               </div>
               </div>
            )
          })
}










//delete user
const deleteuser = async  (id) =>{
  console.log(id);
  //pass alert before deleting
  const c =  window.confirm('Are you sure you want to delete your account? ');
  if(c===true ){
  const res = await  fetch('https://devlink-project.onrender.com/user/delete/'+id, {method:'DELETE'});
  if(res.status === 200){
      fetchUserData1();
      Swal.fire({
        icon: 'success',
        title: 'Account deleted successfully',
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/home');
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Account not deleted',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
else
{
  Swal.fire({
    icon: 'error',
    title: 'Account not deleted',
    showConfirmButton: false,
    timer: 1500
  })
}
}

  
   
const followed2 = [];
for(let i = 0; i<followed.length; i++){
  if(followed[i].following === currentUser.username ){
      followed2.push(followed[i].userId);
        }
        }
        console.log(followed2);

//fetch follow data by userId




//display  myfollowers 
const displayFollowers = () => {
  
  return myfollowers.map((follow) => {
    return (
      <div className="card shadow-lg mt-4 p-2" style={{border:'none', backgroundColor:'wheat'}}>
      <div className="d-flex">
      <div className=" text-black fw-bold mx-2  fs-4">{follow.username}</div>
      
      <div className=' text-black mx-3 pb-2 fw-light  '>{follow.profile}</div>
      </div>
      </div>
    )
  })
}

    

    





const displayprofile = () => {
  if(currentUser.avatar===""){
    return <i  className="fa-solid fa-user fa-2xl " style={{color:'#e8e8e8'}}></i>
  }
  else{
return <img width={40} height={40} className='mx-2 rounded-circle' src={"https://devlink-project.onrender.com/"+currentUser.avatar} alt="" />
   }
 }
const displayprofile2 = () => {
  if(currentUser.avatar===""){
    return <i  className="fa-solid fa-user fa-xl mx-2 " style={{color:'#8c8c8c'}}></i>
  }
  else{
return <img width={40} height={40} className='mx-2 rounded-circle' src={"https://devlink-project.onrender.com/"+currentUser.avatar} alt="" />
   }
 }

 








  if(!LoggedIn)
  return<Home/>
  
   return (
    <div className='create-post-body vh-200'>
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
              className="text-white mr-2 header-search-icon mx-3"
              title="Home"
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
           
            <Link to='/myprofile' className="mr-2" title='Profile'>
           {displayprofile()}
            </Link>
            <Link className="btn btn-sm btn-success mr-2 mx-3" to="/createpost">
              Create Post
            </Link>
            <Link to='/home'>
              <button className="btn btn-sm btn-danger" onClick={logout}>SIGN OUT</button>
            </Link>
          </div>
        </div>
      </header>
      </div>
        <div className="container py-md-5 container--narrow card-header">
          <div className="card">
            <div className="card-header">
           
        <div className="d-flex">
        <h2 >
  {/* <img width={40} height={40} className='mx-2 rounded-circle' src={"http://localhost:8000/"+currentUser.avatar} alt="" /> */}
   {displayprofile2()}
    {currentUser.username}
  </h2>
  <div className="d-flex ms-auto">
    <Link to='/edituser'>
  <button className=' btn h-75 btn-primary'>Edit</button></Link>
  
  <button className=' ms-2 btn h-75 btn-danger' onClick={()=> {deleteuser(currentUser._id)}}> Delete</button>
  </div>
  
          </div>   
            

  <p className=' text-muted ' style={{marginTop:'-20px' , marginLeft:'58px'}}>{currentUser.profile}</p>
  
  <div className="profile-nav nav nav-tabs pt-2 mb-4">
<button className="btn btn-dark">
Posts : {countPost()}
</button>
<button className="btn btn-dark mx-3">
Followers : {countFollowers()}
</button>
<button className="btn btn-dark">
Following : {countFollowing()}
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
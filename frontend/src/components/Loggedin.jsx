import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import '../css/createpost.css'
import Home from './Home'
import useUserContext from '../UserContext'
import { useFormik} from 'formik'
import { toast } from 'react-hot-toast'


const Loggedin = () => {


  const navigate=useNavigate();

  const [currentUser, setcurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  )
  
  const[followed, setfollowed] = useState([])
  const [post, setpost] = useState([])
  const [Likes, setLikes] = useState([]);


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
  };
  useEffect(() => {
    fetchFollowData();
  }, [followed]);


  

  const fetchUserLikes = async () =>{
    const res = await fetch('https://devlink-project.onrender.com/likes/getall');

    if(res.status ===200){
        const data = await res.json();
        setLikes(data);
        // setsearch(data);
    }
};
useEffect(() => {
  fetchUserLikes();
}, [Likes]);
//console.log(Tlist);
const {LoggedIn, logout} = useUserContext();



const fetchUserData = async () =>{


  const res = await fetch('https://devlink-project.onrender.com/post/getall');

  console.log(res.status);

  if(res.status ===200){
      const data = await res.json();
      console.log(data);
      setpost(data);
      // setpost2(data);
      //setsearch(data);
  }
};
useEffect(() => {
fetchUserData();
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

const like = (x) => {
  if (Likes.length > 0) {
    const result = Likes.filter((user) => {
      return user.postId === x && user.username === currentUser.username;
    });
    if (result.length > 0) {
      return <button className="btn btn-outline-white" onClick={() => unlikepost(x)}><i className="fa-solid fa-heart me-1" style={{color:'red'}}></i> {countLikes(x)}</button>
    } else {
      return <button className="btn btn-outline-white" onClick={() => likepost(x)}><i className="fa-regular fa-heart me-1" ></i> {countLikes(x)}</button>
    }
  } else {
    return <button className="btn btn-outline-white" onClick={() => likepost(x)}><i className="fa-regular fa-heart me-1" ></i> {countLikes(x)}</button>
  }
}

  const likepost = async (x) => {
    const res = await fetch("https://devlink-project.onrender.com/likes/add", 
      {method:'POST',
      body:JSON.stringify(
        {
          username:currentUser.username,
          postId:x
        }
      ),
      headers:{
       'Content-Type': 'application/json'
      } ,
     
     
   });

   toast.success(`post liked`);
   fetchUserLikes();

    if (res.status === 500) {
      const data = await res.json();
      toast.success("Liked");
      console.log(data);
      fetchUserLikes();
    }
  }

  const unlikepost = async (x) => {
    const res = await fetch("https://devlink-project.onrender.com/likes/delete/"+ currentUser.username+"/"+x, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      toast.success(`Post unliked`);
      console.log(data);
      fetchUserLikes();
    }
  }

   








// const [Likes, setLikes] = useState(0);
const displayprofile = (avt) => {
  if(avt===""){
    return <i  className="fa-solid fa-user fa-2xl mx-1 mt-2" style={{color:'#e8e8e8'}}></i>
  }
  else{
return <img width={35} height={35} className=' rounded-circle' src={"https://devlink-project.onrender.com/"+avt} alt="" />
   }
 }

//display posts of followed users only
 

  



if(!LoggedIn)
return<Home/>

let post2=[]
post2 = post.filter((posts) => {
  
  for(let i = 0; i<followed.length; i++){
      if(followed[i].userId === currentUser._id && followed[i].following === posts.username){
          return true;
      }

}
return false;
})




const displayPost = ()=>{

  

  if(post2.length===0)  return <h1 className='text-center text-white '>Hello {currentUser.username}, you feed is empty <div className='fs-3'>
   <p className='fw-light text-light'>You feed displays latest posts from the people you follow. Search for users 
     <Link to="/search" className=' text-white fw-bold mx-1' title="click">
      here</Link> </p></div>
  </h1>
  else{
   // to sort posts by date and time
    post2.sort((a,b) => {
      if(a.date > b.date) return -1;
      if(a.date < b.date) return 1;
      if(a.time > b.time) return -1;
      if(a.time < b.time) return 1;
      return 0;
    });

    //to display posts of only followed users
    

      return   post2.map((posts) =>(

        //to display posts of only followed users
        

          <div className='card shadow-lg mt-4 p-2 design'  style={{border:'none'}}>
          <div className='card-header rounded-3 card-header-bg design2 '>
          <div className="d-flex">
          <Link  className='text-decoration-none' to={'/userprofile/'+posts.username}>
          {/* <img src={"http://localhost:8000/"+posts.avatar} alt=""   className='rounded-circle'  width={35} height={35}/> */}
          {displayprofile(posts.avatar)}
 </Link>
<Link  className='text-decoration-none' to={'/userprofile/'+posts.username}>
<div className="text-black fw-3  mx-2 fs-4 "  >{posts.username}</div>
  </Link>
      
          {/* <div className=' text-muted ' style={{marginLeft:'300px'}}></div> */}
          
         

         </div>
        
         <p className=' text-muted 'style={{marginTop:'-8px', marginLeft:'44px'}} >{posts.profile}</p>
       
          </div>
          <div className="d-flex">
          <div className=" text-black fw-bold mx-2  fs-4">{posts.title}</div>
          <div className=' text-muted ms-auto mx-2 mt-1' >
            📅{posts.date}   ⌚{posts.time}  </div>
          </div>
          
           <div className=' text-black mx-2 pb-2 fw-light  '>{posts.content}</div>
           {/* <form onSubmit={likeform.handleSubmit}> */}
            {/* <button type='submit' className='btn btn-ouline-secondary w-15' 
           onChange={likeform.handleChange}
           values={likeform.values.postId}
             onClick={()=> { handleLikeClick((posts._id) )}} 
              >{
                displaylikes(posts._id)
              } 
             
              </button>{posts.likes || 0} */}
              <div>{like(posts._id)}</div>
           {/* </form> */}
           </div>
           
      ))
}
}
// const displaylikes = (postId)=>{
//   if(!check(postId)) 
//   return <i className="fa-regular fa-heart"></i>
//   else return <i className="fa-solid fa-heart" style={{color:'red'}}></i>
// }

// //to make sure that each user can like each post once only
// const handleLikeClick = (postId) => {
//   {likeform.values.postId = postId}
//   console.log(postId);
//   if(!check(postId)){
//     fetch(`http://localhost:8000/post/${postId}/likes`, {
//       method: 'PUT',
//   })
//   .then(res => res.json())
//   .then(data => {
//       setpost(prevlikes => prevlikes.map(post => (post._id === postId ? data : post)))
//       toast.success('Post Liked Successfully')

//   })
//   .catch(err => {
//       console.error(err);
//   })
//   }

  
//   else{
//     toast.error('Post Already Liked')
//   }
  
// };

// const check = (postId) => {
//   for(let i = 0; i<Tlist.length; i++){
//       if(Tlist[i].userId === currentUser._id && Tlist[i].postId === postId){
//           return true;
//            }
//   }
//   return false;
// }

//console.log(check(post._id) );





  return (
    <div className='create-post-body vh-200'>
 <Header/>
  <div className="container py-md-5 container--narrow">
  <p className='display-6  text-center text-white title2'>The Latest from those you follow</p>

 
    
  <div >{displayPost()}</div>'
 
  </div>
  </div>
 
  )
}

export default Loggedin
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import '../css/createpost.css'
import Home from './Home'
import useUserContext from '../UserContext'
import { useFormik} from 'formik'
import { toast } from 'react-hot-toast'


const Loggedin = () => {

  const [currentUser, setcurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  )
  

  const [post, setpost] = useState([])
  const [clicked, setClicked] = useState(false);

  const [Tlist, setTlist] = useState([]);

  const fetchUserData1 = async () =>{
    const res = await fetch('http://localhost:8000/likes/getall');

    console.log(res.status);

    if(res.status ===200){
        const data = await res.json();
        setTlist(data);
        // setsearch(data);
    }
};
useEffect(() => {
  fetchUserData1();
}, [Tlist]);
//console.log(Tlist);
const {LoggedIn, logout} = useUserContext();

//setcurrentUser(JSON.parse(sessionStorage.getItem('user')))
const likeform = useFormik({
  initialValues: {
    userId:currentUser._id,
    //to get post id of the post that is clicked
    postId: '',
  },
  onSubmit: async (values) => {
     //sending request to backend
   const res = await fetch("http://localhost:8000/likes/add",
   {method:'POST',
    body:JSON.stringify(values),
    headers:{
     'Content-Type': 'application/json'
    } ,

   
 });
}});


const fetchUserData = async () =>{
  const res = await fetch('http://localhost:8000/post/getall');

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



// const [Likes, setLikes] = useState(0);







if(!LoggedIn)
return<Home/>

const displayPost = ()=>{
  if(post.length===0)  return <h1 className='text-center text-white '>No Posts Found</h1>
  else{
      return post.map((posts) =>(
          <div className='card shadow-lg mt-4'  style={{border:'none'}}>
          <div className='card-header  card-header-bg '>
          <div className="d-flex"><img src={"http://localhost:8000/"+posts.avatar} alt=""   className='rounded-circle'  width={35} height={35}/>
          <div className="text-black fw-3  mx-2 fs-4">{posts.username}</div>
        
          
          {/* <div className=' text-muted ' style={{marginLeft:'300px'}}></div> */}
          <div className=' text-muted ms-auto' >
            📅{posts.date}   ⌚{posts.time}  </div>
         

         </div>
        
         <p className=' text-muted 'style={{marginTop:'-8px', marginLeft:'44px'}} >{posts.profile}</p>
       
          </div>
          <div className=" text-black fw-bold mx-2 mt-2 fs-4">{posts.title}</div>
           <div className=' text-black mx-3 pb-2 fw-light  '>{posts.content}</div>
           <form onSubmit={likeform.handleSubmit}>
            <button type='submit' className='btn btn-ouline-secondary w-15' 
           onChange={likeform.handleChange}
           values={likeform.values.postId}
             onClick={()=> { handleLikeClick((posts._id) )}} 
              >{
                displaylikes(posts._id)
              } 
             
              </button>{posts.likes || 0}
           </form>
           </div>
         
      )) 
  }
}

const displaylikes = (postId)=>{
  if(!check(postId)) 
  return <i className="fa-regular fa-heart"></i>
  else return <i className="fa-solid fa-heart" style={{color:'red'}}></i>
}

//to make sure that each user can like each post once only
const handleLikeClick = (postId) => {
  {likeform.values.postId = postId}
  console.log(postId);
  if(!check(postId)){
    fetch(`http://localhost:8000/post/${postId}/likes`, {
      method: 'PUT',
  })
  .then(res => res.json())
  .then(data => {
      setpost(prevlikes => prevlikes.map(post => (post._id === postId ? data : post)))
      toast.success('Post Liked Successfully')

  })
  .catch(err => {
      console.error(err);
  })
  }

  
  else{
    toast.error('Post Already Liked')
  }
  
};

const check = (postId) => {
  for(let i = 0; i<Tlist.length; i++){
      if(Tlist[i].userId === currentUser._id && Tlist[i].postId === postId){
          return true;
           }
  }
  return false;
}

//console.log(check(post._id) );




  return (
    <div className='create-post-body vh-200'>
 <Header/>
  <div className="container py-md-5 container--narrow">
    
  <div >{displayPost()}</div>'
  </div>
  </div>
 
  )
}

export default Loggedin
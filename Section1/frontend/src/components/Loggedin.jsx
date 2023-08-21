import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import '../css/createpost.css'
import Home from './Home'
import useUserContext from '../UserContext'
import { useFormik} from 'formik'


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
        console.log(data);
        setTlist(data);
        // setsearch(data);
    }
};
useEffect(() => {
  fetchUserData1();
}, []);
console.log(Tlist);
const {LoggedIn, logout} = useUserContext();


const likeform = useFormik({
  initialValues: {
    userId:currentUser._id,
    //to get post id of the post that is clicked
    postId: '',
  },
  onSubmit: async (values) => {
    
    console.log(values);
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
  if(post.length===0)  return <h1 className='text-center text-white '>No Data Found</h1>
  else{
      return post.map((posts) =>(
          <div className='card shadow-lg mt-4'  style={{border:'none'}}>
          <div className='card-header  bg-primary '>
          <div className="d-flex"><img src={"http://localhost:8000/"+posts.avatar} alt=""   className='rounded-circle'  width={35} height={35}/>
          <div className="text-black fw-bold mx-2 fs-4">{posts.username}</div>
          <div className='fw-bold text-black ' style={{marginLeft:'360px'}}>{posts.date}</div>
          <div className='fw-bold text-black mx-auto' >{posts.time}</div>
         </div>
      
          </div>
          <div className=" text-black fw-bold mx-2 mt-2 fs-4">{posts.title}</div>
           <div className=' text-black mx-3 pb-2 fw-light  '>{posts.content}</div>
           <form onSubmit={likeform.handleSubmit}>
            <button type='submit' className='btn btn-ouline-secondary w-15' 
           
             onClick={()=> { handleLikeClick((posts._id) )}} 
             onChange= {likeform.handleChange}
             value= {likeform.values.postId}
             {...likeform.values.postId = posts._id}
              >🧡 
             
              </button>{posts.likes || 0}
           </form>
           </div>
         
      )) 
  }
}

//to make sure that each user can like each post once only
const check = (postId) => {
  for(let i = 0; i<Tlist.length; i++){
      if(Tlist[i].userId === currentUser._id && Tlist[i].postId === postId){
          return false;
      }
  }
  return true;
}




// to check if button is clicked and prevent further clickes 
const handleLikeClick = (postId) => {
  if(!check(postId)){
    //setClicked(true);
    fetch(`http://localhost:8000/post/${postId}/likes`, {
      method: 'PUT',
  })
  .then(res => res.json())
  .then(data => {
      setpost(prevlikes => prevlikes.map(post => (post._id === postId ? data : post)))
    // setClicked(false);

  })
  .catch(err => {
      console.error(err);
      setClicked(false);
  })
  }
};





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
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';

const UserProfile = () => {


  const [currentUser, setcurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  )
    const {username} = useParams();
    const[user, setuser] = useState([]);
    const[post, setpost] = useState([]);
    const[followed,setfollowed]=useState(false);

    const [Likes, setLikes] = useState([]);

    const fetchUserLikes = async () =>{
      const res = await fetch('https://devlink-project.onrender.com/likes/getall');
  
      console.log(res.status);
  
      if(res.status ===200){
          const data = await res.json();
          setLikes(data);
          // setsearch(data);
      }
  };
  useEffect(() => {
    fetchUserLikes();
  }, [Likes]);




     
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
    }, [followed]);
    
    

    const fetchUserData = async () => {
        const res = await fetch("https://devlink-project.onrender.com/user/getbyusername/"+username);
        console.log(res.status);

        const data = await res.json();
        setuser(data);
        console.log(data);
    };

    useEffect(()=>{
        fetchUserData();
    }, []);
console.log(user);
console.log(user._id);

    
      

    //to fetch posts of user using username
    const fetchPostData = async () =>{
      const res = await fetch('https://devlink-project.onrender.com/post/getbyusername/'+username);

      console.log(res.status);

      if(res.status ===200){
          const data = await res.json();
          setpost(data);
          // setsearch(data);
      }
    };
    useEffect(() => {
        fetchPostData();
        }, []);

       console.log(post);

    const countPost = () => {
        let count = 0;
        for(let i = 0; i<post.length; i++){
            if(post[i].username === user.username ){
                count++;
                 }
        }
        console.log(count);
        return count;
        }

        const countFollowers = () => {
          let count = 0;
          for(let i = 0; i<followed.length; i++){
            if(followed[i].following === user.username ){
                count++;
                 }
                }
        return count;
        }
        
        const countFollowing = () => {
          let count = 0;
          for(let i = 0; i<followed.length; i++){
            if(followed[i].userId === user._id ){
                count++;
                 }
                }
        return count;
        }

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
            const res = await fetch("https://devlink-project.onrender.com/likes/delete/"+currentUser.username+'/'+ x, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
        
            if (res.status === 200) {
              const data = await res.json();
              toast.success(`Post disliked`);
              console.log(data);
              fetchUserLikes();
            }
          }
        
           
        





        const displayPost = () => {
            //display posts of curentuser
          
            post.sort((a,b) => {
              if(a.date > b.date) return -1;
              if(a.date < b.date) return 1;
              if(a.time > b.time) return -1;
              if(a.time < b.time) return 1;
              return 0;
            });
        
                 
                    
                    return post.map((posts) => {
                      return (
                        <div className='card shadow-lg mt-4 p-2'  style={{border:'none' , backgroundColor:'white'}}>
                        {/* <div className='card-header  card-header-bg '> */}
                        {/* <div className="d-flex"><img src={"http://localhost:8000/"+posts.avatar} alt=""   className='rounded-circle'  width={35} height={35}/>
                        <div className="text-black fw-3  mx-2 fs-4">{posts.username}</div> */}
                      
                        
                        {/* <div className=' text-muted ' style={{marginLeft:'300px'}}></div> */}
                        {/* <div className=' text-muted ms-auto' >
                          📅{posts.date}   ⌚{posts.time}  </div> */}
                       
              
                       {/* </div> */}
                      
                       {/* <div className=' text-muted mx-5' >{posts.profile}</div>
                     
                        </div> */}

                        <div className="d-flex">
                        <div className=" text-black fw-bold mx-2  fs-4">{posts.title}</div>
                        <div className=' text-muted ms-auto mx-2 mt-1' >
                          📅{posts.date}   ⌚{posts.time}  </div> 
                        </div>
                        
                         <div className=' text-black mx-2 pb-2 fw-light  '>{posts.content}</div>
                         <div className=' text-black  pb-2 fw-light  '>{like(posts._id)}</div>
               
               
                          
                        
                         </div>
                      )
                    })

          }

          const displayprofile = () => {
            if(user.avatar===""){
              return <i  className="fa-solid fa-user fa-xl mx-2 mt-2" style={{color:'#8c8c8c'}}></i>
            }
            else{
          return <img width={35} height={35} className=' rounded-circle' src={"https://devlink-project.onrender.com/"+user.avatar} alt="" />
             }
           }

           const follow = (x) => {
            if (followed.length > 0) {
              const result = followed.filter((user) => {
                return user.following === x && user.userId === currentUser._id;
              });
              if (result.length > 0) {
                return <button className="btn btn-secondary" onClick={() => unfollow(x)}><i class="fa-solid fa-user-minus mx-1"></i>  Following</button>
              } else {
                return <button className="btn btn-primary" onClick={() => followUser(x)}><i class="fa-solid fa-user-plus mx-1"></i>  Follow</button>
              }
            } else {
              return <button className="btn btn-primary" onClick={() => followUser(x)}><i class="fa-solid fa-user-plus mx-1"></i>  Follow</button>
            }
          }
        
            const followUser = async (x) => {
              const res = await fetch("https://devlink-project.onrender.com/follow/add", 
                {method:'POST',
                body:JSON.stringify(
                  {
                    "following":x,
                    "userId":currentUser._id
                  }
                ),
                headers:{
                 'Content-Type': 'application/json'
                } ,
               
               
             });
        
             toast.success(`You are now following ${user.username}`);
          
              if (res.status === 500) {
                const data = await res.json();
                toast.success("Followed");
                console.log(data);
                fetchFollowData();
              }
            }
        
            const unfollow = async (x) => {
              const res = await fetch("https://devlink-project.onrender.com/follow/delete/"+ x, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              });
          
              if (res.status === 200) {
                const data = await res.json();
                toast.success(`You Unfollowed ${user.username}`);
                console.log(data);
                fetchFollowData();
              }
            }
        



  return (
    <div className='create-post-body vh-200'>
        <Header/>

        <div className="container py-md-5 container--narrow card-header">
          <div className="card">
            <div className="card-header">
              <div className="d-flex">
              <h2 >
 
 {displayprofile()}
 {user.username}
</h2>
<div className='ms-auto'>{follow(user.username)}</div>
              </div>
           

  <p className=' text-muted ' style={{marginTop:'-18px' , marginLeft:'43px'}}>{user.profile}</p>
  
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

export default UserProfile
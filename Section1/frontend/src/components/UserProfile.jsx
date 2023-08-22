import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';

const UserProfile = () => {

    const {username} = useParams();
    const[user, setuser] = useState([]);
    const[post, setpost] = useState([]);


    

    const fetchUserData = async () => {
        const res = await fetch("http://localhost:8000/user/getbyusername/"+username);
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
      const res = await fetch('http://localhost:8000/post/getbyusername/'+username);

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

        const displayPost = () => {
            //display posts of curentuser
          
          
                 
                    
                    return post.map((posts) => {
                      return (
                        <div className='card shadow-lg mt-4 p-2'  style={{border:'none' , backgroundColor:'wheat'}}>
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
                        
                         <div className=' text-black mx-3 pb-2 fw-light  '>{posts.content}</div>
                         <div className=' text-black mx-3 pb-2 fw-light  '><i className="fa-solid fa-heart " style={{color:'red'}}></i><>  </>  {posts.likes}</div>
               
               
                          
                        
                         </div>
                      )
                    })

          }

  





  return (
    <div className='create-post-body vh-200'>
        <Header/>

        <div className="container py-md-5 container--narrow card-header">
          <div className="card">
            <div className="card-header">
            <h2 >
  <img width={40} height={40} className='mx-2 rounded-circle' src={"http://localhost:8000/"+user.avatar} alt="" />
    {user.username}
  </h2>

  <p className=' text-muted ' style={{marginTop:'-20px' , marginLeft:'58px'}}>{user.profile}</p>
  
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

export default UserProfile
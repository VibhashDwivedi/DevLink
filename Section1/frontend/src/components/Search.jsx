import React, { useEffect, useState } from 'react'
import Header from './Header'
import Home from './Home';
import useUserContext from '../UserContext';
import { Link, NavLink } from 'react-router-dom';
import pic from '../images/searchUser.webp'
import { toast } from 'react-hot-toast';

const Search = () => {


  const [currenUser, setcurrenUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  )

  const [User, setUser] = useState([]);
  const [search, setsearch] = useState([]);
  const[followed,setfollowed]=useState(false);

  const fetchUserData = async () => {
    const res = await fetch("http://localhost:8000/user/getall");

    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      setUser(data);
      setsearch(data);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  //fetch follow data
  const fetchFollowData = async () => {
    const res = await fetch("http://localhost:8000/follow/getall", {
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



  const {LoggedIn} = useUserContext();
  if(!LoggedIn)
  return <Home/>

  const filterTournament = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = User.filter((user) => {
        return user.username.toLowerCase().startsWith(keyword.toLowerCase())||
        user.profile.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setsearch(results);
    } else {
      setsearch(User);
    }

  };

  const displayprofile = (avt) => {
    if(avt===""){
      return <img alt="profile"  height={320} 
      className="card-img-top"  src={pic}/>}
    else{
  return <img alt="profile"  height={320} 
  className="card-img-top"  src={"http://localhost:8000/"+avt} />
     }
   }

  //to ck if user is followed or not
  const follow = (x) => {
    if (followed.length > 0) {
      const result = followed.filter((user) => {
        return user.following === x && user.userId === currenUser._id;
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
      const res = await fetch("http://localhost:8000/follow/add", 
        {method:'POST',
        body:JSON.stringify(
          {
            "following":x,
            "userId":currenUser._id
          }
        ),
        headers:{
         'Content-Type': 'application/json'
        } ,
       
       
     });

     toast.success(`You are now following ${x}`);
  
      if (res.status === 500) {
        const data = await res.json();
        toast.success("Followed");
        console.log(data);
        fetchFollowData();
      }
    }

    const unfollow = async (x) => {
      const res = await fetch("http://localhost:8000/follow/delete/"+ x, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.status === 200) {
        const data = await res.json();
        toast.success(`You Unfollowed ${x}`);
        console.log(data);
        fetchFollowData();
      }
    }

     





const displayTournament = () => {
    if (search.length > 0) {
      return search.map((user) => {
        return (
         
         //to check if user is same as logged in user
          user.username===currenUser.username?null:

          <div className="col-md-4 col-10 mx-auto" key={user._id}>
            <div className="card my-3">
              <div className="card-body">
              <NavLink to={'/userprofile/'+user.username}>
                 {displayprofile(user.avatar)}
                 </NavLink> 
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">{user.profile}</p>
             <div className="d-flex">
             <Link to={'/userprofile/'+user.username} className="btn btn-primary">
                  View Profile
                </Link>
                <div className='ms-auto'>{follow(user.username)}</div>
              </div>   
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="container">
          <h1 className='text-center text-white'>No User Found</h1>
        </div>
      );
    }
  };





    





  return (
    <div className='create-post-body vh-200'>
      <div className="position-fixed w-100  z-1 top-0"><Header />
      
      </div>
        
        
       
                
      <div className="container   my-3 ">
          <div className="position-reative">
          <p className='display-2 text-center fw-bold text-white mt-5 pt-5 pb-2'>Search Users</p>
          <div className="d-flex " >
              
              <input type="text" className='form-control w-75 m-auto mb-2' onChange={filterTournament} 
               placeholder="Search Users by username or profile" aria-label="Search" />
               
               </div>
               </div>
          </div>
      

                  <div className='container'    >
       <div className='row mt-3' > {displayTournament()}</div>
        </div>

    </div>
  )
}




export default Search
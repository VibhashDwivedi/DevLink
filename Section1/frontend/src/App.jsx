import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Loggedin from './components/Loggedin';
import Error from './components/Error';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import ProfilePost from './components/ProfilePost';
import Chat from './components/Chat';
import ChatVisible from './components/ChatVisible';
import CreatePostChat from './components/CreatePostChat';
import PostChat from './components/PostChat';
import ProfilePostChat from './components/ProfilePostChat';
import MyProfile from './components/MyProfile';
import MyProfileChat from './components/MyProfileChat';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './UserContext';
import Search from './components/Search';
import EditPost from './components/EditPost';


function App() {
return (
    <div> 
    <Toaster position='top-center'/>
<BrowserRouter>
<UserProvider>
<Routes>
<Route path='/' element={<Home/>}></Route>
  <Route path='home' element={<Home/>}></Route>
  <Route path='feed' element={<Loggedin/>}></Route>
  <Route path='error' element={<Error/>}></Route>
  <Route path='createpost' element={<CreatePost/>}></Route>
  <Route path='post' element={<Post/>}></Route>
  <Route path='postchat' element={<PostChat/>}></Route>
  {/* <Route path='profilepost' element={<ProfilePost/>}></Route> */}
  <Route path='profilepostchat' element={<ProfilePostChat/>}></Route>
  {/* <Route path='chat' element={<Chat/>}></Route> */}
  <Route path='chatvisible' element={<ChatVisible/>}></Route>
  <Route path='createpostchat' element={<CreatePostChat/>}></Route>
  <Route path='myprofile' element={<ProfilePost/>}></Route>
  <Route path='myprofilechat' element={<MyProfileChat/>}></Route>
  <Route path='search' element={<Search/>}></Route>
  <Route path='editpost/:id' element={<EditPost/>}></Route>
  <Route path='*' element={<Error/>}></Route>

</Routes>
</UserProvider>
</BrowserRouter>

    </div>
    
  );
}

export default App;
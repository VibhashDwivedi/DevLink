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

function App() {
  return (
    <div> 
    
<BrowserRouter>
<Routes>
<Route path='/' element={<Home/>}></Route>
  <Route path='home' element={<Home/>}></Route>
  <Route path='feed' element={<Loggedin/>}></Route>
  <Route path='error' element={<Error/>}></Route>
  <Route path='createpost' element={<CreatePost/>}></Route>
  <Route path='post' element={<Post/>}></Route>
  <Route path='profilepost' element={<ProfilePost/>}></Route>
  <Route path='chat' element={<Chat/>}></Route>
  <Route path='chatvisible' element={<ChatVisible/>}></Route>
  <Route path='createpostchat' element={<CreatePostChat/>}></Route>

</Routes>
</BrowserRouter>

    </div>
    
  );
}

export default App;
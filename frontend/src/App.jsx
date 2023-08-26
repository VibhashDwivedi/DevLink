import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Loggedin from './components/Loggedin';
import Error from './components/Error';
import CreatePost from './components/CreatePost';

import ProfilePost from './components/ProfilePost';


import { Toaster } from 'react-hot-toast';
import { UserProvider } from './UserContext';
import Search from './components/Search';
import EditPost from './components/EditPost';
import UserProfile from './components/UserProfile';
import EditUser from './components/EditUser';


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
  <Route path='myprofile' element={<ProfilePost/>}></Route>
 
  <Route path='edituser' element={<EditUser/>}></Route>

 
  
  <Route path='search' element={<Search/>}></Route>
  <Route path='editpost/:id' element={<EditPost/>}></Route>
  <Route path='userprofile/:username' element={<UserProfile/>}></Route>
  <Route path='*' element={<Error/>}></Route>

</Routes>
</UserProvider>
</BrowserRouter>

    </div>
    
  );
}

export default App;
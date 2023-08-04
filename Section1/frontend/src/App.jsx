import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Loggedin from './components/Loggedin';
import Error from './components/Error';

function App() {
  return (
    <div> 
    
<BrowserRouter>
<Routes>
<Route path='/' element={<Home/>}></Route>
  <Route path='home' element={<Home/>}></Route>
  <Route path='feed' element={<Loggedin/>}></Route>
  <Route path='error' element={<Error/>}></Route>
</Routes>
</BrowserRouter>

    </div>
    
  );
}

export default App;
import Swal from "sweetalert2";

const { useContext } = require("react");
const { useState } = require("react");
const { createContext } = require("react");

//initialize context
 const UserContext = createContext();

 //create a provider
 export const  UserProvider = ({children}) => {
    // get user data from session and convert to js using 'JSON.parse()'
   // and store in state
     const [currentUser, setcurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('user'))
        
     );
   
     const [LoggedIn, setLoggedIn] = useState(currentUser !==null ? true : false);
     
     const logout = () => {
        //confirm logout
     
      
        sessionStorage.removeItem('user');
        setcurrentUser(null);
        setLoggedIn(false);
        Swal.fire({
            icon: 'success',
            title: 'Logged out successfully',
            text:'Thank you for visiting us!',
           
          })
         
     }

    return <UserContext.Provider value={{ LoggedIn, setLoggedIn, logout}}>
           {children}
    </UserContext.Provider>
 }

 const useUserContext = () => useContext(UserContext);

 export default useUserContext;
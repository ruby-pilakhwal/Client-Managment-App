
// import './App.css'
import Login from './components/Auth/Login'
import EmployDashboard from './components/Dashboard/EmployDashboard'
import { useContext, useEffect, useState } from "react"
import AdminDashboard from "./components/Dashboard/AdminDashboard"
import { getLocalStorage, setLocalStorage } from "./utils/localStorage"
import {AuthContext} from './context/AuthProvider';


function App() {
  
  // useEffect(()=>{
  //   getLocalStorage()
  // },)
 const [user,SetUser]=useState(null);
 const [userData,SetUserData]= useContext(AuthContext)
  // const userData=useContext(AuthContext)
  const [loggedInUserData,setLoggedInUserData]=useState(null);

// console.log(data);
useEffect(()=>{
 
  const loggedInUser= localStorage.getItem('loggedInUser');
  if(loggedInUser){
    const userData= JSON.parse(loggedInUser);
    SetUser(userData.role)
    setLoggedInUserData(userData.data);
  }
},[])

 const handlelogin=(email,password)=>{
   if(email=='admin@example.com' && password==='123'){
    SetUser('admin');
    localStorage.setItem('loggedInUser',JSON.stringify({role:'admin'}))
  }
    // else if(email=='ruby@me.com' && password==='123'){
    //   SetUser('employee');}
    else if(userData){
    const employee= userData.find((e)=> email==e.email && e.password==password) 
   
   if(employee){
    SetUser('employee')
    setLoggedInUserData(employee);
    localStorage.setItem('loggedInUser',JSON.stringify({role:'employee',data:employee}))
   }
  }
   else {
    alert("Invalid Credentials")
  }
}
 

 

   return (
    <>
    {!user?<Login handlelogin={handlelogin}/>:''}
    {user =='admin'?<AdminDashboard changeUser={SetUser}/>:(user=='employee'?<EmployDashboard changeUser={SetUser} data={loggedInUserData}/>:null ) }
     
      {/* <EmployDashboard/> */}
      {/* <AdminDashboard/> */}
      
    </>
  )
}

export default App

import React, { useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Layout from './router/Layout'
import {  Routes, Route } from "react-router-dom";
import Reports from './pages/Reports'
import PageNotFound from './pages/PageNotFound'
import Addexpenses from './pages/Addexpenses';
import UpdateExpenses from './pages/UpdateExpenses';
import Navbar from './components/Layouts/Navbar';
import Footer from './components/Layouts/Footer';
function App() {

  const [isLoggedin , setIsLoggedin] = React.useState(false)

useEffect(()=>{

  console.log(isLoggedin);
  
},[isLoggedin])

  if(!isLoggedin){
    return <Login setIsLoggedin={setIsLoggedin}/>
  }

  
  return (

  <div className='bg-[#dfe8f1]'>
    
  <Navbar/>
   <Routes>
    
          <Route index element={<Dashboard/>} />
          <Route path="analyse" element={<Reports/>} />
          <Route path="add" element={<Addexpenses/>} />
          <Route path='update' element={<UpdateExpenses/>}/>

        
        <Route path="*" element={<PageNotFound/>} />

      </Routes>
  <Footer />
      
  
</div>

  
   
  )} 





export default App
import React from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Layout from './router/Layout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reports from './pages/Reports'
import PageNotFound from './pages/PageNotFound'
import Addexpenses from './pages/Addexpenses';
import updateExpenses from './pages/updateExpenses';
function App() {

  const [isLoggedIn, setisLoggedIn] = useState(true)

  if(isLoggedIn){
  return (
  

<Router>
      <Routes>
        {/* Layout will always render Navbar, Footer, and Outlet for dynamic content */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard/>} />
          <Route path="reports" element={<Reports/>} />
        </Route>
        <Route path="*" element={<PageNotFound/>} />

      </Routes>
    </Router>


  
   
  )}
  return(
   < Login />
  )
}

export default App
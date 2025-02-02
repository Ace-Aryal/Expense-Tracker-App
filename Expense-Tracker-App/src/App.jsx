import React from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Layout from './router/Layout'
import {  Routes, Route } from "react-router-dom";
import Reports from './pages/Reports'
import PageNotFound from './pages/PageNotFound'
import Addexpenses from './pages/Addexpenses';
import updateExpenses from './pages/updateExpenses';
function App() {


  
  return (
  <div>
 
  
   <Routes>
        <Route index element={<Layout/>} >
          <Route imdex element={<Dashboard/>} />
          <Route path="reports" element={<Reports/>} />
          <Route path="add" element={<Addexpenses/>} />
        </Route>
        
        <Route path="*" element={<PageNotFound/>} />

      </Routes>
      
      
  
</div>

  
   
  )} 





export default App
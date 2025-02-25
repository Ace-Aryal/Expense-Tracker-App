import React, { useEffect, useMemo } from 'react'
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
import { calculateTotal , setBalance} from './features/expenseSlice';
import { useDispatch ,useSelector } from 'react-redux';
import { createDatasFromExpenseData } from './features/chartDataSlice';
function App() {
  const dispatch = useDispatch()
  const [isLoggedin , setIsLoggedin] = React.useState(false)
  useEffect(()=>{
    if(isLoggedin){
      dispatch(calculateTotal())
      dispatch(setBalance())
      const chartData = useSelector(state=> state.chartData.datas)
    dispatch(createDatasFromExpenseData(7))
      dispatch(createDatasFromExpenseData(30))
    }
     
  },[])
  

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
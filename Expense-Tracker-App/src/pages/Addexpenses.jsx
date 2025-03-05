import React, { useEffect , useState} from 'react'
import { useDispatch } from 'react-redux';
import { addItem } from '../features/expenseSlice';
import { useSelector } from 'react-redux';
import ExpenseItem from '../components/Expenses/ExpenseItem';
import { createDatasFromExpenseData } from '../features/chartDataSlice';
import { calculateTotal } from '../features/expenseSlice';
export const categoryList = ["Food","Transport","Lodging" , "Gadgets" , "Fees" , "Bills" ,"Miscellenous" ,"Others"]

const Addexpenses = () => {

const [today] = useState(new Date().toISOString().split("T")[0]);
  
// state variables  // need to fix this for optimization use a object instead
 const [expenseItem, setExpenseItem] =useState({
  id : new Date().getTime(),
  expense: "",
  amount : "",
  category : "Food",
  date : new Date().toISOString().split('T')[0],
  isMapped : false,
  addedDateFrame : {
    addedToDay : false ,
    addedToWeek : false ,
    addedToMonth : false ,
    addedToQuarter : false,
    addedToYear : false,
    addedToCalenderWeek : false ,
    addedToCalenderMonth : false, 
    addedToCalenderYear : false
   }
 })
 
  // dispatch function
  const dispatch = useDispatch()
  const fetchedData = useSelector((state) => state.expense.expenses)

 
  function handlechange(e){
    const {name, value} = e.target
    
    if(name === 'expense'){
      setExpenseItem(prevVal => {
        return {
          ...prevVal,
          expense : value
        }
      })
      return
    }
    if(name === 'amount'){
      setExpenseItem((prevVal => {
        return {
          ...prevVal,
          amount : value
        }
      }))
      return
    }
    if(name === 'date') {
      
      
      setExpenseItem((prevVal => {
        return {
          ...prevVal,
          date : value
        }
        
      }))

      return
    }
    if(name === 'category'){
      setExpenseItem((prevVal => {
        return {
          ...prevVal,
          category : value
        }
      }))
      return
  }
}


function handleSubmit(e){
  e.preventDefault()
  
  
  
  
   setExpenseItem(prevVal => {
    const id = Date.now()
    return {
      id,
      ...prevVal,
      
    }
   })
    
   
   
    
// upadate the redux store here using addExpense action
  dispatch(addItem(expenseItem))
   dispatch(calculateTotal())
   
  setExpenseItem({
    id : new Date().getTime(),
  expense: "",
  amount : "",
  category : "Food",
  date : new Date().toISOString().split('T')[0],
  isMapped : false,
  addedDateFrame : {
    addedToDay : false ,
    addedToWeek : false ,
    addedToMonth : false ,
    addedToQuarter : false,
    addedToYear : false,
    addedToCalenderWeek : false ,
    addedToCalenderMonth : false, 
    addedToCalenderYear : false
   }
  })

  

}

useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(fetchedData));
  dispatch(createDatasFromExpenseData(7))
  dispatch(createDatasFromExpenseData(30))

 
}, [fetchedData])

  




  return (
    <div className='flex flex-col  items-center w-[100vw] min-h-[85vh]' id='container'>
      <h1 className='text-center text-5xl mb-6 font-bold mt-[10vh]'>Add Expenses</h1>
      <form className='flex flex-col items-center bg-[#a7c6ed] 
      text-xl p-6 rounded-md px-10 shadow-gray shadow-xl text-center mb-14'
      onSubmit={handleSubmit}
      action="">
        <div id="input-grid" className='grid grid-cols-2 gap-4 gap-y-6 p-2  '>
        <div className='flex gap-2'>
          <label className='' htmlFor="expense">Expense</label>
          <input className='focus:outline-none  focus:ring-indigo-600 
        focus:ring-2 rounded' type="text" name="expense" id="expense" placeholder="Enter expense" required value={expenseItem.expense} onChange={(e) => { handlechange(e)}}/>
        </div>
        <div className='flex gap-2'>
          <label className='' htmlFor="amount" >Amount</label>
          <input className='focus:outline-none focus:ring-indigo-600 
        focus:ring-2 rounded' type="number" name="amount" id="amount" min={1} placeholder="Enter amount" required value={expenseItem.amount} onChange={(e) => { handlechange(e)}}/>
        </div>
        <div className='flex gap-2'>
          <label className='' htmlFor="date">Date</label>
          <input className='focus:outline-none focus:ring-indigo-600 
        focus:ring-2 rounded' type="date" name="date" id="date" max={today} required value={ExpenseItem.date} onChange={(e) => { handlechange(e)}}/>
        </div>
        <div className='flex gap-4'>
          <label className='' htmlFor="category">Category</label>
          <select className='focus:outline-none focus:ring-indigo-600 
          focus:ring-2 rounded' name="category" id="category" required value={ExpenseItem.category} onChange={(e) => { handlechange(e)}}> { /*do it dynamically using array of catgories */}
           {categoryList.map(item => (
              <option value={item}>{item}</option>
           ))}
          </select>
          </div>
          </div>
        <button className='mt-10 rounded bg-[#7950f2] hover:bg-indigo-400 p-1 px-2 text-white ' type="submit">Add Expense</button>
      </form>
      <h2 className='text-center text-xl font-semibold'>Recent Expenses</h2>
    <ExpenseItem expenseArray={fetchedData} showAllData={false} />
    </div>
  )
}

export default Addexpenses
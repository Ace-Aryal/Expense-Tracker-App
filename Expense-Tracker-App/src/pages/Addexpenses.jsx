import React from 'react'
import { useDispatch } from 'react-redux';
import { addItem } from '../features/expenseSlice';
import { useSelector } from 'react-redux';
import ExpenseItem from '../components/Expenses/ExpenseItem';
import { calculateTotal } from '../features/expenseSlice';
export const categoryList = ["food","transport","lodging" , "gadgets" , "fees" , "bills" ,"miscellenous" ,"others"]

const Addexpenses = () => {
// constant variables 
  
  
// state variables  // need to fix this for optimization use a object instead
 const [expense, setExpense] = React.useState('')
 const [amount, setAmount] = React.useState('')
  const [date, setDate] = React.useState()
  const [category, setCategory] = React.useState('food')
 
  // dispatch function
  const dispatch = useDispatch()
  const fetchedData = useSelector((state) => state.expense.expenses)

 
  function handlechange(e){
    const {name, value} = e.target
    console.log(name, value);
    
    if(name === 'expense'){
      setExpense(value)
      return
    }
    if(name === 'amount'){
      setAmount(value)
      return
    }
    if(name === 'date') {
      
      
      setDate(value)
      return
    }
    if(name === 'category'){
      setCategory(value)
      return
  }
}


function handleSubmit(e){
  e.preventDefault()
  const id = Date.now()
  const expenseObj = {
    id ,
    expense,
    amount,
    date,
    category ,
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
    }
// upadate the redux store here using addExpense action
  dispatch(addItem(expenseObj))
   dispatch(calculateTotal())
  setExpense('')
  setAmount('')
  setDate('')
  setCategory('')
  console.log(fetchedData);
  

}
  




  return (
    <div className='flex flex-col  items-center w-[100vw] min-h-[85vh]' id='container'>
      <h1 className='text-center text-3xl mb-6 font-bold mt-[10vh]'>Add Expenses</h1>
      <form className='flex flex-col items-center bg-[#a7c6ed] 
      text-xl p-6 rounded-md px-10 shadow-gray shadow-xl text-center mb-14'
      onSubmit={handleSubmit}
      action="">
        <div id="input-grid" className='grid grid-cols-2 gap-4 gap-y-6 p-2  '>
        <div className='flex gap-2'>
          <label className='' htmlFor="expense">Expense</label>
          <input className='focus:outline-none  focus:ring-indigo-600 
        focus:ring-2 rounded' type="text" name="expense" id="expense" placeholder="Enter expense" required value={expense} onChange={(e) => { handlechange(e)}}/>
        </div>
        <div className='flex gap-2'>
          <label className='' htmlFor="amount" >Amount</label>
          <input className='focus:outline-none focus:ring-indigo-600 
        focus:ring-2 rounded' type="number" name="amount" id="amount" min={1} placeholder="Enter amount" required value={amount} onChange={(e) => { handlechange(e)}}/>
        </div>
        <div className='flex gap-2'>
          <label className='' htmlFor="date">Date</label>
          <input className='focus:outline-none focus:ring-indigo-600 
        focus:ring-2 rounded' type="date" name="date" id="date" required value={date} onChange={(e) => { handlechange(e)}}/>
        </div>
        <div className='flex gap-4'>
          <label className='' htmlFor="category">Category</label>
          <select className='focus:outline-none focus:ring-indigo-600 
          focus:ring-2 rounded' name="category" id="category" required value={category} onChange={(e) => { handlechange(e)}}> { /*do it dynamically using array of catgories */}
           {categoryList.map(item => (
              <option value={item}>{item}</option>
           ))}
          </select>
          </div>
          </div>
        <button className='mt-10 rounded bg-indigo-400 p-1 px-2 text-white ' type="submit">Add Expense</button>
      </form>
      <h2 className='text-center text-xl font-semibold'>Recent Expenses</h2>
    <ExpenseItem expenseArray={fetchedData} showAllData={false} />
    </div>
  )
}

export default Addexpenses
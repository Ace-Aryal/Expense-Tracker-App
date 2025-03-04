import React, { useEffect } from 'react'
import ExpenseItem from '../components/Expenses/ExpenseItem'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { categoryList } from './Addexpenses'
import PaginationButton from '../components/UI/PaginationButton'
const updateExpenses = () => {

  const fetchedData = useSelector((state) => state.expense.expenses)
  const [filterStateFLag , setFilterStateFlag] = useState({
    isCatagoryFilterOn : false,
    isDateFilterOn : false ,
    isSearchboxOn : false
  }) 
  const [filterValues , setFilterValues] = useState({
    search_value : "",
    catagory :"all",
    date : ""
  })

  

  // returning expenseData based on filters
const [filteredData , setFilteredData ] = useState (fetchedData)
const [pageNumber , setPageNumber] = useState(1)
const [finalDisplayData , setFinalDisplayData] = useState(filteredData)
const [numberOfPages, setNumberOfPages] = useState(Math.ceil(filteredData.length/8))
function handleFilter () {
const {isCatagoryFilterOn, isDateFilterOn ,isSearchboxOn} = filterStateFLag
console.log("cat" , isCatagoryFilterOn , "date" , isCatagoryFilterOn ,"search" ,isSearchboxOn);
console.log("cat" , filterValues.catagory , "date" , filterValues.date , "search" , filterValues.search_value)
const {search_value , catagory , date} = filterValues
if (isCatagoryFilterOn && isDateFilterOn && isSearchboxOn) {
 const filteredData = fetchedData.filter(expense => {
  if(expense.category === catagory && expense.date === date && (expense.date.includes(search_value) ||
   expense.category.includes(search_value) || expense.amount.includes(Number(search_value))|| expense.expense.includes(search_value) )){
       return expense
  }

  
 })
 setFilteredData(filteredData)
 return
}

if (isCatagoryFilterOn  && isSearchboxOn) {
  const filteredData = fetchedData.filter(expense => {
   if(expense.category === catagory&& (expense.date.includes(search_value) ||
    expense.category.includes(search_value) || expense.amount.includes(Number(search_value))|| expense.expense.includes(search_value) )){
        return expense
   }
 
   
  })
  setFilteredData(filteredData)
  return
 }

 if ( isDateFilterOn && isSearchboxOn) {
  const filteredData = fetchedData.filter(expense => {
   if(expense.date === date && (expense.date.includes(search_value) ||
    expense.category.includes(search_value) || expense.amount.includes(Number(search_value))|| expense.expense.includes(search_value) )){
        return expense
   }
 
   
  })
  setFilteredData(filteredData)
  return
 }

 if (isCatagoryFilterOn && isDateFilterOn  ) {
 const filteredData = fetchedData.filter(expense => {
   if(expense.category === catagory && expense.date === date){
        return expense
   }
 
   
  })
  setFilteredData(filteredData)
  return
 }

 if (isCatagoryFilterOn) {
  const filteredData = fetchedData.filter(expense => {
   if(expense.category === catagory ){
        return expense
   }
 
   
  })
  setFilteredData(filteredData)
  return
 }

 if (isDateFilterOn ) {
 const filteredData = fetchedData.filter(expense => {
   if( expense.date === date){
        return expense
   }
 
   
  })
  setFilteredData(filteredData)
  return
 }

 if (isSearchboxOn) {
  const filteredData = fetchedData.filter(expense => {
   if((expense.date.includes(search_value) ||
    expense.category.includes(search_value) || expense.amount.includes(Number(search_value))|| expense.expense.includes(search_value) )){
        return expense
   }
 
   
  })
  setFilteredData(filteredData)
  return
 }
 setFilteredData(fetchedData)


}

function handleInputChange (e) {
    const {value} = e.target
    setFilterValues(prevvalue =>{
      return {...prevvalue,search_value:value}})
      
    if (value !== "") {
      setFilterStateFlag(prevValue => {
        return {
          ...prevValue,
          isSearchboxOn : true
        }
      })
      return
    }
    setFilterStateFlag(prevValue => {
      return {
        ...prevValue,
        isSearchboxOn : false
      }
    })

  }

  function handleCatagoryChange(e) {
    const {value} = e.target
    console.log("cat" ,value);
    console.log("here ");
    
    
    
    setFilterValues(prevValue => {
      return {
        ...prevValue,
        catagory : value
      }
    })
   
      if (value === "all") {
        setFilterStateFlag(prevValue => {
          return {
            ...prevValue,
            isCatagoryFilterOn : false
          }
        })
        return
      }
      setFilterStateFlag(prevValue => {
        return {
          ...prevValue,
          isCatagoryFilterOn : true,
        }
      })
   
  }

  function handleDateChange (e) {
    const {value} = e.target
    setFilterValues(prevvalue =>{
      return {...prevvalue,
        date:value}})
    if (value === "") {
      setFilterStateFlag(prevValue => {
        return {
          ...prevValue,
          isDateFilterOn : false
        }
      })
      return
    }
    setFilterStateFlag(prevValue => {
      return {
        ...prevValue,
        isDateFilterOn : true
      }
    })

    

  }

  function handlePagination() {
      const itemsPerPage = 8
      setNumberOfPages(Math.ceil(filteredData.length/8))
      
      
      const startIndex = (pageNumber-1)*itemsPerPage
      const lastIndex = startIndex + itemsPerPage
      const finalData = filteredData.slice(startIndex , lastIndex)
      setFinalDisplayData(finalData)
    
  }
  
  useEffect(()=> { 
    handleFilter()

   
  },[filterStateFLag])

  useEffect(()=> { // if the filtered values change paination is called 
    handlePagination()
  },[filteredData , pageNumber])

 useEffect(()=> { // if any data is modified on state , syncing it with ui 
  setFilteredData(fetchedData)
  handleFilter()
  
 },[fetchedData])
  
useEffect(()=> {
  console.log("pageNum" , pageNumber);
  
},[pageNumber])

  return (
    
    <div className='flex flex-col mt-12 mb-2 items-center  min-h-[70vh]'>
      <h1 className='font-bold text-5xl text-center my-4 '>Track And Update Expenses</h1>
      <div id="update-container" className='sm:w-[60vw] w-[50%] mt-4 font-semibold mb-12'>
        <div id="update-options-container" className='flex justify-around gap-1'>
          <div className='flex flex-col justify-between w-1/3 items-center'>
          <label htmlFor="search-box">Search Items</label>
          <input type="text"
         
          onChange={e=>{handleInputChange(e)
                
                  }
          }
          value={filterValues.search_value}
          name="search-box" id="search-box" placeholder='Search By Name, Amount ,Catagory Or Date'
           className='outline-[1.35px] outline-indigo-900 px-2 py-1 rounded ' />
           </div>
           <div className='flex flex-col items-center gap-1 justify-between '><label htmlFor='catagory-search' >Filter By Catagory</label>
          <select name="catagory-search" 
          value={filterValues.catagory}
          onChange={ e=> {
            e.preventDefault()
            handleCatagoryChange(e)
                   
                  }
          }
          id="catagory-search" className='outline-[1.35px] w-full outline-indigo-900 px-2 py-1 rounded '>
          <option value="all">All</option>
          {categoryList.map(catagory => {
            return <option value={catagory}>{catagory}</option>
          })}
          </select>
          </div>
          <div className='flex flex-col items-center gap-1 justify-between'>
            <label htmlFor="search-date">Filter By Date</label>
          <input type="date" 
          value={filterValues.date}
          onChange={e => {handleDateChange(e)
                  
                  }
          }
          name="search-date" id="search-date" className='outline-[1.35px] outline-indigo-900 px-2 py-1 rounded ' />
        </div>
        </div>
     < ExpenseItem expenseArray={finalDisplayData} showAllData={true} />
     <div className='flex justify-between '>
      <span>Showing {numberOfPages < 1 ? 0 : pageNumber} of {numberOfPages} entries</span>
      <div>
      <PaginationButton action="prev" pageNumber={pageNumber} numberOfPages={numberOfPages} setPageNumber={setPageNumber} handlePagination={handlePagination}/>    
      <PaginationButton action="next" pageNumber={pageNumber} numberOfPages={numberOfPages} setPageNumber={setPageNumber} handlePagination={handlePagination}/>
      </div>
      
     </div>
    </div>
    </div>
  )
}

export default updateExpenses
import React, { useEffect } from 'react'

function PaginationButton({action , pageNumber , setPageNumber , numberOfPages}) {

    
function handlePageChange(){
    if(action === "prev") {
        setPageNumber(prevVal =>{
            if (pageNumber <= 1) {
                return 1
            }
          return  prevVal-1
        })
        
        
        return
    }
    setPageNumber(prevVal => {
        
        
        if (pageNumber >= numberOfPages) {
            return numberOfPages
        }

        return prevVal+1
})
}


  return (
    <button 
    onClick={handlePageChange}
    className='bg-orange-600 outline-1 mx-1 px-2 py-0.5 rounded text-white hover:bg-orange-400 transition-all'>{action}</button>
  )
}

export default PaginationButton
import React from 'react'

function Footer() {
  return (
    <div className='w-full bg-[#a7c6ed] bottom-0.5 text-center  text-white'>
      <p>&copy; {new Date().getFullYear()} Dipesh Aryal. All rights reserved.</p>
    </div>
  )
}

export default Footer
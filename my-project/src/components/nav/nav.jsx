import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const navigate = useNavigate();
  return (
    <div className='h-[94vh] bg-[#0c0c0c] w-1/4 rounded-xl flex flex-col justify-center gap-5 hover:scale-105 duration-500'>
      <div className='text-center text-white bg-black hover:bg-[#ff38f5] hover:text-black rounded-xl p-3 font-black w-72 self-center hover:cursor-pointer hover:scale-105 duration-300' onClick={()=>navigate('/dashboard')}>Dashboard</div>
      <div className='text-center bg-black text-white hover:bg-[#30ffa9] hover:text-black rounded-xl p-3 font-black w-72 self-center hover:cursor-pointer hover:scale-105 duration-300' onClick={()=>navigate('/tasks')}>Tasks</div>
      
    </div>
  )
}

export default Nav

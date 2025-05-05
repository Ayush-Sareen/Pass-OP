import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 fixed w-full top-0'>
      <div className="mycontainer h-10 flex justify justify-between items-center py-5 text-white">
        <div className="logo text-2xl">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </div>
        {/* <ul>
          <li className='flex gap-4'>
            <a href="/" className='hover:font-bold'>Home</a>
            <a href="#" className='hover:font-bold'>Contact</a>
            <a href="#" className='hover:font-bold'>About</a>
          </li>
        </ul> */}
        <button className='text-white border border-white bg-green-900 flex justify-center items-center rounded-full cursor-pointer hover:bg-green-700'>
          <span className='text-xl px-1'>GitHub</span>
          <img className='invert w-8 rounded-full'  src="images/github.png" alt="github logo" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar

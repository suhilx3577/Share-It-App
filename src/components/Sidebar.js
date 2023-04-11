import React from 'react'
import { NavLink , Link } from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import {IoIoArrowForward} from 'react-icons/io'

import logo from '../assets/logo.png'


const Sidebar = ( user, closeToggle) => {

  const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
  const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-black transition-all duration-200 ease-in-out capitalize'

  // console.log(user?.user?.userName,'this is from sideBar')

  const handleCloseSidebar = () => {
    if(closeToggle) closeToggle(false);  
  }

  const categories = [
    {
      name:'Animals',
    },
    {
      name:'Coding',
    },
    {
      name:'Aesthetic',
    },
    {
      name:'Happy-Vides',
    },
    {
      name:'Happy-Vibes',
    }
  ]


  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link 
        to="/"
        className='flex px-5 gap-2 pt-1 w-190 items-center mb-2'
        onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className=''/>
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
          to="/"
          onClick={handleCloseSidebar}
          className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}
          >
            <RiHomeFill/>
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover Catergories</h3>
          {
            categories.slice(0,categories.length-1).map((category)=>(
              <NavLink
              onClick={handleCloseSidebar}
              to={`/category/${category.name}`}
              className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}
              key={category.name}>
                {category.name}
              </NavLink>
            ))
          }
        </div>
      </div>
      {user && (
        <Link 
        to={`user-profile/${user?.user?._id}`}
        className='flex my-5 mb-3 gap-2 p-2 items-center rounded-lg shadow-lg mx-3'
        onClick={handleCloseSidebar}
        >
          <img src={user?.user?.imageUrl} alt="profile-picture" className='w-10 h-10 rounded-full'/>
          <p>{user?.user?.userName}</p>
        </Link>
        

      )}

    </div>
  )
}

export default Sidebar
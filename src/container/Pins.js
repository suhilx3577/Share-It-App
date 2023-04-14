import React , {useEffect, useState} from 'react'
import {Routes,Route} from 'react-router-dom'


import {Navbar, Feed, Detail, CreatePin} from "../components"
import Search from '../components/Search'

const Pins = (user) => {
  const [search,setSearch] = useState('')


  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchTerm={search} setSearchTerm={setSearch} user={user}/>
      </div>
      <div className='h-full'>

        <Routes>
          <Route path="/*" element={<Feed/>}/>
          <Route path="/category/:categoryId" element={<Feed/>}/>
          <Route path="/pin-detail/:pinId" element={<Detail user={user}/>}/>
          <Route path="/create-pin" element={<CreatePin user={user}/>}/>
          <Route path="/search" element={<Search searchTerm={search} setSearchTerm={setSearch}/>}/>


        </Routes>

      </div>
    </div>
  )
}

export default Pins
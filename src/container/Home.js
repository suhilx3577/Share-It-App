import React , {useState , useRef, useEffect}from 'react';
import {HiMenu} from 'react-icons/hi';
import{AiFillCloseCircle} from 'react-icons/ai';
import { Link, Route, Routes} from 'react-router-dom'
import {Sidebar , UserProfile} from '../components'
import { client } from '../client';
import {userQuery} from '../utils/data'
import logo from '../../public/logo.png'
import Pins from './Pins';
import { fetchUser } from '../utils/fetchUser';



const Home = () => {

  const [toggleSideBar, setToggleSideBar] = useState(false)
  const userInfo = fetchUser();
  const scrollRef = useRef(null)


  const [user,setUser] = useState(null)

  useEffect(()=>{
    scrollRef.current.scrollTo(0,0)
  }, [])
  
  useEffect(()=>{
    const query = userQuery(userInfo?.sub);
    client.fetch(query)
    .then((data)=>{
      setUser(data[0]);
    })

  },[]);



  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'> 
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user==null ? null : user}/>
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between shadow-md'>

        <HiMenu fontSize={40} className='cursor-pointer' onClick={()=>setToggleSideBar(true)}/>
        <Link to="/" >
          <img src={logo} alt='logo' className='w-28'/>
        </Link>
        <Link to={`user-profile/${user?._id}`} >
          <img src={user?.imageUrl} alt='logo' className='w-10 h-10 rounded-full'/>
        </Link>

        </div>
      {toggleSideBar && ( 
        <div className='fixed w-4/5 bg-white h-screen overflow-y-auto z-10 shadow-md animate-slide-in'>
          <div className='absolute w-full flex  justify-end items-center p-2'>
            <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={()=>setToggleSideBar(false)} />
          </div>
          <div>
             <Sidebar user={user && user} closeToggle={setToggleSideBar}/>
          </div>
        </div>
      )}

      </div>

      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile/>}/>
          <Route path="/*" element={<Pins user={user && user}/>}/>
        </Routes>
      </div>

    </div>
  )
}

export default Home
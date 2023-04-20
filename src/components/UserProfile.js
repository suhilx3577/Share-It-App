import React,{useState,useEffect} from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams,useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'

import { userQuery, userCreatedPinQ, userSavedPinQ } from '../utils/data'

import {client, urlFor} from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { urlFor } from '../client'


const UserProfile = () => {

  const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full width-20 outline-none mr-2'
  const notActiveBtnStyles = 'bg-primary mr-4 p-2 text-black font-bold rounded-full width-20 outline-none mr-2'

  
  const randomImage='https://source.unsplash.com/1600x900/?technology'
  
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  
  const [text, setText] = useState('Created');
  const [active, setActive] = useState('Created')
  
  const navigate = useNavigate();
  
  const {userId} = useParams();
  // console.log(userId)
  
  useEffect(() => {
    const query = userQuery(userId);
    
    client.fetch(query)
    .then((data)=>{
      setUser(data[0]);
    })
  }, [userId])


  useEffect(()=>{
    if(text=='Created'){
      const createdPinQuery = userCreatedPinQ(userId)
      client.fetch(createdPinQuery)
      .then((data)=>{
        setPins(data)
      })

    }
    else{
      const savedPinQuery = userSavedPinQ(userId)
      client.fetch(savedPinQuery)
      .then((data)=>{
        setPins(data)
      })

    }

  },[text,userId])


  const handleLogout = () =>{
    localStorage.clear();
    googleLogout();
    navigate('/login')
  }
  
  if(!userId){
    return <Spinner m={'Loading Profile'}/>
  }

  // console.log(user,'user-profile')
  return (
      <div className="relative pb-2 h-full justify-center items-center">
        <div className='flex flex-col pb-5'>
          <div className='relative flex flex-col mb-7'>
            <div className='flex flex-col justify-center items-center'>
              <img src={randomImage} alt="Banner-image"
              className='w-full h-370 2xl:h-510 shadow-lg object-cover' />
              <img src={user?.imageUrl} alt="user-image"
              className='rounded-full w-20 h-20 shadow-xl object-cover' />
              <h1 className='font-bold text-3xl text-center mt-3'>
                {user?.userName}
              </h1>
              <div className="absolute top-0 z-1 right-0 p-2">
                { 
                userId ===user?._id &&
                 (
                  <button
                  onClick={()=>{
                    handleLogout();
                  }}
                  className='flex item-center justify-center gap-2 bg-white p-2 rounded-full cursor-pointer outline-none shadow-lg'>
                    <p>Logout</p>

                    <AiOutlineLogout color='red' fontSize={21}/>
                  </button>
                )}
              </div>
            </div>
            <div className="text-center mb-7">
              <button type='button'
              onClick={(e)=>{
                setText(e.target.textContent)
                setActive('Created')
              }}
              className={`${ active=== 'Created' ? activeBtnStyles : notActiveBtnStyles}`}
              >
                Created
              </button>
              <button type='button'
              onClick={(e)=>{
                setText(e.target.textContent)
                setActive('Saved')
              }}
              className={`${ active=== 'Saved' ? activeBtnStyles : notActiveBtnStyles}`}
              >
                Saved
              </button>
            </div>
            {
              pins?.length ?(
                <div className='px-2 '>
                  <MasonryLayout pins={pins}/>
                </div>
              ):
              (
                <div className="flex justify-center font-bold w-full items-center mt-2 text-xl">
                  No Pins Found
                </div>
              )
            }
          </div>
        </div>
      </div>
  )
}

export default UserProfile
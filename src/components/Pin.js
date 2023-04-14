import React, { useState } from 'react'
import { urlFor } from '../client'
import {Link, useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import {MdDownloadForOffline} from 'react-icons/md'

import {client} from '../client'
import { fetchUser } from '../utils/fetchUser'

const Pin = ({pin}) => {

  const [postHovered,setPostHovered] = useState(false)
  const [savedPost, setSavedPost] = useState(false)
  const userInfo = fetchUser()

  const {_id ,destination , postedBy} = pin
  // console.log(postedBy)

  const navigate = useNavigate()
  
  let isSaved = pin?.save?.filter((item)=> item?.postedBy?._id === userInfo?.sub)

  isSaved = isSaved?.length > 0 ? isSaved :[];

  const deletePin =(id) =>{
    return(
      client
      .delete(id)
      .then(()=>{
        window.location.reload()
      })
    )
  }


  const savePin =(id) => {
    if(isSaved?.length === 0){
      setSavedPost(true);
      client
      .patch(id)
      .setIfMissing({save:[]})
      .insert('after','save[-1]',[{
        _key:uuidv4(),
        userId:userInfo?.sub,
        postedBy:{
          _type: 'postedBy',
          _ref:userInfo?.sub
        }
      }])
      .commit()
      .then(()=>{
        window.location.reload();
        setSavedPost(false);
      })
    }
  }

  return (
    <div className='m-2'>
      <div 
      onMouseEnter={()=> setPostHovered(true)}
      onMouseLeave={()=> setPostHovered(false)}
      onClick={()=>navigate(`/pin-detail/${_id}`)}
      className='relative curson-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
      <img className='rounded lg w-full ' alt='user-post' src={(urlFor(pin?.image?.asset?.url).width(250).url())}/>
      {
        postHovered && (
          <div className='absolute top-0 w-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
          style= {{height:'100%'}}
          >
            <div className='flex items-center justify-between'>
              <div className='felx gap-2'>
                <a
                href={`${pin?.image?.asset?.url}?dl=`}
                  download
                  onClick={(e)=>e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded-full items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                  >
                  <MdDownloadForOffline/>
                </a>
              </div>
              {isSaved?.length !==0 ? ( 
                <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                  {pin?.save?.length} Saved
                </button>
              ) : ( 
                <button
                onClick={(e)=>{
                  e.stopPropagation();
                  savePin(_id)
                }}
                type="button"
                className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  {pin?.save?.length }  {savedPost ? 'Saving' : 'Save'}
                </button>
              )
              }
            </div>
            <div className='flex justify-between items-center gap-2 w-full'
            >
              {destination && (
                <a href={destination}
                onClick={(e)=>{
                  e.stopPropagation()
                }}
                target="_blank"
                rel="noreferrer"
                className= ' h-5 bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70  hover:opacity-100 hover:shadow-md'>
                  <BsFillArrowRightCircleFill/>
                  {/* {destination.length>20 ? destination.slice(8,20) : destination.slice(5)} */}
                </a>
              )}
              {postedBy?._id === userInfo?.sub &&(
                <button
                className=' h-5 flex items-center bg-white p-2 opacity-70 hover:opacity-100 text-dark rounded-3xl font-bold px-5 py-1 text-base hover:shadow-md outline-none'
                type="button"
                onClick={(e)=>{
                  e.stopPropagation();
                  deletePin(_id);
                }}
                >
                <AiTwotoneDelete/>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link 
      to={`user-profile/${postedBy?._id}`}
      className="flex gap-2 mt-2 items-center"
      >
        <img
        className='w-6 h-6 rounded-full object-cover'
        src={postedBy?.imageUrl}
        alt='user-profile'
        />
        <p className='font-semibold capitalize'>{postedBy?.userName}</p>
      </Link>
    </div>
  )
}

export default Pin
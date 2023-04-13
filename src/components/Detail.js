import React from 'react'
import { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import{ v4 as uuidv4 } from 'uuid'
import {HiDownload} from 'react-icons/hi'
import {client, urlFor} from '../client'
import MasonryLayout from './MasonryLayout'
import {pinDetailQuery, morePinQuery} from '../utils/data'

import {BiArrowFromLeft} from 'react-icons/bi'

import Spinner from './Spinner'
// import {MdDownloadForOffline} from 'react-icons/md'


const Detail = ({user}) => {
  // console.log(user?.user,'detail')
  
  const  [pins, setPins] = useState(null)
  const [pinDetail,setPindetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)

  const {pinId} = useParams();


  const fetchPinDetails = () =>{
    let query = pinDetailQuery(pinId)

    if(query){
      client.fetch(query)
      .then((data)=>{
        // console.log(data)
        setPindetail(data[0]);

        if(data[0]){
          query =morePinQuery(data[0]);
          client.fetch(query)
          .then((res)=>{
            setPins(res)
          }); 
        }
      })
    }
  }
  
  useEffect(()=>{
    fetchPinDetails();
  },[pinId])

  const addComment =() =>{

    if(comment){
      setAddingComment(true);

      client.patch(pinId)
      .setIfMissing({comments:[]})
      .insert('after','comments[-1]',[{
        comment,
        _key:uuidv4(),
        postedBy:{
          _type:'postedBy',
          _ref:user?.user?._id
        }
      }]).commit()
      .then(()=>{
        fetchPinDetails();
        setComment('');
        setAddingComment(false)
      })
    }
  }
  // console.log(pins,'pins')


  if(!pinDetail) return <Spinner m={'Loading Pin'}/>


  return (
    <>
    <div className="flex xl:flex-row flex-col m-auto bg-white " style={{maxWidth:'1500px' , borderRadius:'32px'}}>
      <div className="flex justify-center items-center md:items-start flex-initial ">
        <img src={pinDetail?.image && urlFor(pinDetail?.image).url()}
        className='rounded-t-2xl rounded-b-lg'
        alt='user-post'
        />
      </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
              href={`${pinDetail?.image?.asset?.url}?dl=`}
              download
              onClick={(e)=>e.stopPropagation()}
              className='h-8 w-8 hover:shadow-md flex items-center justify-center rounded-full'
              >
                <HiDownload/>
              </a>
            </div>
            <a href={pinDetail?.destination} 
            className='hover:underline'
            target='_blank'
            rel='noreferrer'
            >
              {pinDetail.destination.slice(8)}
            </a>
        </div>
        <div >
          <h1 className="text-4xl break-wrods mt-3">
            {pinDetail.title}
          </h1>
          <p className='mt-3 '>
            {pinDetail.about}
          </p>
        </div>
        <Link 
        to={`user-profile/${pinDetail.postedBy?._id}`}
        className="flex gap-2 mt-5 items-center bg-white rounded-lg">
          <p className='h-6 w-6 hover:shadow-md flex items-center justify-center  rounded-full'><BiArrowFromLeft/></p>
          <img
          className='w-6 h-6 rounded-full'
          src={pinDetail?.postedBy?.imageUrl}
          alt='user-profile'
          />
        <p className='font-semibold capitalize hover:underline'>{pinDetail.postedBy?.userName}</p>
      </Link>
      <h2 className='mt-5 font-bold text-2xl'> Comments</h2>
      <div className="max-h-270 overflow-y-auto">

        {pinDetail && pinDetail?.comments?.map((comment,i)=>(
          <div className='flex gap-2 mt-5 items-center bg-white rounded-lg'
          key={i}>
            <img src={comment.postedBy?.imageUrl} alt="user-profile"
            className='w-10 h-10 rounded-full cursor-pointer' />
            <div className="flex flex-col ">
              <p className="font-bold">{comment.postedBy?.userName}</p>
              <p >{comment.comment}</p>

            </div>
          </div>
        ))}

      </div>
      <div className="flex flex-wrap mt-6 gap-3">
      <Link 
        to={`user-profile/${pinDetail.postedBy?._id}`}>
          <img
          className='w-10 h-10 rounded-full cursor-pointer'
          src={user?.user?.imageUrl} //should be going to use profile edit it
          alt='user-profile'
          />
      </Link>
      <input type="text" className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300" 
      placeholder='Add Comment'
      value={comment}
      onChange={(e)=>{
        setComment(e.target.value)
      }}/>
      <button type='button'
      className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
      onClick={addComment}>
        {addingComment ? 'Posting Comment': 'Post'}
      </button>
      </div>
      </div>
    </div>

    {pins?.length>0 ? (
      <>
        <h2 className='text-center font-bold text-2xl mt-8 mb-4'>More Like This</h2>
        <MasonryLayout pins={pins}/>
      </>
    ) : (
      <Spinner m={'Loading More Pins'}/>
    ) }
    </>
  )
}

export default Detail
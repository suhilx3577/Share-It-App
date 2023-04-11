import React from 'react'
import { urlFor } from '../client'

const Pin = ({pin}) => {
  console.log(pin?.image?.asset?.url,' from PIN ')
  return (
    <div className='w-250'>
      <img className='rounded lg w-full ' alt='user-post' src={pin?.image?.asset?.url}/>
    </div>
  )
}

export default Pin
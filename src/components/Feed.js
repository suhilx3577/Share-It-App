import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { searchQuery, feedQuery } from '../utils/data';

import {client} from '../client'
import MasonryLayout from './MasonryLayout.js';
import Spinner from './Spinner'


const Feed = () => {


  const [loading, setLoading] = useState(true);
  const [pins,setPins] = useState();
  const param = useParams()
  const {categoryId} = param

  useEffect(()=>{
    if(!categoryId){
      client.fetch(feedQuery).then((data)=>{
        setPins(data);
      })
      .catch(e=>{
        console.log(e)
      });
    }
    else{
      const query = searchQuery(categoryId);
      client.fetch(query).then((data)=>{
        setPins(data)
      });
    }
  },[categoryId])

  // console.log(pins)

  return (
    <div>{pins?.length==0? <Spinner m={'No Pins In this Category. Be the First One to Upload'}/> : <MasonryLayout pins={pins}/>}</div>
    // <div>Feed</div>
  )
}

export default Feed
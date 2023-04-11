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

  // if(loading) return <Spinner />

  // useEffect=(()=>{
  //   setLoading(true)

  //   if(categoryId){
  //     const query = searchQuery(categoryId);
  //     client.fetch(query).then((data)=>{
  //       setPins(data)
  //       setLoading(false)
  //     });
  //   }
  //   else{
  //     client.fetch(feedQuery).then((data)=>{
  //       setPins(data)
  //       setLoading(false)
  //     });
  //   }

  // },[categoryId]);

  useEffect(()=>{
    client.fetch(feedQuery).then((data)=>{
      setPins(data);
    })
    .catch(e=>{
      console.log(e)
    });

  },[categoryId])


  return (
    <div>{pins==null? <Spinner/> : <MasonryLayout pins={pins}/>}</div>
    // <div>Feed</div>
  )
}

export default Feed
import React,{ useState, useEffect } from 'react';

import {Spinner} from '../components';
// import MasonryLayout from './MasonryLayout.js';



const Search = ({search}) => {
  const [pins,setPins] = useState(null)
  const [loading,setLoading] = useState(true);

  return (
    <div>
      {loading && <Spinner m={'Searhing For the Pins'}/>}
      {pins?.length!==0 && <MasonryLayout pins={pins}/>}
      {pins?.length==0 && search!=='' && !loading && 
      <div className='mt-10 text-center text-xl'>
        No Pins Found
      </div>
      }
      </div>
  )
}

export default Search
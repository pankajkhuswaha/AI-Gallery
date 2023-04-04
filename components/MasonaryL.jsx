import React from 'react'
import Masonry from 'react-masonry-css'
import RenderdCard from './RenderdCard'

const breakpointObj ={
  default :4,
  3000:6,
  2000:5, 
  1200:3,
  1000:2,
  500:1,
}

const MasonaryLayout = ({posts}) => {
    console.log(posts)
  return (
    <>
      {console.log(posts)}
    <Masonry className='flex w-full' breakpointCols={breakpointObj}>
     <RenderdCard data={posts} />   
    </Masonry>
    </>
  )
}

export default MasonaryLayout;
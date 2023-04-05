import React from 'react'
import Masonry from 'react-masonry-css'
import RenderdCard from '../components/RenderdCard'

const breakpointObj ={
  default :4,
  3000:6,
  2000:5, 
  1200:3,
  1000:2,
  500:1,
}

const MasonaryLayout = ({posts,title}) => {
  return (
    <>
    {/* <Masonry className='flex w-full' breakpointCols={breakpointObj}>
    </Masonry> */}
     <RenderdCard  data={posts} title={title} />   
    </>
  )
}

export default MasonaryLayout;
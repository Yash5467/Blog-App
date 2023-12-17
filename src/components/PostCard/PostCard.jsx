
import storageService from '../../services/StorageService'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PostCard({$id,title,featuredImage}) {
  const [img,setImg]=useState(null)
 useEffect(()=>{
  storageService.previewImage(featuredImage).then((res)=>{
    setImg(res);
  })
 },[])
  
  return (
    <Link  to={`/post/${$id}`} >
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src={img} alt="Card Image"/>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{title}</div>
  </div>
</div>
    </Link>

  )
}


export default PostCard
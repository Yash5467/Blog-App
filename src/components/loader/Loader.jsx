import React from 'react'
import { Bars } from 'react-loader-spinner'
function Loader() {
  return (
    <div className="h-screen w-screen flex justify-center items-center " >
    <Bars
      height="50"
      width="50"
      color="#000"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass="wrapper-class"
      visible={true}
    />
  </div>
  )
}

export default Loader
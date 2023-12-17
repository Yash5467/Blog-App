import { forwardRef,useId } from "react";

import React from 'react'

const Input = forwardRef(({
    type,
    label,
    className='',
    ...props

},ref) => {
    const id=useId();
    return (
      <div className="max-w-md mx-auto bg-white p-3 rounded shadow-md">
         <div className="">
      <label htmlFor={id} className="block text-gray-600 text-sm font-semibold mb-2">{label}</label>
      <input ref={ref} type={type} id={id}  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${className}`}{...props} />
    </div>
    </div>
    )
  })

export default Input
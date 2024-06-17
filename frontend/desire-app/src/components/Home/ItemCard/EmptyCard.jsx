import React from 'react'
import teddy from '../List/List-icons/teddy.jpg'


const EmptyCard = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <img src={teddy} alt="No Items" className='w-60'/>
        <p className='w-1/2 text-m font-medium test-slate-700 text-center leading-7'> What are your greatest desires? </p>
    </div>
  )
}

export default EmptyCard
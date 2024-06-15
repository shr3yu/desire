import React from 'react'


const Profile = () => {
    const name= "shreya"
  return (
    <>
    <div className="w-12 h-12 flex items-center rounded-full justify-center text-black font-medium bg-slate-100">
        {name[0].toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium overflow-auto scroll-input">Shreya Mamidi</p>
        <p className="text-xs text-gray-500 overflow-auto scroll-input">mamidishreyapawar@gmail.com </p>
      </div>
    </>
  )
}

export default Profile
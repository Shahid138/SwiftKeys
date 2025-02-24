import { useAppSelector } from '@/store/hooks'
import React from 'react'

const Type = () => {
  const {userName, userEmail} = useAppSelector(state => state.user)
  return (
    <>
    {userEmail &&(
      <div className='text-white'>
      Welcome, {userName}.
      Your Email is {userEmail}
    </div>
    )}
   </>
  )
}

export default Type

import { useAppSelector } from '@/store/hooks'
import React from 'react'

const Multiplayer = () => {
  const {userName, userEmail} = useAppSelector(state => state.user)
    return (
      <>
      {userEmail &&(
        <div className='text-white'>
        Multiplayer
      </div>
      )}
     </>
  )
}

export default Multiplayer

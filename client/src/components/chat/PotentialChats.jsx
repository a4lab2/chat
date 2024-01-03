import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
// ChatContext
const PotentialChats = () => {
    const {PotentialChats}=useContext(ChatContext)
    console.log(PotentialChats)
  return (
    <>Hello</>
  )
}

export default PotentialChats
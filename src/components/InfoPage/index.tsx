import React from 'react'
import './InfoPage.scss'

interface Props{
  children? : React.ReactNode,
  red?: boolean
}
export default function InfoPage({children, red} : Props) {
  
  const className =`info-page${red ? ' red' : ''}`
  return(
    <div className = {className}>
      {children}
    </div>
  )
}
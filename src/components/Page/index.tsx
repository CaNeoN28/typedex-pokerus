import React from 'react'
import './Page.scss'

export default function Page({children} : {children?: React.ReactNode}){
  return(
    <main>
      {children}
    </main>
  )
}
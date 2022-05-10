import React from 'react'
import './Page.css'

export default function Page({children} : {children?: React.ReactNode}){
  return(
    <main>
      {children}
    </main>
  )
}
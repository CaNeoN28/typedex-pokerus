import React from "react";
import './Select.scss'

export default function Select({children} : {children ?: React.ReactNode}){
  return(
    <div className="select">
      {children}
    </div>
  )
}
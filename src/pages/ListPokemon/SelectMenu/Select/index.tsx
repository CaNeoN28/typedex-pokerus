import React from "react";
import './Select.scss'

export default function Select({children, label} : {children ?: React.ReactNode, label: string}){
  return(
    <div className="select">
      <span>
        {label} : 
      </span>
      {children}
    </div>
  )
}
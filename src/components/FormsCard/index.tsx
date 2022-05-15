import React from "react";
import './FormsCard.css'

export default function FormsCard({children} : {children? : React.ReactNode}){
  return(
    <div className="formsCard">
      {children}
    </div>
  )
}
import React from "react";
import "./SelectMenu.scss"

export default function SelectMenu({children} : { children ?: React.ReactNode}){
  return(
    <div className={"select-menu"}>
      {children}
    </div>
  )
}
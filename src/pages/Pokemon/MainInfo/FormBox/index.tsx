import { Pokemon } from "pokenode-ts"
import "./FormBox.scss"

export default function FormBox({children} : {children? : React.ReactNode}){
  return(
    <div className="form-box">
      {children}
    </div>
  )
}
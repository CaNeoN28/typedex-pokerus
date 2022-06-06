import { Pokemon } from "pokenode-ts"

export default function FormBox({children} : {children? : React.ReactNode}){
  return(
    <div>
      {children}
    </div>
  )
}
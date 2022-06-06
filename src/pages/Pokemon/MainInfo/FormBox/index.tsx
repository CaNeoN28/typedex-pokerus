import { Pokemon } from "pokenode-ts"

interface Props{
  setForm?: React.Dispatch<React.SetStateAction<Pokemon>>
  forms?: Pokemon[]
}

export default function FormBox({setForm, forms} : Props){
  return(
    <div>
      {forms && forms?.map(f => (
        <button key={f.id}>{f.name}</button>
      ))}
    </div>
  )
}
import Formatting from "common/utils/string"
import { PokemonType, Types } from "pokenode-ts"
import './TypeButton.css'

interface Props{
  type: string
}
export default function TypeButton({type} : Props){
  const className = `typeButton ${type}`

  return(
    <button className={className}>
      <a className="buttonText">{Formatting.capitalize(type)}</a>
    </button>
  )
}
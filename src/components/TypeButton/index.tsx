import Formatting from "common/utils/string"
import { PokemonType, Types } from "pokenode-ts"
import './TypeButton.scss'

interface Props{
  type: string
}
export default function TypeButton({type} : Props){
  const className = `type-button ${type}`

  return(
    <button className={className}>
      {Formatting.capitalize(type)}
    </button>
  )
}
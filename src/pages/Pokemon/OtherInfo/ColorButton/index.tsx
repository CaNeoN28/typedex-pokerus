import Formatting from "common/utils/string";
import { NamedAPIResource, PokemonColor } from "pokenode-ts";

export default function ColorButton({color}: {color: NamedAPIResource}){
  const f = Formatting.capitalize

  const className = `color-button ${color.name}`

  return(
  <button className={className}>
    {f(color.name)}
  </button>)
}
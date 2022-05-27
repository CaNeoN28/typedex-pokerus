import Formatting from "common/utils/string";
import { PokemonAbility } from "pokenode-ts";

export default function(props : {abilities : PokemonAbility[]}){
  const abilities = props.abilities
  const f = Formatting

  return(
    <>
      {abilities.map((a, index) => 
        <div key={index}>
          {f.capitalize(f.compostString(a.ability.name))}
        </div>
      )}
    </>
  )
}
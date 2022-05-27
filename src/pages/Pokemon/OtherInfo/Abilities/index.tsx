import Formatting from "common/utils/string";
import { PokemonAbility } from "pokenode-ts";
import {AiFillStar} from 'react-icons/ai';
import './Abilities.scss';

export default function(props : {abilities : PokemonAbility[]}){
  const abilities = props.abilities
  const f = Formatting

  return(
    <div className="abilities">
      {abilities.map((a, index) => 
        <a key={index} className='ability'>
          {f.capitalize(f.compostString(a.ability.name))} {a.is_hidden && <AiFillStar/>}
        </a>
      )}
    </div>
  )
}
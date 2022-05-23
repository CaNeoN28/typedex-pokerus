import { Pokemon, PokemonClient } from "pokenode-ts";
import './PokemonCard.css'

interface Props {
  pokemon: Pokemon
}

export default function PokemonCard({pokemon}: Props){
  const img = pokemon.sprites.other["official-artwork"].front_default || ""

  return(
    <div className="card">
      <img src={img} alt={pokemon.species.name}/>
      {pokemon.species.name}
    </div>
  )
}
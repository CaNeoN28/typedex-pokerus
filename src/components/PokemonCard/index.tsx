import { Pokemon, PokemonClient } from "pokenode-ts";
import './PokemonCard.css'
import missingNo from 'assets/images/missingNo.png'
import Formatting from "common/utils/string";
import TypeButton from "components/TypeButton";

interface Props {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: Props) {
  const img = pokemon.sprites.other["official-artwork"].front_default || ""
  const number = String(pokemon.id).padStart(3, '0')
  const name = Formatting.formattingSpeciesName(pokemon.species.name)

  const types = pokemon.types

  return (
    <div className="cardSpace">
      <div className="cardMain">
        <div className="cardImage">
          <img src={img} alt={pokemon.species.name} />
        </div>
        <span className="cardCaption">
          <a>N° {number}</a>
          <a>{name}</a>
        </span>
      </div>

      <div className="cardTypes">
        {types.map(type => (
          <TypeButton type={type.type.name} />
        ))}
      </div>
    </div>
  )
}
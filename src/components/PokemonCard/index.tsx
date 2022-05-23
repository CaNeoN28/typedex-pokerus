import { Pokemon, PokemonClient } from "pokenode-ts";
import './PokemonCard.css'
import missingNo from 'assets/images/missingNo.png'
import Formatting from "common/utils/string";
import TypeButton from "components/TypeButton";
import { useNavigate } from "react-router-dom";

interface Props {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: Props) {
  const navigate = useNavigate()

  const img = pokemon.sprites.other["official-artwork"].front_default || ""
  const number = String(pokemon.id).padStart(3, '0')
  const species_name = pokemon.species.name
  const name = Formatting.formattingSpeciesName(species_name)

  const types = pokemon.types

  return (
    <div className="cardSpace">
      <div className="cardMain" onClick={() => navigate(`pokemon/${species_name}`)}>
        <div className="cardImage">
          <img src={img} alt={species_name} />
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
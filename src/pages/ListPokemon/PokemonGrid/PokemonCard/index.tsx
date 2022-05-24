import { Pokemon, PokemonClient } from "pokenode-ts";
import './PokemonCard.scss'
import Formatting from "common/utils/string";
import TypeButton from "components/TypeButton";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <div className="card-main">
      <div className="card-space">
        <Link className="card-image" to={`pokemon/${species_name}`}>
          <img src={img} alt={species_name} />
        </Link>

        <div className="card-info">
          <Link className="card-caption" to={`pokemon/${species_name}`}>
            <span>N° {number}</span>
            <span>{name}</span>
          </Link>

          {window.innerWidth < 640 && <div className="card-types">
            {types.map((type, index) => (
              <TypeButton key={index} type={type.type.name} />
            ))}
          </div>}
        </div>
      </div>

      {window.innerWidth > 640 && <div className="card-types">
        {types.map((type, index) => (
          <TypeButton key={index} type={type.type.name} />
        ))}
      </div>}
    </div>
  )
}
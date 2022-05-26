import { Pokemon } from "pokenode-ts";
import './PokemonCard.scss'
import Formatting from "common/utils/string";
import TypeButton from "components/TypeButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as Logo} from "assets/logo.svg";

interface Props {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: Props) {
  const [w_width, setWWitdth] = useState(
    window.innerWidth
  )
  const [loaded, setLoaded] = useState(false);

  const detectWidth = () => {
    setWWitdth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', detectWidth)

    return (() => {
      window.addEventListener('resize', detectWidth)
    })
  }, [w_width])

  const img = pokemon.sprites.other["official-artwork"].front_default || ""
  const number = String(pokemon.id).padStart(3, '0')
  const species_name = pokemon.species.name
  const name = Formatting.formattingSpeciesName(species_name)

  const types = pokemon.types

  return (
    <div className="card-main">
      <div className="card-space">
        <Link className="card-image" to={`pokemon/${species_name}`}>
          <div className="dummy"/>
          {!loaded && <Logo/>}
          <img 
            src={img} 
            alt={species_name}
            hidden={!loaded}
            onLoad={() => setLoaded(true)}
          />
        </Link>

        <div className="card-info">
          <Link className="card-caption" to={`pokemon/${species_name}`}>
            <span>N° {number}</span>
            <span>{name}</span>
          </Link>

          {w_width < 640 && <div className="card-types">
            {types.map((type, index) => (
              <TypeButton key={index} type={type.type.name} />
            ))}
          </div>}
        </div>
      </div>

      {w_width > 640 && <div className="card-types">
        {types.map((type, index) => (
          <TypeButton key={index} type={type.type.name} />
        ))}
      </div>}
    </div>
  )
}
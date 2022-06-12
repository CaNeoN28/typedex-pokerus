import { Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './Card.scss'

interface Props {
  species_name: string
}

export default function Card({ species_name }: Props) {
  const api = new PokemonClient()

  const [form, setForm] = useState<Pokemon>();
  const [species, setSpecies] = useState<PokemonSpecies>();

  const getForm = async () => {
    await api.getPokemonSpeciesByName(species_name)
      .then(species => {
        setSpecies(species)
        api.getPokemonByName(species.varieties.find(v =>
          v.is_default)?.pokemon.name || '')
          .then(pokemon => setForm(pokemon))
      })
  }

  useEffect(() => {
    getForm()
  }, [])

  if (form && species) {
    const img = form.sprites.other.home.front_default ||
      form.sprites.other["official-artwork"].front_default ||
      ''

    return (
      <div className="card">
        <div className="image">
          <img
            src={img}
            alt={species.name}
            loading={'lazy'} />
        </div>

        <a href={`/pokemon/${species.name}`}>
          {species.name}
        </a>
      </div>
    )
  }

  return (
    <></>
  )
}
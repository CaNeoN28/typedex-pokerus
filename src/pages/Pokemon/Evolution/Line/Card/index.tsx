import Formatting from "common/utils/string"
import TypeButton from "components/TypeButton"
import { ChainLink, EvolutionChain, EvolutionDetail, Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './Item.scss'
import EvolutionDetails from "./EvolutionDetails"

interface Props {
  species_name: string
  evo_chain: ChainLink
}

export default function Card({ species_name, evo_chain }: Props) {
  const api = new PokemonClient()
  const f = Formatting


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
    const img = form.sprites.other["official-artwork"].front_default ||
      form.sprites.other.home.front_default ||
      ''

    return (
      <div className="item">
        <div className="image">
          <img
            src={img}
            alt={species.name}
            loading={'lazy'} />
        </div>

        <div className="text">
          <a href={`/pokemon/${species.name}`}>
            {f.formattingSpeciesName(species.name)}
          </a>
        </div>
      </div>
    )
  }

  return (
    <></>
  )
}
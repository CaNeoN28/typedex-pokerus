import Formatting from "common/utils/string"
import TypeButton from "components/TypeButton"
import { ChainLink, EvolutionDetail, Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './Card.scss'

interface Props {
  species_name: string
  evo_detail: EvolutionDetail[]
}

export default function Card({ species_name, evo_detail }: Props) {
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
    const img = form.sprites.other.home.front_default ||
      form.sprites.other["official-artwork"].front_default ||
      ''

    return (
      <div className="space">
        {species.evolves_from_species && (
          <div className="evolution-details">
            {evo_detail.map(evo => (
              <span>
                {evo.gender && <>Gender: <br/>{`${evo.gender === 1 ? 'Female' : 'Male'}`}</>}
                {evo.held_item && <>Held Item: <br/>{`${f.compostName(evo.held_item.name)}`}</>}
                {evo.min_level && `Level: ${evo.min_level}`}
              </span>
            ))}
          </div>
        )}
        <div className="step-space">
          <div className="card">
            <div className="image">
              <img
                src={img}
                alt={species.name}
                loading={'lazy'} />
            </div>

            <a href={`/pokemon/${species.name}`}>
              {f.formattingSpeciesName(species.name)}
            </a>
          </div>

          <div className="type-list">
            {form.types.map(t => (
              <TypeButton type={t.type.name} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <></>
  )
}
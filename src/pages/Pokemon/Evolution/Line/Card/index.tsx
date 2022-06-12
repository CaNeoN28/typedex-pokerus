import { Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts"
import { useEffect, useState } from "react"

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
      <div>
        <div>
          <img
            src={img}
            alt={species.name}
            loading={'lazy'} />
        </div>

        {species_name}
      </div>
    )
  }

  return (
    <></>
  )
}
import Page from "components/Page";
import SearchBox from "components/Searchbox";
import { useEffect, useState } from "react";
import { Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts'
import LoadButton from "components/LoadButton";

export default function () {
  const api = new PokemonClient();

  const [max, setMax] = useState(16)

  const [search, setSearch] = useState('')
  const [pokemon_list, setPokemonList] = useState<PokemonSpecies[]>()

  const validateIfHasPokemon = (oldList: PokemonSpecies[], species: PokemonSpecies) => {
    if (!oldList.find(p => p.id === species.id))
      return [...oldList, species]

    return [...oldList]
  }

  const getSpeciesList = async () => {
    await api.listPokemonSpecies(0, 10000)
      .then(res => res.results.map(r => {
        api.getPokemonSpeciesByName(r.name)
          .then(species => {
            setPokemonList(oldList => oldList ? validateIfHasPokemon(oldList, species) : [species])
          })
      }))
  }

  useEffect(() => {
  }, [search])

  useEffect(() => {
    if (pokemon_list)
      pokemon_list.sort((a, b) => a.id < b.id ? -1 : 1)
  }, [pokemon_list])
  useEffect(() => {
    getSpeciesList()
  }, [])

  if (pokemon_list)
    return (
      <Page>
        <SearchBox setSearch={setSearch} />
        <ul>
          {pokemon_list.map((species, index) => (index < max) && <li key={index}>{species.name}</li>)}
        </ul>
        <LoadButton max={max} setMax={setMax} true_max={pokemon_list.length}/>
      </Page>
    )

  return (
    <></>
  )
}
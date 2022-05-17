import Page from "components/Page";
import SearchBox from "components/Searchbox";
import { useEffect, useState } from "react";
import { NamedAPIResource, Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts'
import LoadButton from "components/LoadButton";

export default function () {
  const api = new PokemonClient();

  const min = 16
  const [max, setMax] = useState(min)

  const [search, setSearch] = useState('')
  const [pokemon_dict, setPokemonDict] = useState<NamedAPIResource[]>()
  const [pokemon_list, setPokemonList] = useState<PokemonSpecies[]>()

  const validateIfHasPokemon = (oldList: PokemonSpecies[], species: PokemonSpecies) => {
    if (!oldList.find(p => p.id === species.id))
      return [...oldList, species]

    return [...oldList]
  }

  const getPokemonDict = async () => {
    await api.listPokemons(0, 10000)
      .then(pokemon => setPokemonDict(pokemon.results))
  }

  useEffect(() => {
    getPokemonDict()
  }, [])

  return (
    <Page>
      <SearchBox setSearch={setSearch} />
      <ul>
        {pokemon_dict && pokemon_dict.map((species, index) => (index < max) && <li key={index}>{species.name}</li>)}
      </ul>
      {pokemon_dict && <LoadButton max={max} setMax={setMax} true_max={pokemon_dict.length}/>}
    </Page>
  )
}
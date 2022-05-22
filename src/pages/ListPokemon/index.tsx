import Page from "components/Page";
import SearchBox from "components/Searchbox";
import { useEffect, useState } from "react";
import { NamedAPIResource, Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts';
import LoadButton from "components/LoadButton";

export default function () {
  const api = new PokemonClient();

  const min = 16
  const [max, setMax] = useState(min)

  const [search, setSearch] = useState('')
  const [pokemon_dict, setPokemonDict] = useState<NamedAPIResource[]>()
  const [f_pokemon_dict, setFilteredPokemonDict] = useState<NamedAPIResource[]>()
  const [pokemon_list, setPokemonList] = useState<Pokemon[]>()

  const validateIfHasPokemon = (oldList: Pokemon[], species: Pokemon) => {
    if (!oldList.find(p => p.id === species.id))
      return [...oldList, species]

    return [...oldList]
  }

  const getPokemonDict = async () => {
    await api.listPokemons(0, 10000)
      .then(pokemon => setPokemonDict(pokemon.results))
  }

  const getPokemon = async () => {
    pokemon_dict && await pokemon_dict.map(p => (
      api.getPokemonByName(p.name)
        .then(res => setPokemonList(old_list => old_list ? validateIfHasPokemon(old_list, res) : [res]))
    ))
  }

  const getFilteredPokemonDict = () => {
    if (pokemon_dict)
      setFilteredPokemonDict(pokemon_dict.filter(p => p.name.startsWith(search)))
  }

  useEffect(() => {
    getPokemonDict()
  }, [])

  useEffect(() => {
    getPokemon()
    getFilteredPokemonDict()
  }, [pokemon_dict])

  useEffect(() => {
    getFilteredPokemonDict()
  }, [search])

  return (
    <Page>
      <SearchBox setSearch={setSearch} />
      <ul>
        {f_pokemon_dict && f_pokemon_dict.map((pokemon, index) => (index < max) && <li key={index}>{pokemon.name}</li>)}
      </ul>
      {pokemon_list && <LoadButton max={max} setMax={setMax} true_max={pokemon_list.length}/>}
    </Page>
  )
}
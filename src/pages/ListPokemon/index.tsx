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

  const [pokemon_dict, setPokemonDict] = useState<NamedAPIResource[]>();

  const [pokemon_list, setPokemonList] = useState<Pokemon[]>()

  const validateIfHasPokemon = (oldList : Pokemon[], res : Pokemon) => {
    if (!oldList.find(p => p.name === res.name))
      return [...oldList, res]
    
    return [...oldList]
  }

  const getPokemonDict = async () => {
    await api.listPokemons(0, 10000)
      .then(res => setPokemonDict(res.results.filter(item => item.name.startsWith(search))))
  }

  const getPokemonList = async () => {

    pokemon_dict && await pokemon_dict.map((p, index) => {
      index < max && api.getPokemonByName(p.name)
        .then(res => setPokemonList(oldList => oldList ? validateIfHasPokemon(oldList, res) : [res]))
    })
  }

  useEffect(() => {
    getPokemonDict()
  }, [search])

  useEffect(() => {
    getPokemonList()
  }, [pokemon_dict, max])

  useEffect(() => {
    pokemon_list && pokemon_list.sort((a, b) => a.id < b.id ? -1: 1)
  })

  return (
    <Page>
      <SearchBox setSearch={setSearch} />
      <ul>
        {pokemon_list && pokemon_list.map((p, index) => <li key={index}>{p.name}</li>)}
      </ul>
      {<LoadButton max={max} setMax={setMax}/>}
    </Page>
  )
}
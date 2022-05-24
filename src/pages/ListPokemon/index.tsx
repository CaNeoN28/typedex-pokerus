import Page from "components/Page";
import { useEffect, useState } from "react";
import { NamedAPIResource, Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts';
import LoadButton from "./LoadButton";
import PokemonGrid from "./PokemonGrid";
import SearchBox from "./Searchbox";
import "./ListPokemon.scss"

export default function () {
  const api = new PokemonClient();

  const min = 16
  const [max, setMax] = useState(min)

  const [search, setSearch] = useState('')

  const [pokemon_dict, setPokemonDict] = useState<NamedAPIResource[]>();

  const [pokemon_list, setPokemonList] = useState<Pokemon[]>()
  const [next_list, setNextList] = useState<Pokemon[]>()

  const validateIfHasPokemon = (oldList: Pokemon[], res: Pokemon) => {
    if (!oldList.find(p => p.id === res.id))
      return [...oldList, res]

    return [...oldList]
  }

  const preparePokemonList = (
    setList: React.Dispatch<React.SetStateAction<Pokemon[] | undefined>>,
    res: Pokemon
  ) => {
    setList(oldList => (oldList ? validateIfHasPokemon(oldList, res) : [res])
      .sort((a, b) => a.id < b.id ? -1 : 1)
      .filter(a => a.is_default))
  }

  const getPokemonDict = async () => {
    await api.listPokemons(0, 10000)
      .then(res => setPokemonDict(res.results.filter(item => item.name.includes(search))))
  }

  const getFirstList = async () => {
    setMax(min)
    setPokemonList([])
    setNextList([])

    pokemon_dict && await pokemon_dict.map((p, index) => {
      index < max ? api.getPokemonByName(p.name)
        .then(res => preparePokemonList(setPokemonList, res)) :
        index < max + min && api.getPokemonByName(p.name)
          .then(res => preparePokemonList(setNextList, res))
    })
  }

  const getNextList = async () => {
    setNextList([])

    pokemon_list && pokemon_dict && await pokemon_dict.map((p, index) => {
      index >= max && index < max + min && api.getPokemonByName(p.name)
        .then(res => preparePokemonList(setNextList, res))
    })
  }

  useEffect(() => {
    getPokemonDict()
  }, [search])

  useEffect(() => {
    getFirstList()
  }, [pokemon_dict])

  useEffect(() => {
    if (next_list && pokemon_list) {
      setPokemonList([...pokemon_list, ...next_list])
    }

    getNextList()
  }, [max])

  return (
    <Page>
      <main className="listPage">
        <SearchBox setSearch={setSearch} />
        {pokemon_list && pokemon_list.length > 0 ? <PokemonGrid pokemon_list={pokemon_list}/> : "Não há pokémon referentes à sua busca"}
        {next_list && next_list.length > 0 && <LoadButton max={max} setMax={setMax} />}
      </main>
    </Page>
  )
}
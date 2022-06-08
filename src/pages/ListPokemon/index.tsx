import Page from "components/Page";
import { useEffect, useState } from "react";
import { NamedAPIResource, Pokedex, Pokedexes, Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts';
import LoadButton from "./LoadButton";
import PokemonGrid from "./PokemonGrid";
import SearchBox from "./Searchbox";
import "./ListPokemon.scss"
import PokedexServices from "services/pokedex";

export default function () {
  const api = new PokemonClient();

  const min = 12
  const [max, setMax] = useState(min)

  const [search, setSearch] = useState('')

  const [pokemon_dict, setPokemonDict] = useState<NamedAPIResource[]>();

  const [pokemon_list, setPokemonList] = useState<Pokemon[]>()
  const [next_list, setNextList] = useState<Pokemon[]>()

  const [pokedex, setPokedex] = useState<Pokedex>()
  const [dexList, setDexList] = useState<Pokedex[]>([])

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

  const getPokemon = async (
    name: string,
    setList: React.Dispatch<React.SetStateAction<Pokemon[] | undefined>>) => {
    await api.getPokemonByName(name)
      .then(res => preparePokemonList(setList, res))
  }

  const getPokemonDict = async () => {
    await api.listPokemons(0, 10000)
      .then(res => setPokemonDict(res.results.filter(item => item.name.includes(search))))
  }

  const getFirstList = () => {
    setMax(min)
    setPokemonList([])
    setNextList([])

    pokemon_dict && pokemon_dict.map((p, index) => {
      index < max ? getPokemon(p.name, setPokemonList) :
        index < max + min && getPokemon(p.name, setNextList)
    })
  }

  const getNextList = () => {
    setNextList([])

    pokemon_list && pokemon_dict && pokemon_dict.map((p, index) => {
      index >= max && index < max + min && getPokemon(p.name, setNextList)
    })
  }

  useEffect(() => {
    setDexList(
      PokedexServices.prepareList()
    )
  }, [])

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

        <div>
          <select
            defaultValue={1}
            onChange={(e) => setPokedex(dexList.filter(d => String(d.id) === e.target.value)[0])}>
            {dexList.sort((a, b) => a.id < b.id ? -1 : 1).map((dex) => (
              <option
                key={dex.id}
                value={dex.id}>
                {dex.names[dex.names.length - 1].name}
              </option>
            ))}
          </select>
        </div>

        {pokemon_list && pokemon_dict ? <PokemonGrid pokemon_list={pokemon_list} /> :
          "There is no Pokémon!"}
        {next_list && next_list.length > 0 && <LoadButton min={min} max={max} setMax={setMax} />}
      </main>
    </Page>
  )
}
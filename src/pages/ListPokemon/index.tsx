import Page from "components/Page";
import { useEffect, useState } from "react";
import { GameClient, NamedAPIResource, Pokedex, Pokedexes, Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts';
import LoadButton from "./LoadButton";
import PokemonGrid from "./PokemonGrid";
import SearchBox from "./Searchbox";
import "./ListPokemon.scss"
import PokedexServices from "services/pokedex";

export default function () {
  const pokemonClient = new PokemonClient();
  const gameClient = new GameClient()

  const min = 12
  const [max, setMax] = useState(min)

  const [search, setSearch] = useState('')

  const [pokemon_dict, setPokemonDict] = useState<NamedAPIResource[]>();

  const [pokemon_list, setPokemonList] = useState<Pokemon[]>()
  const [next_list, setNextList] = useState<Pokemon[]>()

  const [pokedex, setPokedex] = useState<Pokedex>()
  const [dexList, setDexList] = useState<Pokedex[]>([])


  const validateIfHasDex = (oldList: Pokedex[], res: Pokedex) => {
    if (!oldList.find(pokedex => pokedex.id === res.id))
      return [...oldList, res]

    return [...oldList]
  }

  const prepareDexList = (
    setList: React.Dispatch<React.SetStateAction<Pokedex[]>>,
    res: Pokedex
  ) => {
    setList(oldList => (oldList ? validateIfHasDex(oldList, res) : [res])
      .sort((a, b) => a.id < b.id ? -1 : 1)
    )
  }


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


  const getDex = () => {
    PokedexServices.getById(1)
      .then(res => setPokedex(res.data))
  }

  const getDexList = async () => {
    await PokedexServices.getList()
      .then(res => res.data.results.map(
        (r: NamedAPIResource) =>
          PokedexServices.get(r.url)
            .then(dex => prepareDexList(setDexList, dex.data))
      ))
  }

  const getPokemon = async (
    name: string,
    setList: React.Dispatch<React.SetStateAction<Pokemon[] | undefined>>) => {
    await pokemonClient.getPokemonByName(name)
      .then(res => preparePokemonList(setList, res))
  }

  const getPokemonDict = async () => {

    pokedex &&
      await pokemonClient.listPokemons(0, 10000)
        .then(res => setPokemonDict(
          res.results
            .filter(item => item.name.includes(search))
        ))
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
    getDex()
    getDexList()
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
            value={pokedex ? pokedex.name : 'national'}
            onChange={(e) => setPokedex(dexList.filter(d => (d.name) === e.target.value)[0])}
          >
            {dexList.sort((a, b) => a.id < b.id ? -1 : 1).map((dex) => (
              <option
                key={dex.id}
                value={dex.name}>
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
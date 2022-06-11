import Page from "components/Page";
import { useDeferredValue, useEffect, useState } from "react";
import { GameClient, NamedAPIResource, Pokedex, Pokedexes, Pokemon, PokemonClient, PokemonShapes, PokemonSpecies } from 'pokenode-ts';
import LoadButton from "./LoadButton";
import PokemonGrid from "./PokemonGrid";
import SearchBox from "./Searchbox";
import "./ListPokemon.scss"
import SpeciesAndBaseForm from "types/SpeciesAndForm";
import { appendFile } from "fs";

export default function () {
  const pokemonClient = new PokemonClient();
  const gameClient = new GameClient()

  const min = 12
  const [max, setMax] = useState(min)

  const [search, setSearch] = useState('')

  const [pokedex, setPokedex] = useState<Pokedex>()
  const [dexList, setDexList] = useState<Pokedex[]>([])

  const [list, setList] = useState<SpeciesAndBaseForm[]>([])

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

  const getDex = () => {
    gameClient.getPokedexById(1)
      .then(res => setPokedex(res))
  }

  const getDexList = async () => {
    await gameClient.listPokedexes()
      .then(res => res.results.map(
        r =>
          gameClient.getPokedexByName(r.name)
            .then(dex => prepareDexList(setDexList, dex))
      ))
  }


  const validateIfHas = (oldList: SpeciesAndBaseForm[], res: SpeciesAndBaseForm) => {
    if (!oldList.find(p => p.species.id === res.species.id))
      return [...oldList, res]

    return [...oldList]
  }

  const preparePokemonList = async (species: PokemonSpecies, index: number) => {

    await pokemonClient.getPokemonByName(species.varieties.find(v => v.is_default === true)?.pokemon.name || '')
      .then(pokemon => setList(oldList =>
      (oldList ? validateIfHas(oldList, { index: index, pokemon: pokemon, species: species }) :
        [{ index: index, pokemon: pokemon, species: species }]
      ).sort((a,b) => a.index < b.index ? -1 : 1)
      ))
  }

  const getPokemon = async (name: string, index: number) => {
    await pokemonClient.getPokemonSpeciesByName(name)
      .then(res => preparePokemonList(res, index))
  }

  const getList = () => {
    pokedex?.pokemon_entries.filter(p => p.pokemon_species.name.includes(search.toLocaleLowerCase()))
      .map((p, index) => {
        index < max && getPokemon(p.pokemon_species.name, index)
      })
  }

  useEffect(() => {
    getDex()
    getDexList()
  }, [])

  useEffect(() => {
    setMax(min)
    setList([])
    getList()
  }, [pokedex, search])

  useEffect(() => {
    getList()
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

        {pokedex && list.length > 0 ? <PokemonGrid pokedex={pokedex} list={list} /> :
          "There is no Pokémon!"}
        {pokedex && max < pokedex.pokemon_entries.length && <LoadButton min={min} max={max} setMax={setMax} />}
      </main>
    </Page>
  )
}
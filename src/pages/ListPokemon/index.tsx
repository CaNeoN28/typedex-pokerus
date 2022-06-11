import Page from "components/Page";
import React, { useEffect, useState } from "react";
import { GameClient, Pokedex, PokemonClient, PokemonSpecies, Type } from 'pokenode-ts';
import LoadButton from "./LoadButton";
import PokemonGrid from "./PokemonGrid";
import SearchBox from "./Searchbox";
import "./ListPokemon.scss"
import SpeciesAndBaseForm from "types/SpeciesAndForm";
import Select from "./SelectMenu/Select";
import SelectMenu from "./SelectMenu";
import { type } from "os";
import TypeButton from "components/TypeButton";
export default function () {
  const pokemonClient = new PokemonClient();
  const gameClient = new GameClient()

  const min = 12
  const [max, setMax] = useState(min)

  const [search, setSearch] = useState('')
  const [order, setOrder] = useState('id+')
  const [type, setType] = useState<string>('')

  const [pokedex, setPokedex] = useState<Pokedex>()
  const [dexList, setDexList] = useState<Pokedex[]>([])
  const [typeList, setTypeList] = useState<Type[]>([])

  const [list, setList] = useState<SpeciesAndBaseForm[]>([])

  const validateIfHas = (oldList: any[], res: any) => {
    if (!oldList.find(a => (a.id || a.species.id) === (res.id || res.species.id)))
      return [...oldList, res]

    return [...oldList]
  }

  const prepareDexList = (
    setList: React.Dispatch<React.SetStateAction<Pokedex[]>>,
    res: Pokedex
  ) => {
    setList(oldList => (oldList ? validateIfHas(oldList, res) : [res])
      .sort((a, b) => a.id < b.id ? -1 : 1)
    )
  }

  const getDexList = async () => {
    await gameClient.listPokedexes(0, 10000)
      .then(res => res.results.map(
        r =>
          gameClient.getPokedexByName(r.name)
            .then(dex => {
              dex.name === 'national' && setPokedex(dex)
              prepareDexList(setDexList, dex)
            })
      ))
  }

  const prepareTypeList = (
    setList: React.Dispatch<React.SetStateAction<Type[]>>,
    type: Type
  ) => {
    setList(oldList => (
      oldList ? validateIfHas(oldList, type) : [type]
    ).sort((a, b) => a.id < b.id ? -1 : 1))
  }

  const getTypeList = async () => {
    await pokemonClient.listTypes(0, 10000)
      .then(res => res.results.map(
        r =>
          pokemonClient.getTypeByName(r.name)
            .then(type => {
              type.id < 10000 &&
                prepareTypeList(setTypeList, type)
            })
      ))
  }

  const preparePokemonList = async (species: PokemonSpecies, index: number) => {

    await pokemonClient.getPokemonByName(species.varieties.find(v => v.is_default === true)?.pokemon.name || '')
      .then(pokemon => setList(oldList =>
        (oldList ? validateIfHas(oldList, { index: index, pokemon: pokemon, species: species }) :
          [{ index: index, pokemon: pokemon, species: species }]
        ).sort((a, b) => a.index < b.index ? -1 : 1)
      ))
  }

  const getPokemon = async (name: string, index: number) => {
    await pokemonClient.getPokemonSpeciesByName(name)
      .then(res => preparePokemonList(res, index))
  }

  const getList = () => {
    pokedex?.pokemon_entries
      .sort((a, b) =>
        order.includes('name') ?
          (order.includes('+') ? a.pokemon_species.name.localeCompare(b.pokemon_species.name) :
            b.pokemon_species.name.localeCompare(a.pokemon_species.name)
          ) :
          (
            order === 'id+' ?
              (a.entry_number < b.entry_number) ? -1 : 1
              : (a.entry_number > b.entry_number)
                ? -1 : 1
          )
      )
      .filter(p => p.pokemon_species.name.includes(search.toLocaleLowerCase()))
      .filter(p => type != '' ? typeList.find(t => t.name === type)?.pokemon.find(pk => pk.pokemon.name.includes(p.pokemon_species.name)) : p)
      .map((p, index) => {
        index < max && getPokemon(p.pokemon_species.name, index)
      })
  }

  useEffect(() => {
    getDexList()
    getTypeList()
  }, [])

  useEffect(() => {
    setMax(min)
    setList([])
    getList()
  }, [pokedex, search, order, type])

  useEffect(() => {
    getList()
  }, [max])

  return (
    <Page>
      <main className="listPage">
        <SearchBox setSearch={setSearch} />
        <SelectMenu>
          <Select label={'Pokedex'}>
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
          </Select>
          <Select label={"Order by"}>
            <select
              onChange={(e) => setOrder(e.target.value)}>
              {orderingList.map((o, index) =>
                <option
                  key={index}
                  value={o.value}>
                  {o.label}
                </option>
              )}
            </select>
          </Select>
          <Select label={"Type"}>
            <select
              onChange={(e) => setType(e.target.value)}>
              <option value={''}>None</option>
              {typeList.map((type) =>
                <option 
                  key={type.id}
                  value={type.name}>
                  {type.name}
                </option>
              )}
            </select>
          </Select>
        </SelectMenu>

        {pokedex && list.length > 0 ? <PokemonGrid pokedex={pokedex} list={list} /> : search != '' &&
          "There is no Pokémon!"}
        {pokedex && max < pokedex.pokemon_entries.length && <LoadButton min={min} max={max} setMax={setMax} />}
      </main>
    </Page>
  )
}

const orderingList = [
  {
    value: 'id+',
    label: 'Number(ascending)'
  },
  {
    value: 'id-',
    label: 'Number(descending)'
  },
  {
    value: 'name+',
    label: 'Name(ascending)'
  },
  {
    value: 'name-',
    label: 'Name(descending)'
  }
]
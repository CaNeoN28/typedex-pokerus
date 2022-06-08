import axios from 'axios'
import TypeButton from 'components/TypeButton'
import { Name, NamedAPIResource, Pokedex } from 'pokenode-ts'

async function getList() {
  const response = await axios.get('https://pokeapi.co/api/v2/pokedex?limit=100000&offset=0')
  return response
}

async function getById(id : number) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokedex/${id}`)
  return response
}

async function get(url : string) {
  const response = await axios.get(url)
  return response
}

const PokedexServices = {
  getList,
  getById,
  get
}

export default PokedexServices
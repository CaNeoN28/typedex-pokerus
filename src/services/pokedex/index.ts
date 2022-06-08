import axios from 'axios'
import TypeButton from 'components/TypeButton'
import { Name, NamedAPIResource, Pokedex } from 'pokenode-ts'

async function getList() {
  const response = await axios.get('https://pokeapi.co/api/v2/pokedex?limit=100000&offset=0')
  return response
}

async function get(url : string) {
  const response = await axios.get(url)
  return response
}

function prepareList() {
  let list: Pokedex[] = []

  const getDexList = async () => {
    let l : NamedAPIResource[] = []

    await getList().then(res => l = res.data.results)

    l.map(async (a) => 
      await get(a.url)
        .then(res => list.push(res.data))
    )
  }

  getDexList()

  return list
}

const PokedexServices = {
  getList,
  prepareList
}

export default PokedexServices
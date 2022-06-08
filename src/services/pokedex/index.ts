import axios from 'axios'
import TypeButton from 'components/TypeButton'
import { NamedAPIResource, Pokedex } from 'pokenode-ts'

async function getList() {
  const response = await axios.get('https://pokeapi.co/api/v2/pokedex?limit=100000&offset=0')
  return response
}

function prepareList() {
  let list: Pokedex[] = []

  const getDexList = async () => {
    await getList()
      .then(res =>
        res.data.results.map((d : NamedAPIResource) => 
          axios.get(d.url)
            .then(res => list.push(res.data))
        )
      )
      .catch(error => list.push(error))
  }

  getDexList()

  return list
}

const PokedexServices = {
  getList,
  prepareList
}

export default PokedexServices
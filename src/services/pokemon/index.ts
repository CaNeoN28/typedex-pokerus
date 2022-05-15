import axios from "axios"

async function getSpecies(id : String){
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  return response
}

export const PokemonServices = {
  getSpecies
}
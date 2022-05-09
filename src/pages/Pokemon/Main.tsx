import { Pokemon, PokemonSpecies } from "pokenode-ts";

interface Props{
  species: PokemonSpecies,
  forms: Pokemon[],
  form: number,
  setForm: React.Dispatch<React.SetStateAction<number>>
}

export default function MainInfo({species, forms, form, setForm} : Props){
  return(
    <>
      {forms.map((f, index) => (
        index == form && <img src={f.sprites.other["official-artwork"].front_default || ''} alt={f.name}/>
      ))}
    </>
  )
}
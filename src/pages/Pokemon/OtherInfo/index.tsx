import DataTable from "components/DataTable";
import InfoPage from "components/InfoPage";
import { Pokemon, PokemonSpecies } from "pokenode-ts";
import TableData from "types/TableData";
import Abilities from "./Abilities";
import './OtherInfo.scss'

interface Props{
  pokemonForm : Pokemon,
  pokemonSpecies: PokemonSpecies
}
export default function OtherInfo({pokemonForm, pokemonSpecies} : Props) {
  const abilities = pokemonForm.abilities
  const na = abilities.filter(a => !a.is_hidden)
  const ha = abilities.filter(a => a.is_hidden)

  const data = {
    rows:[{
      label: 'Abilities',
      values: [
        <Abilities abilities={na}/>,
        <Abilities abilities={ha}/>
      ]
    },{
      label: 'Color',
      values: [pokemonSpecies.color.name]
    },{
      label: 'Gender rate',
      values: [pokemonSpecies.gender_rate]
    },{
      label: 'Egg cycles',
      values: [pokemonSpecies.hatch_counter]
    },{
      label: 'Catch rate',
      values: [pokemonSpecies.capture_rate]
    }]
  }

  return (
    <div className="secondary-page">
      <DataTable data={data}/>
    </div>
  )
}
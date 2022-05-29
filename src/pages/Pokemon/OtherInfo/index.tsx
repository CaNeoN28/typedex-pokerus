import DataTable from "components/DataTable";
import InfoPage from "components/InfoPage";
import { Pokemon, PokemonSpecies } from "pokenode-ts";
import TableData from "types/TableData";
import Abilities from "./Abilities";
import ColorButton from "./ColorButton";
import GenderRate from "./GenderRate";
import GenderChart from "./GenderRate/GenderChart";
import './OtherInfo.scss'

interface Props{
  pokemonForm : Pokemon,
  pokemonSpecies: PokemonSpecies
}
export default function OtherInfo({pokemonForm, pokemonSpecies} : Props) {
  const abilities = pokemonForm.abilities
  const na = abilities.filter(a => !a.is_hidden)
  const ha = abilities.filter(a => a.is_hidden)

  const gender_rate = pokemonSpecies.gender_rate

  const hatch_counter = pokemonSpecies.hatch_counter
  const f_hatch_counter = `${hatch_counter} (${hatch_counter * 256} steps)`

  const data = {
    rows:[{
      label: 'Abilities',
      value: 
        ha.length > 0 ? 
        [<Abilities abilities={na}/>, <Abilities abilities={ha}/>] : 
        [<Abilities abilities={na}/>]
    },{
      label: 'Color',
      value: [
        <ColorButton color={pokemonSpecies.color}/>
      ]
    },{
      label: 'Gender rate',
      value: <GenderRate gender_rate={gender_rate}/>
    },{
      label: 'Egg cycles',
      value: [f_hatch_counter]
    },{
      label: 'Catch rate',
      value: [pokemonSpecies.capture_rate]
    }]
  }

  return (
    <div className="secondary-page">
      <DataTable data={data}/>
    </div>
  )
}
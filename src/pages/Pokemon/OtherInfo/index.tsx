import DataTable from "components/DataTable";
import InfoPage from "components/InfoPage";
import { Pokemon, PokemonSpecies } from "pokenode-ts";
import TableData from "types/TableData";

interface Props{
  pokemonForm : Pokemon,
  pokemonSpecies: PokemonSpecies
}
export default function OtherInfo({pokemonForm, pokemonSpecies} : Props) {
  const data = {
    rows:[{
      label: 'Abilities',
      values: pokemonForm.abilities.map(a => a.ability.name)
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
    <InfoPage red>
      <DataTable data={data}/>
    </InfoPage>
  )
}
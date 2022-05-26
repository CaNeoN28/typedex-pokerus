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
      values: ['']
    },{
      label: 'Color',
      values: ['']
    },{
      label: 'Gender rate',
      values: ['']
    },{
      label: 'Egg cycles',
      values: ['']
    },{
      label: 'Catch rate',
      values: ['']
    }]
  }

  return (
    <InfoPage red>
      <DataTable data={data}/>
    </InfoPage>
  )
}
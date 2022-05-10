import { Pokemon, PokemonSpecies } from "pokenode-ts";
import FormsCard from "../../components/FormsCard";
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import InfoPage from "../../components/InfoPage";
import DataTable from "../../components/DataTable";

interface Props {
  species: PokemonSpecies,
  forms: Pokemon[],
  form: number,
  setForm: React.Dispatch<React.SetStateAction<number>>
}

export default function MainInfo({ species, forms, form, setForm }: Props) {
  const currentForm = forms[form];
  const img = currentForm.sprites.other["official-artwork"].front_default

  const genus = species.genera.map(g => (g.language.name == 'en' && g.genus))
  const types = currentForm.types

  return (
    <InfoPage>
      <FormsCard>
        <img src={img || ''} alt={currentForm.name} />
        {forms.length > 1 && <div className='optionBox'>
          <a onClick={e => form === 0 ? setForm(forms.length - 1) : setForm(form - 1)}><AiFillCaretLeft /></a>
          <span> {currentForm.name} </span>
          <a onClick={e => form === forms.length - 1 ? setForm(0) : setForm(form + 1)}><AiFillCaretRight /></a>
        </div>}
      </FormsCard>
      <DataTable>
        <div className="tableHeader">
          {genus}
        </div>
        <table className="tableBody">
          <tbody>
            <tr className="tableRow">
              <td className="rowKey">Types: </td>
              <td className="rowValue">{types.map(t => (
                <a>{t.type.name}</a>
              ))}</td>
            </tr>
            <tr className="tableRow">
              <td className="rowKey">Height: </td>
            </tr>
            <tr className="tableRow">
              <td className="rowKey">Weight: </td>
            </tr>
            <tr className="tableRow">
              <td className="rowKey">Egg groups: </td>
            </tr>
            <tr className="tableRow">
              <td className="rowKey">Growth rate: </td>
            </tr>
          </tbody>
        </table>
      </DataTable>
    </InfoPage>
  )
}
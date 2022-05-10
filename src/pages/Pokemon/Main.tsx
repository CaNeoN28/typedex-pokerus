import { Pokemon, PokemonSpecies } from "pokenode-ts";
import FormsCard from "../../components/ FormsCard";
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import InfoPage from "../../components/InfoPage";

interface Props {
  species: PokemonSpecies,
  forms: Pokemon[],
  form: number,
  setForm: React.Dispatch<React.SetStateAction<number>>
}

export default function MainInfo({ species, forms, form, setForm }: Props) {
  const currentForm = forms[form];
  const img = currentForm.sprites.other["official-artwork"].front_default
  console.log(forms)

  return (
    <InfoPage>
        <FormsCard>
          <img src={img || ''} alt={currentForm.name} />
          {forms.length > 1 && <div className='optionBox'>
            <a onClick={e => form === 0 ? setForm(forms.length - 1) : setForm(form - 1)}><AiFillCaretLeft /></a>
            <span> {currentForm .name} </span>
            <a onClick={e => form === forms.length - 1 ? setForm(0) : setForm(form + 1)}><AiFillCaretRight /></a>
          </div>}
        </FormsCard>
      <div>
        
      </div>
    </InfoPage>
  )
}
import { PokemonSpecies } from 'pokenode-ts'
import { Link } from 'react-router-dom'
import { AiFillCaretLeft, AiFillCaretRight} from 'react-icons/ai'
import './OptionBox.scss'
import Formatting from 'common/utils/string'

interface Props{
  previous_pokemon: string,
  next_pokemon: string,
  species: PokemonSpecies
}
export default function OptionBox({previous_pokemon, next_pokemon, species} : Props) {
  const f = Formatting

  return (
    <div className="option-box">
      <Link to={previous_pokemon}><AiFillCaretLeft /></Link>
      <div className="label-group">
        <span>N° {String(species.id).padStart(3, '0')}</span>
        <span>{f.formattingSpeciesName(species.name)}</span>
      </div>
      <Link to={next_pokemon}><AiFillCaretRight /></Link>
    </div>
  )
}
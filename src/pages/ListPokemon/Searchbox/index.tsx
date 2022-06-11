import { useState } from "react";
import './SearchBox.scss'
import { FaSearch } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'
import { format } from "path";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBox({ setSearch }: Props) {
  const [input, setInput] = useState('');

  return (
    <form className="search-box" onSubmit={e => {
      e.preventDefault()
      setSearch(input.toLowerCase())
    }}>
      <div className={'input'}>
        <input
          type="text"
          placeholder="Search pokémon"
          value={input}
          onChange={e => setInput(e.target.value)} />
        {input != '' &&
          <i className="cancel">
            <ImCancelCircle width={'60px'} onClick={() => {
              setInput('')
              setSearch('')
            }}/>
          </i>}
      </div>

      <button className="button"><FaSearch /></button>
    </form>
  )
}
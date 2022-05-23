import { useState } from "react";
import './SearchBox.css'
import { FaSearch } from 'react-icons/fa'

interface Props{
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBox({setSearch}: Props) {
  const [input, setInput] = useState('');

  return (
    <form className="searchBox" onSubmit={e => {
      e.preventDefault()
      setSearch(input)
      setInput('')
    }}>
      <input 
        className="searchInput" 
        type="text" 
        placeholder="Pesquisar Pokémon" 
        value={input} 
        onChange={e => setInput(e.target.value)}/>
      <button className="searchButton"><FaSearch /></button>
    </form>
  )
}
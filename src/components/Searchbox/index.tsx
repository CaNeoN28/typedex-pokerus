import { useState } from "react";
import './SearchBox.css'
import {FaSearch} from 'react-icons/fa'

export default function SearchBox(){
  const [search, setSearch] = useState();

  return(
    <div className="searchBox">
      <input className="searchInput" type="text" placeholder="Pesquisar Pokémon"/>
      <button className="searchButton"><FaSearch/></button>
    </div>
  )
}
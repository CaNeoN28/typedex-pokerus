import "./NavBar.scss"
import { ReactComponent as Logo } from 'assets/logo.svg'
import { Link } from "react-router-dom"
import { AiOutlineMenu } from "react-icons/ai"
import { useState } from "react"

export default function NavBar() {
  const rotas = [{
    label: 'Pokédex',
    to: '/'
  }
  ]

  return (
    <nav className="navBar">
      <Logo />
      <div className="dropdown">
        <a className="dropbutton"><AiOutlineMenu /></a>
        <div className="optionList">
          {rotas.map((rota, index) => (
            <Link key={index} to={rota.to} className="optionList__option">{rota.label}</Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
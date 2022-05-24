import "./NavBar.scss"
import { ReactComponent as Logo } from 'assets/logo.svg'
import { Link } from "react-router-dom"

export default function NavBar() {
  const rotas = [{
    label: 'Pokédex',
    to: '/'
  }
  ]

  return (
    <nav className="navBar">
      <Logo />
      <ul className="navBar__optionList">
        {rotas.map((rota, index) => (
          <li key={index} className="navBar__optionList__option">
            <Link to={rota.to}>{rota.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
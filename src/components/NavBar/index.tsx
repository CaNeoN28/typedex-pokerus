import "./NavBar.css"
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
      <ul className="navBarOptionList">
        {rotas.map((rota, index) => (
          <li key={index} className="navBarOption">
            <Link to={rota.to}>{rota.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
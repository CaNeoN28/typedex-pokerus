import "./NavBar.css"
import {ReactComponent as Logo} from 'assets/logo.svg'

export default function NavBar(){
  return(
    <nav className="navBar">
      <Logo/>
    </nav>
  )
}
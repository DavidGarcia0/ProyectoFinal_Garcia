import { Link, NavLink } from "react-router-dom"
import CartWidget from "../CartWidget/CartWidget"
import './NavBar.css'

const NavBar = () => {
    return(
        <nav className="NavBar">
            <Link to='/'>
                <h3>E-Commerce</h3>
            </Link>
            <div classnmae="Categories">
                <NavLink to={`/category/Celular`} className={({ isActive}) => isActive ? 'ActiveOption' : 'Option'}>Celulares</NavLink>
                <NavLink to={`/category/Tablet`} className={({ isActive}) => isActive ? 'ActiveOption' : 'Option'}>Tablets</NavLink>
                <NavLink to={`/category/Notebook`} className={({ isActive}) => isActive ? 'ActiveOption' : 'Option'}>Notebooks</NavLink>
            </div>
            <CartWidget />
        </nav>
    )
}

export default NavBar
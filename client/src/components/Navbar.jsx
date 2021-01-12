import   React  from 'react'
import { Link } from "react-router-dom" ;

const Navbar = () => {
    return (
        <>
            <nav>
                <div className="nav-wrapper black">
                <Link to="/" className="brand-logo left">StackFusion</Link>

                <ul id="nav-mobile" className="right">
                    <span className="material-icons ">explore</span>
                    <span className="material-icons ">person </span>
                    <span className="material-icons ">login  </span>
                </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;

import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"
import { UserContext } from '../context/useContext'

const Header = () => {
    const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false)

    const {currentUser} = useContext(UserContext);

    const closeNavHandler = () => {
        if(window.innerWidth < 800){
            setIsNavShowing(false)
        }else{
            setIsNavShowing(true)
        }
    }

    return (
    <nav>
        <div className="container nav_container">
            <Link to={"/"} className='nav_logo' onClick={closeNavHandler}>
                ErasmusBlog
            </Link>
            {currentUser?.id && isNavShowing && <ul className='nav_menu'>
                <li><Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>My Profile</Link></li>
                <li><Link to={"create"} onClick={closeNavHandler}>Create Post</Link></li>
                <li><Link to={"authors"} onClick={closeNavHandler}>Authors</Link></li>
                <li><Link to={"logout"} onClick={closeNavHandler}>Logout</Link></li>
            </ul>}
            {!currentUser?.id && isNavShowing && <ul className='nav_menu'>
                <li><Link to={"authors"} onClick={closeNavHandler}>Authors</Link></li>
                <li><Link to={"login"} onClick={closeNavHandler}>Login</Link></li>
            </ul>}
            <button className='nav_toggle-btn' onClick={() => {setIsNavShowing(!isNavShowing)}}>
                {
                    isNavShowing ? <AiOutlineClose/> : <FaBars/>
                }
            </button>
        </div>
    </nav>
  )
}

export default Header
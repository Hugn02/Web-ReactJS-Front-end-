import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'
import cart_search from '../Assets/search.png'

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    const {setShowSearch} = useContext(ShopContext);

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p>GunĐàm</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("inera")}}><Link style={{textDecoration: 'none'}} to='/inera'>INERA</Link>{menu==="inera"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("motornuclear")}}><Link style={{textDecoration: 'none'}} to='/motornuclear'>MOTOR NUCLEAR</Link>{menu==="motornuclear"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("moshow")}}><Link style={{textDecoration: 'none'}} to='/moshow'>MOSHOW</Link>{menu==="moshow"?<hr/>:<></>}</li>
            </ul>
            <div className='nav-login-cart'>
                <img onClick={()=>setShowSearch(true)} src={cart_search} alt="" />
                <button onClick={()=>setShowLogin(true)}>Đăng ký</button>
                <Link to='/cart'><img src={cart_icon} alt='' /></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>

        </div>
    )
}

export default Navbar
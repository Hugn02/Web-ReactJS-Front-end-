import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'
import cart_search from '../Assets/search.png'
import profile_icon from '../Assets/profile_icon.png'
import bag_icon from '../Assets/bag_icon.png'
import logout_icon from '../Assets/logout_icon.png'


const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems,token,setToken} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    const {setShowSearch} = useContext(ShopContext);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

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
  <img
    onClick={() => {
      if (setShowSearch) {
        setShowSearch(true); // Gọi setShowSearch nếu nó tồn tại
      } else {
        console.error("setShowSearch không được định nghĩa trong ShopContext");
      }
    }}
    src={cart_search}
    alt=""
  />
  <Link to='/cart'>
    <img src={cart_icon} alt='' />
  </Link>
  <div className='nav-cart-count'>{getTotalCartItems()}</div>
  {!token ? (
    <button onClick={() => setShowLogin(true)}>Đăng ký</button>
  ) : (
    <div className='navbar-profile'>
      <img className='img-profile' src={profile_icon} alt="" />
      <ul className="nav-profile-dropdown">
        <li onClick={()=>navigate('/myorders')}>
          <img src={bag_icon} alt="" />
          <p>Đơn hàng</p>
        </li>
        <hr />
        <li onClick={logout}>
          <img src={logout_icon} alt="" />
          <p>Đăng xuất</p>
        </li>
      </ul>
    </div>
  )}
  
</div>


        </div>
    )
}

export default Navbar
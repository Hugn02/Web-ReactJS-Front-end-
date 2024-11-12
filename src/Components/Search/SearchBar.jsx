import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import cart_search from '../Assets/search.png'
import './SearchBar.css'
import { useLocation } from 'react-router-dom'
const SearchBar = () => {

    const {search,setSearch,showSearch,setShowSearch} = useContext(ShopContext)
    const [visible,setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
        if(location.pathname.includes('motornuclear') || location.pathname.includes('inera') || location.pathname.includes('moshow')){
            setVisible(true);
        }else{
            setVisible(false);
        }
    },[location])

    
    
    return showSearch && visible ? (
        <div className="custom-box">
            <div className="custom-button">
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className="custom-input" type="text" placeholder='Tìm kiếm sản phẩm'/>
            <img className="custom-width" src={cart_search} alt="" />
            </div>
            <p onClick={()=>setShowSearch(false)} className="custom-element">X</p>
        </div>
    ) : null
}

export default SearchBar
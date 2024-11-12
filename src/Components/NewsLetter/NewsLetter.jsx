import React, { useState } from 'react'
import './NewsLetter.css'

const NewsLetter = ({setShowLogin}) => {
   

    return (
       
    
        <div className='newsletter'>
            <h1>Ưu đãi dành cho bạn trên email của bạn</h1>
            <p>Đăng ký để nhận bản tin cập nhật thông tin mới nhất</p>
            <div>
                <input type="email" placeholder='Email của bạn' />
                <button onClick={()=>setShowLogin(true)}>Đăng ký</button>
            </div>
        </div>
        
    )
}

export default NewsLetter
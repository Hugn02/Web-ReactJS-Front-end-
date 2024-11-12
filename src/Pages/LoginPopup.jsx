import React, { useState } from 'react'
import './CSS/LoginPopup.css'
import cart_remove from '../Components/Assets/cart_cross_icon.png'

const LoginPopup = ({setShowLogin}) => {
    const [currState,setCurrState] = useState("Đăng nhập")
    return (
        <div className='login-popup'>
            <form action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={()=>setShowLogin(false)} src={cart_remove} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState==="Đăng nhập"?<></>:<input type="text" placeholder='Tên đăng nhập' required/>}
                    <input type="email" placeholder='Email' required/>
                    <input type="text" placeholder='Mật khẩu' required/>
                </div>
                <button>{currState==="Đăng ký"?"Tạo tài khoản":"Đăng nhập"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required/>
                    <p>Bằng việc đăng kí, tôi đồng ý với các điều khoản sử dụng và chính sách bảo mật.</p>
                </div>
                {currState==="Đăng nhập"
                ? <p>Tạo một tài khoản mới? <span onClick={()=>setCurrState("Đăng ký")}>Nhấn vào đây</span></p>
                :<p>Bạn đã có tài khoản? <span onClick={()=>setCurrState("Đăng nhập")}>Đăng nhập</span></p>
            }
               
                
            </form>
        </div>
    )
}

export default LoginPopup
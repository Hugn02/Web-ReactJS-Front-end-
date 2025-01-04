import React, {  useContext, useState } from 'react'
import './CSS/LoginPopup.css'
import cart_remove from '../Components/Assets/cart_cross_icon.png'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {
    const {url,setToken} = useContext(ShopContext)
    const [currState,setCurrState] = useState("Đăng nhập")
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async(event) => {
        event.preventDefault()
        let newUrl = url;
        if(currState==="Đăng nhập"){
            newUrl += "/api/user/login"
        }else{
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl,data);

        if(response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        }else{
            alert(response.data.message)
        }
    }
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={()=>setShowLogin(false)} src={cart_remove} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState==="Đăng nhập"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Tên đăng nhập' required/>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required/>
                    <input name='password' onChange={onChangeHandler} value={data.password} type="text" placeholder='Mật khẩu' required/>
                </div>
                <button type='submit'>{currState==="Đăng ký"?"Tạo tài khoản":"Đăng nhập"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required/>
                    <p>Bằng việc đăng ký hoặc đăng nhập, tôi đồng ý với các điều khoản sử dụng và chính sách bảo mật.</p>
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
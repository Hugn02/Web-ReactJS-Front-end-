import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../../Context/ShopContext";
import "./UserAccount.css";

const UserAccount = () => {
    const { token, url } = useContext(ShopContext);
    const [userInfo, setUserInfo] = useState({});
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const fetchUserInfo = async () => {
        try {
            if (!token) {
                console.error("Token không tồn tại.");
                return;
            }
            const response = await axios.get("http://localhost:4000/api/user/info", {
                headers:{token}, 
            });
            if (response.data.success) {
                setUserInfo(response.data.user);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
        }
    };
    
    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4000/api/user/change-password",
                { oldPassword, newPassword },
                { headers:{token} } 
            );
            if (response.data.success) {
                alert("Đổi mật khẩu thành công!");
                setOldPassword("");
                setNewPassword("");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi đổi mật khẩu:", error);
            alert("Đã xảy ra lỗi khi đổi mật khẩu!");
        }
    };
    
    useEffect(() => {
        fetchUserInfo();
    }, [token]);

    return (
        <div className="user-account">
            <h1>Thông tin tài khoản</h1>
            <div className="user-info">
                <p><strong>Tên:</strong> {userInfo.name}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
            </div>
            <h2>Đổi mật khẩu</h2>
            <form onSubmit={handleChangePassword}>
                <div className="form-group">
                    <label>Mật khẩu cũ</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu mới</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đổi mật khẩu</button>
            </form>
        </div>
    );
};

export default UserAccount;

import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { ShopContext } from "../../Context/ShopContext";
import axios from "axios";
import parcel_icon from "../../Components/Assets/parcel_icon.png";

const MyOrders = () => {
    const { url, token } = useContext(ShopContext);
    const [data, setData] = useState([]);
    const [reviewProduct, setReviewProduct] = useState(null); // Quản lý sản phẩm cần đánh giá
    const [rating, setRating] = useState(0); // Giá trị đánh giá
    const [comment, setComment] = useState(""); // Nội dung bình luận

    const fetchOrders = async () => {
        const response = await axios.post(
            url + "/api/order/userorders",
            {},
            { headers: { token } }
        );
        setData(response.data.data);
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    const handleReview = async (productId, rating, comment) => {
        try {
            const response = await axios.post(
                url + "/api/review/add",
                {
                    productId,
                    rating,
                    comment,
                },
                { headers: { token } }
            );

            if (response.data.success) {
                alert("Đánh giá thành công!");
                setReviewProduct(null); // Ẩn form đánh giá sau khi thành công
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Đã xảy ra lỗi khi đánh giá sản phẩm!");
        }
    };

    return (
        <div className="my-orders">
            <h2>Đơn đã mua</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={parcel_icon} alt="" />
                        <p>
                            {order.items.map((item, index) =>
                                index === order.items.length - 1
                                    ? item.name + " X " + item.quantity
                                    : item.name + " X " + item.quantity + ", "
                            )}
                        </p>
                        <p>${order.totalAmount}.00</p>
                        <p>Sản phẩm: {order.items.length}</p>
                        <p>
                            <span>&#x25cf;</span>
                            <b>{order.status}</b>
                        </p>
                        <button onClick={fetchOrders}>Theo dõi đơn hàng</button>
                        <button
                            onClick={() => {
                                if (order.status === "Đã giao") {
                                    setReviewProduct(order.items[0]); // Lưu sản phẩm cần đánh giá
                                } else {
                                    alert(
                                        "Chỉ có thể đánh giá khi trạng thái đơn hàng là Đã giao."
                                    );
                                }
                            }}
                        >
                            Đánh giá sản phẩm
                        </button>
                    </div>
                ))}
            </div>

            {reviewProduct && (
    <div className="modal-overlay" onClick={() => setReviewProduct(null)}>
        <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Ngăn chặn đóng modal khi click vào nội dung
        >
            <h3>Đánh giá sản phẩm: {reviewProduct.name}</h3>
            <label>Đánh giá:</label>
            <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={star <= rating ? "star selected" : "star"}
                        onClick={() => setRating(star)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <label htmlFor="comment">Bình luận:</label>
            <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <div className="modal-actions">
                <button
                    className="btn-submit"
                    onClick={() =>
                        handleReview(reviewProduct.productId, rating, comment)
                    }
                >
                    Gửi đánh giá
                </button>
                <button
                    className="btn-cancel"
                    onClick={() => setReviewProduct(null)}
                >
                    Hủy
                </button>
            </div>
        </div>
    </div>
)}


        </div>
    );
};

export default MyOrders;

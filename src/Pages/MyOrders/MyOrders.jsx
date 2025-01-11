import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios';
import parcel_icon from '../../Components/Assets/parcel_icon.png';

const MyOrders = () => {
    const { url, token } = useContext(ShopContext);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + '/api/order/userorders', {}, { headers: { token } });
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleReview = async () => {
        if (!selectedOrder) return;

        const productId = selectedOrder.items.map((item) => item.productId);

        try {
            const response = await axios.post(
                url + '/api/review/add',
                { productId, rating, comment },
                { headers: { token } }
            );
            if (response.data.success) {
                alert('Đánh giá thành công!');
                setShowModal(false);
                fetchOrders();
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Đã xảy ra lỗi khi đánh giá sản phẩm!');
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

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
                        {order.items.every((item) => item.isReviewed) ? (
                            <button disabled>Đã đánh giá</button>
                        ) : order.status === 'Đã giao' ? (
                            <button
                                onClick={() => {
                                    setSelectedOrder(order);
                                    setShowModal(true);
                                }}
                            >
                                Đánh giá
                            </button>
                        ) : (
                            <button disabled>Chưa giao hàng</button>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal đánh giá */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <h3>Đánh giá đơn hàng</h3>
                        <p>
                            {selectedOrder?.items.map((item, idx) => (
                                <span key={idx}>
                                    {item.name}
                                    {idx < selectedOrder.items.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        <label>Đánh giá:</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${
                                        (hoverRating || rating) >= star ? 'active' : ''
                                    }`}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                >
                                    &#9733;
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
                            <button onClick={handleReview}>Gửi đánh giá</button>
                            <button onClick={() => setShowModal(false)}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrders;

import React, { useState } from 'react';
import './DescriptionBox.css';
import grade from '../Assets/gundam_grade.png';
import level from '../Assets/cac_ty_le_gundam_scale.png';

const DescriptionBox = ({ reviews }) => {
    const [activeTab, setActiveTab] = useState('description'); // Trạng thái quản lý tab hiển thị

    return (
        <div className='descriptionbox'>
            {/* Tab điều hướng */}
            <div className="descriptionbox-navigator">
                <div
                    className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => setActiveTab('description')}
                >
                    Mô tả sản phẩm
                </div>
                <div
                    className={`descriptionbox-nav-box ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Đánh giá sản phẩm ({reviews?.length || 0})
                </div>
            </div>

            {/* Nội dung tab */}
            {activeTab === 'description' && (
                <div className="descriptionbox-description">
                    <p className="descriptionbox-description1">Cấp độ Gundam - Mọi thứ cần biết về Scale và Grade Gunpla</p>
                    <p className="descriptionbox-description3">
                        Cấp độ Gundam với người chơi lâu, có kinh nghiệm đơn giản như ăn kẹo, nhưng với người mới thì nghe khá "lùng bùng". 
                        Hy vọng với bài viết này của nShop, các bạn khi mua Gunpla sẽ có thêm mốc tham khảo để chọn cho mình dòng sản phẩm phù hợp. 
                        Hãy nói về Grade và Scale của Gunpla nào.
                    </p>
                    <p className="descriptionbox-description2">Cấp độ Gundam là gì?</p>
                    <img src={grade} alt="Cấp độ Gundam" />
                    <p className="descriptionbox-description3">
                        Cấp độ Gundam là cách Bandai các mô hình Gundam của mình thành những dòng sản phẩm nhỏ hơn. 
                        Mỗi cấp độ tương ứng với các đặc tính của mô hình như độ chi tiết, số lượng runner, part, độ khó khi lắp ráp... 
                        Qua đó, người mua có thể hình dung được mẫu nào vừa sức với mình.
                    </p>
                    <p className="descriptionbox-description2">Tỷ lệ Gundam là gì?</p>
                    <img src={level} alt="Tỷ lệ Gundam" />
                    <p className="descriptionbox-description3">
                        Tỷ lệ Gundam cho biết kích thước của mô hình sau khi ráp xong sẽ cao, lớn bao nhiêu. 
                        Tỷ lệ này được tính theo kích thước thực tế của Gundam khi nó được thiết kế xuất hiện trong phim, truyện.
                    </p>
                </div>
            )}

            {activeTab === 'reviews' && (
                <div className="descriptionbox-reviews">
                    <h3>Đánh giá sản phẩm</h3>
                    {reviews?.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review">
                                <p><strong>{review?.userId?.name}</strong> - {review?.rating || 0}⭐</p>
                                <p>{review?.comment || 'Không có bình luận.'}</p>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DescriptionBox;

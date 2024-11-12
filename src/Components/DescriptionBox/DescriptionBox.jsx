import React from 'react'
import './DescriptionBox.css'
import grade from '../Assets/gundam_grade.png'
import level from '../Assets/cac_ty_le_gundam_scale.png'

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Mô tả sản phẩm</div>
                <div className="descriptionbox-nav-box fade">Đánh giá sản phẩm (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p className="descriptionbox-description1">Cấp độ Gundam - Mọi thứ cần biết về Scale và Grade Gunpla</p>
                <p className="descriptionbox-description3">
                Cấp độ Gundam với người chơi lâu, có kinh nghiệm đơn giản như ăn kẹo, nhưng với người mới thì nghe khá "lùng bùng". Hy vọng với bài viết này của nShop, các bạn khi mua Gunpla sẽ có thêm mốc tham khảo để chọn cho mình dòng sản phẩm phù hợp. Hãy nói về Grade và Scale của Gunpla nào.
                </p>
                <p className="descriptionbox-description2">Cấp độ Gundam là gì?</p>
                <img src={grade} alt="" />
                <p className="descriptionbox-description3">Cấp độ Gundam là cách Bandai các mô hình Gundam của mình thành những dòng sản phẩm nhỏ hơn. Mỗi cấp độ tương ứng với các đặc tính của mô hình như độ chi tiết, số lượng runner, part, độ khó khi lắp ráp... Qua đó, người mua có thể hình dung được mẫu nào vừa sức với mình. Bạn có thể tưởng tượng như ta đang chọn độ khó khi chơi game cho dễ hình dung.</p>
                <p className="descriptionbox-description2">Tỷ lệ Gundam là gì?</p>
                <img src={level} alt="" />
                <p className="descriptionbox-description3">Tỷ lệ Gundam cho biết kích thước của mô hình sau khi ráp xong sẽ cao, lớn bao nhiêu. Tỷ lệ này được tính theo kích thước thực tế của Gundam khi nó được thiết kế xuất hiện trong phim, truyện. Chẳng hạn như một Gundam trong phim cao 18m, thì bộ mô hình tỷ lệ 1:100 của nó sẽ có chiều cao là 18cm.</p>
            </div>
        </div>
    )
}

export default DescriptionBox
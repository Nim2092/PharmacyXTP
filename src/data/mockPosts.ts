// Mock data cho posts/news - dựa trên cấu trúc thực tế từ backend
export interface Post {
  id: number;
  title: string;
  content: string; // HTML content từ CKEditor
  image: string;
  created_at: string;
  updated_at: string;
  author?: string;
  category?: string;
  template?: 'template1' | 'template2' | 'template3' | 'template4';
  status?: 'draft' | 'published' | 'archived';
  author_id?: number;
}

// Mock posts data - nội dung phù hợp với công ty công nghệ
export const mockPostsData: Post[] = [
  {
    id: 1,
    title: "Giải pháp Kiosk Y tế thông minh - Cách mạng hóa dịch vụ y tế tự phục vụ",
    content: `
    <h2 style="color: #1e40af; text-align: center; font-size: 24px; margin-bottom: 20px;">GIẢI PHÁP KIOSK Y TẾ THÔNG MINH</h2>
      <div style="display: flex; gap: 30px; margin: 20px 0; align-items: flex-start;">
        <!-- Hình ảnh bên trái -->
        <div style="flex: 0 0 400px;">
          <img src="/home-slider-images04.jpg" alt="Kiosk Y tế thông minh" style="width: 100%; border-radius: 8px; border: 3px solid #2dd4bf; margin-bottom: 15px;" />
          <img src="/home-slider-images05.jpg" alt="Kiosk Y tế màn hình" style="width: 100%; border-radius: 8px; border: 3px solid #2dd4bf; margin-bottom: 15px;" />
          <img src="/home-slider-images01.jpg" alt="Kiosk Y tế tiếp nhận" style="width: 100%; border-radius: 8px; border: 3px solid #2dd4bf;" />
        </div>

        <!-- Nội dung bên phải -->
        <div style="flex: 1;">
          
          <h3 style="color: #1e40af; font-size: 18px; margin-bottom: 15px;">Tính năng nổi bật của Giải pháp Kiosk Y tế</h3>
          <ul style="margin-bottom: 25px;">
            <li style="margin-bottom: 8px;"><strong>Giải pháp Kiosk - Phần mềm Y tế thông minh hỗ trợ bệnh viện đón tiếp bệnh nhân, nhằm đưa những tiện ích vào để án 06/CP triển khai chuyển đổi số Quốc Gia, thanh toán không tiền mặt cho các cơ sở Y tế</strong></li>
            <li style="margin-bottom: 8px;"><strong>Đăng ký khám chữa bệnh bằng thẻ CCCD gắn chip/tài khoản VNeID bước 2.</strong></li>
            <li style="margin-bottom: 8px;"><strong>Liên thông hồ sơ sức khỏe điện tử và BHYT/VNeID</strong></li>
            <li style="margin-bottom: 8px;"><strong>Xác thực camera nhận diện khuôn mặt theo chuẩn đề án 06/CP để eKYC khi bệnh nhân tái khám</strong></li>
            <li style="margin-bottom: 8px;"><strong>Thanh toán, tra cứu viện phí online.</strong></li>
            <li style="margin-bottom: 8px;"><strong>Đăng ký khám chữa bệnh Offline-Online 24/7</strong></li>
          </ul>

          <h3 style="color: #1e40af; font-size: 18px; margin-bottom: 15px;">Lợi ích cho bệnh viện và bệnh nhân</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
              <h4 style="color: #059669; margin-bottom: 10px;">Cho Bệnh viện:</h4>
              <ul>
                <li>Giảm tải công việc cho nhân viên tiếp nhận</li>
                <li>Tăng hiệu quả quản lý hồ sơ bệnh nhân</li>
                <li>Giảm thời gian chờ đợi của bệnh nhân</li>
                <li>Tích hợp với hệ thống HIS-LIS hiện có</li>
                <li>Báo cáo và thống kê real-time</li>
              </ul>
            </div>
            <div>
              <h4 style="color: #059669; margin-bottom: 10px;">Cho Bệnh nhân:</h4>
              <ul>
                <li>Đăng ký khám nhanh chóng, tiện lợi</li>
                <li>Thanh toán không dùng tiền mặt</li>
                <li>Theo dõi lịch hẹn và kết quả khám</li>
                <li>Bảo mật thông tin cá nhân cao</li>
                <li>Trải nghiệm hiện đại, thân thiện</li>
              </ul>
            </div>
          </div>

          <h3 style="color: #1e40af; font-size: 18px; margin-bottom: 15px;">Công nghệ tiên tiến</h3>
          <p style="margin-bottom: 10px;">Hệ thống Kiosk Y tế của Hitech sử dụng các công nghệ hàng đầu:</p>
          <ul style="margin-bottom: 20px;">
            <li><strong>AI Face Recognition:</strong> Nhận diện khuôn mặt chính xác theo chuẩn 06/CP</li>
            <li><strong>NFC/RFID:</strong> Đọc thẻ CCCD gắn chip và thẻ BHYT</li>
            <li><strong>QR Code:</strong> Tích hợp với VNeID và ví điện tử</li>
            <li><strong>Cloud Integration:</strong> Đồng bộ dữ liệu trên nền tảng đám mây</li>
            <li><strong>Multi-language:</strong> Hỗ trợ đa ngôn ngữ cho bệnh nhân quốc tế</li>
          </ul>

          <blockquote style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; font-style: italic;">
            <p>"Kiosk Y tế thông minh không chỉ giúp bệnh viện hiện đại hóa quy trình tiếp nhận mà còn nâng cao trải nghiệm khám chữa bệnh cho người dân trong kỷ nguyên số."</p>
            <cite style="font-weight: bold; color: #0ea5e9;">- Ông Nguyễn Văn Minh, Giám đốc Sản phẩm Hitech</cite>
          </blockquote>
        </div>
      </div>
    `,
    image: "/home-slider-images02.jpg",
    created_at: "2025-07-01T08:00:00Z",
    updated_at: "2025-07-01T08:00:00Z",
    author: "Nguyễn Văn Minh",
    category: "Y tế số",
    template: "template1",
    status: "published",
    author_id: 1
  },
  {
    id: 2,
    title: "Kiosk Hành chính công thông minh - Số hóa dịch vụ công cho người dân",
    content: `
    <h2 style="color: #1e40af; text-align: center; font-size: 24px; margin-bottom: 20px;">GIẢI PHÁP KIOSK HÀNH CHÍNH CÔNG THÔNG MINH</h2>
      <div style="display: flex; gap: 30px; margin: 20px 0; align-items: flex-start;">
        <!-- Hình ảnh bên trái -->
        <div style="flex: 0 0 400px;">
          <img src="/home-slider-images03.jpg" alt="Kiosk Hành chính công" style="width: 100%; border-radius: 8px; border: 3px solid #2dd4bf; margin-bottom: 15px;" />
          <img src="/home-slider-images08.jpg" alt="Kiosk văn phòng" style="width: 100%; border-radius: 8px; border: 3px solid #2dd4bf; margin-bottom: 15px;" />
          <img src="/home-slider-images06.jpg" alt="Kiosk dịch vụ công" style="width: 100%; border-radius: 8px; border: 3px solid #2dd4bf;" />
        </div>

        <!-- Nội dung bên phải -->
        <div style="flex: 1;">
          
          <h3 style="color: #1e40af; font-size: 18px; margin-bottom: 15px;">Giải pháp Kiosk Hành chính công toàn diện</h3>
          <ul style="margin-bottom: 25px;">
            <li style="margin-bottom: 8px;"><strong>Giải pháp Kiosk - Phần mềm phục vụ Hành chính công thông minh hỗ trợ dịch vụ công dân tiếp Công dân, nhằm đưa những tiện ích vào để án 06/CP triển khai chuyển đổi số Quốc gia.</strong></li>
            <li style="margin-bottom: 8px;"><strong>Đăng ký dịch vụ công bằng thẻ CCCD gắn chip/tài khoản VNeID bước 2.</strong></li>
            <li style="margin-bottom: 8px;"><strong>Liên thông phần mềm số hóa dữ liệu các sở ban ngành theo chuẩn Đề án 06/CP.</strong></li>
            <li style="margin-bottom: 8px;"><strong>Đăng ký làm các thủ tục hành chính công Offline-Online 24/7</strong></li>
          </ul>

          <h3 style="color: #1e40af; font-size: 18px; margin-bottom: 15px;">Các dịch vụ công được hỗ trợ</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
              <h4 style="color: #059669; margin-bottom: 10px;">Dịch vụ UBND/Phường/Xã:</h4>
              <ul>
                <li>Cấp giấy chứng nhận tạm trú, thường trú</li>
                <li>Đăng ký kết hôn, ly hôn</li>
                <li>Cấp giấy khai sinh, khai tử</li>
                <li>Xác nhận hộ khẩu, công dân</li>
                <li>Các dịch vụ xã hội khác</li>
              </ul>
            </div>
            <div>
              <h4 style="color: #059669; margin-bottom: 10px;">Dịch vụ Sở/Ban/Ngành:</h4>
              <ul>
                <li>Cấp phép kinh doanh</li>
                <li>Đăng ký thuế, bảo hiểm</li>
                <li>Cấp phép xây dựng</li>
                <li>Đăng ký phương tiện giao thông</li>
                <li>Dịch vụ y tế, giáo dục</li>
              </ul>
            </div>
          </div>

          <h3 style="color: #1e40af; font-size: 18px; margin-bottom: 15px;">Tính năng công nghệ tiên tiến</h3>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #dc2626; margin-bottom: 10px;">🔐 Xác thực và Bảo mật</h4>
            <ul style="margin-bottom: 15px;">
              <li>Đọc thẻ CCCD gắn chip với độ chính xác cao</li>
              <li>Tích hợp VNeID bước 2 cho xác thực điện tử</li>
              <li>Sinh trắc học: vân tay, khuôn mặt, mống mắt</li>
              <li>Mã hóa dữ liệu end-to-end</li>
            </ul>

            <h4 style="color: #dc2626; margin-bottom: 10px;">📱 Giao diện và Trải nghiệm</h4>
            <ul style="margin-bottom: 15px;">
              <li>Màn hình cảm ứng 24" full HD</li>
              <li>Giao diện thân thiện, dễ sử dụng</li>
              <li>Hỗ trợ đa ngôn ngữ (Việt, Anh, Hoa, Khmer)</li>
              <li>Hướng dẫn bằng giọng nói và video</li>
            </ul>

            <h4 style="color: #dc2626; margin-bottom: 10px;">🔄 Tích hợp và Liên thông</h4>
            <ul>
              <li>Kết nối cơ sở dữ liệu quốc gia</li>
              <li>API chuẩn 06/CP</li>
              <li>Đồng bộ real-time với các hệ thống</li>
              <li>Báo cáo và thống kê tự động</li>
            </ul>
          </div>

          <h3 style="color: #1e40af; font-size: 18px; margin-bottom: 15px;">Lợi ích mang lại</h3>
          <div style="display: flex; gap: 20px; margin: 20px 0;">
            <div style="flex: 1; background: #e3f2fd; padding: 15px; border-radius: 8px;">
              <h4 style="color: #1565c0; margin-bottom: 10px;">👥 Cho Công dân:</h4>
              <ul>
                <li>Giảm thời gian chờ đợi</li>
                <li>Làm việc ngoài giờ hành chính</li>
                <li>Minh bạch quy trình</li>
                <li>Tiết kiệm chi phí đi lại</li>
              </ul>
            </div>
            <div style="flex: 1; background: #f3e5f5; padding: 15px; border-radius: 8px;">
              <h4 style="color: #7b1fa2; margin-bottom: 10px;">🏛️ Cho Cơ quan nhà nước:</h4>
              <ul>
                <li>Nâng cao hiệu quả công việc</li>
                <li>Giảm tải cho công chức</li>
                <li>Cải thiện chỉ số SIPAS</li>
                <li>Hiện đại hóa dịch vụ công</li>
              </ul>
            </div>
          </div>

          <h3 style="color: #1e40af; font-size: 18px; margin-bottom: 15px;">Triển khai thực tế</h3>
          <p style="margin-bottom: 10px;">Hitech đã triển khai thành công hệ thống Kiosk Hành chính công tại:</p>
          <ul style="margin-bottom: 20px;">
            <li><strong>UBND TP.HCM:</strong> 50+ điểm phục vụ với 95% độ hài lòng</li>
            <li><strong>Sở KH&ĐT Hà Nội:</strong> Xử lý 2000+ hồ sơ/ngày</li>
            <li><strong>UBND tỉnh An Giang:</strong> Phủ sóng 100% phường/xã</li>
            <li><strong>Trung tâm Hành chính Đà Nẵng:</strong> Giảm 60% thời gian chờ</li>
          </ul>

          <blockquote style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; font-style: italic;">
            <p>"Kiosk Hành chính công thông minh là cầu nối quan trọng trong việc xây dựng Chính phủ điện tử, mang lại sự thuận tiện tối đa cho người dân và doanh nghiệp."</p>
            <cite style="font-weight: bold; color: #0ea5e9;">- Bà Trần Thị Lan, Chuyên gia Chuyển đổi số Hitech</cite>
          </blockquote>
        </div>
      </div>
    `,
    image: "/home-slider-images10.jpg",
    created_at: "2025-06-30T14:30:00Z",
    updated_at: "2025-06-30T14:30:00Z",
    author: "Trần Thị Lan",
    category: "Chính phủ số",
    template: "template1",
    status: "published",
    author_id: 2
  },
  {
    id: 3,
    title: "Hitech ra mắt giải pháp AI cho ngành y tế: Cách mạng trong chẩn đoán bệnh",
    content: `
      <h2>Giải pháp AI tiên tiến trong y tế</h2>
      <p>Công ty Hitech vừa chính thức ra mắt hệ thống trí tuệ nhân tạo (AI) hỗ trợ chẩn đoán bệnh, đánh dấu một bước tiến quan trọng trong việc ứng dụng công nghệ vào lĩnh vực y tế.</p>
      
      <h3>Tính năng nổi bật</h3>
      <ul>
        <li><strong>Chẩn đoán hình ảnh y khoa:</strong> Phân tích X-quang, CT, MRI với độ chính xác cao</li>
        <li><strong>Hỗ trợ bác sĩ:</strong> Đưa ra gợi ý chẩn đoán dựa trên dữ liệu lâm sàng</li>
        <li><strong>Theo dõi bệnh nhân:</strong> Giám sát các chỉ số sinh hiệu quan trọng</li>
        <li><strong>Dự đoán rủi ro:</strong> Cảnh báo sớm các biến chứng có thể xảy ra</li>
      </ul>
      
      <p>Hệ thống đã được triển khai thử nghiệm tại 5 bệnh viện lớn và cho kết quả khả quan với độ chính xác lên đến 94% trong việc phát hiện các bệnh lý phổ biến.</p>
      
      <blockquote>
        <p>"Chúng tôi tin rằng AI sẽ không thay thế bác sĩ, mà sẽ giúp các bác sĩ làm việc hiệu quả hơn và đưa ra quyết định chính xác hơn trong chẩn đoán và điều trị."</p>
        <cite>- Ông Nguyễn Văn A, Giám đốc Công nghệ Hitech</cite>
      </blockquote>
    `,
    image: "/blog/phong-kham-da-khoa-vien-doan.jpg",
    created_at: "2025-06-28T10:30:00Z",
    updated_at: "2025-06-28T10:30:00Z",
    author: "Nguyễn Văn Minh",
    category: "Công nghệ",
    template: "template1",
    status: "published",
    author_id: 1
  },
  {
    id: 4,
    title: "Blockchain trong quản lý chuỗi cung ứng: Xu hướng không thể bỏ qua",
    content: `
      <h2>Blockchain - Giải pháp cho chuỗi cung ứng minh bạch</h2>
      <p>Công nghệ Blockchain đang tạo ra cuộc cách mạng trong quản lý chuỗi cung ứng, mang lại tính minh bạch và bảo mật chưa từng có.</p>
      
      <h3>Lợi ích của Blockchain trong chuỗi cung ứng</h3>
      <ul>
        <li><strong>Truy xuất nguồn gốc:</strong> Theo dõi sản phẩm từ nguồn gốc đến người tiêu dùng</li>
        <li><strong>Chống giả mạo:</strong> Ngăn chặn hàng giả, hàng nhái</li>
        <li><strong>Tự động hóa:</strong> Smart contracts giảm thiểu can thiệp thủ công</li>
        <li><strong>Tiết kiệm chi phí:</strong> Loại bỏ nhiều khâu trung gian</li>
      </ul>
      
      <h3>Ứng dụng thực tế</h3>
      <p>Hitech đã triển khai thành công giải pháp blockchain cho một số doanh nghiệp lớn trong ngành:</p>
      <ul>
        <li>Nông sản sạch: Theo dõi từ trang trại đến bàn ăn</li>
        <li>Dược phẩm: Đảm bảo thuốc chính hãng, không giả</li>
        <li>Thực phẩm: Kiểm soát an toàn thực phẩm</li>
      </ul>
      
      <p>Công nghệ này không chỉ tăng niềm tin của người tiêu dùng mà còn giúp doanh nghiệp tối ưu hóa quy trình vận hành.</p>
    `,
    image: "/blog/img-itTP-01.png",
    created_at: "2025-06-25T14:15:00Z",
    updated_at: "2025-06-25T14:15:00Z",
    author: "Trần Thị Lan",
    category: "Blockchain",
    template: "template2",
    status: "published",
    author_id: 2
  },
  {
    id: 5,
    title: "IoT và Smart City: Xây dựng thành phố thông minh tại Việt Nam",
    content: `
      <h2>Internet of Things - Kết nối mọi thứ</h2>
      <p>Internet of Things (IoT) đang từng bước biến giấc mơ thành phố thông minh thành hiện thực tại Việt Nam với các dự án tiên phong của Hitech.</p>
      
      <h3>Các giải pháp IoT cho Smart City</h3>
      
      <h4>1. Giao thông thông minh</h4>
      <ul>
        <li>Hệ thống đèn tín hiệu thích ứng</li>
        <li>Giám sát và quản lý ùn tắc giao thông</li>
        <li>Parking thông minh với sensors</li>
      </ul>
      
      <h4>2. Quản lý năng lượng</h4>
      <ul>
        <li>Đèn đường LED thông minh</li>
        <li>Hệ thống điện lưới thông minh</li>
        <li>Giám sát tiêu thụ năng lượng real-time</li>
      </ul>
      
      <h4>3. Môi trường và an ninh</h4>
      <ul>
        <li>Giám sát chất lượng không khí</li>
        <li>Hệ thống camera AI nhận diện khuôn mặt</li>
        <li>Cảnh báo thiên tai và ứng phó khẩn cấp</li>
      </ul>
      
      <h3>Dự án thử nghiệm tại TP.HCM</h3>
      <p>Hitech đang triển khai dự án thí điểm tại quận 1, TP.HCM với hơn 1000 thiết bị IoT được lắp đặt, bao gồm:</p>
      <ul>
        <li>200 cảm biến chất lượng không khí</li>
        <li>500 camera thông minh</li>
        <li>300 đèn đường LED điều khiển từ xa</li>
      </ul>
      
      <p>Kết quả ban đầu cho thấy giảm 30% ùn tắc giao thông và tiết kiệm 25% điện năng tiêu thụ cho hệ thống đèn đường.</p>
    `,
    image: "/blog/img-itTP-02.png",
    created_at: "2025-06-22T09:45:00Z",
    updated_at: "2025-06-22T09:45:00Z",
    author: "Lê Hoàng Nam",
    category: "IoT",
    template: "template3",
    status: "published",
    author_id: 3
  },
  {
    id: 6,
    title: "Big Data Analytics: Khai phá giá trị từ dữ liệu doanh nghiệp",
    content: `
      <h2>Sức mạnh của Big Data trong thời đại số</h2>
      <p>Trong kỷ nguyên số hóa, dữ liệu được ví như "dầu mỏ mới". Hitech giúp doanh nghiệp khai thác và phân tích dữ liệu để tạo ra giá trị kinh doanh thực sự.</p>
      
      <h3>Tại sao Big Data quan trọng?</h3>
      <ul>
        <li><strong>Hiểu khách hàng sâu sắc:</strong> Phân tích hành vi, sở thích của khách hàng</li>
        <li><strong>Tối ưu vận hành:</strong> Cải thiện quy trình, giảm chi phí</li>
        <li><strong>Dự đoán xu hướng:</strong> Anticipate market changes và cơ hội kinh doanh</li>
        <li><strong>Cá nhân hóa trải nghiệm:</strong> Tùy chỉnh sản phẩm/dịch vụ theo từng khách hàng</li>
      </ul>
      
      <h3>Giải pháp Big Data của Hitech</h3>
      
      <h4>1. Data Collection & Integration</h4>
      <p>Thu thập dữ liệu từ nhiều nguồn: website, mobile app, social media, IoT devices, ERP systems...</p>
      
      <h4>2. Data Processing & Storage</h4>
      <p>Sử dụng cloud infrastructure để xử lý và lưu trữ petabytes dữ liệu với Apache Spark, Hadoop.</p>
      
      <h4>3. Advanced Analytics</h4>
      <ul>
        <li>Machine Learning algorithms</li>
        <li>Predictive modeling</li>
        <li>Real-time analytics</li>
        <li>Natural Language Processing</li>
      </ul>
      
      <h4>4. Visualization & Reporting</h4>
      <p>Dashboard tương tác với Tableau, Power BI để leadership dễ dàng ra quyết định.</p>
      
      <h3>Case Study: Retail Company</h3>
      <blockquote>
        <p>Một công ty bán lẻ lớn đã tăng 40% doanh thu và giảm 25% tồn kho sau 6 tháng sử dụng giải pháp Big Data của Hitech.</p>
      </blockquote>
      
      <p>Kết quả đạt được:</p>
      <ul>
        <li>Dự đoán chính xác 85% nhu cầu sản phẩm</li>
        <li>Giảm 30% thời gian ra quyết định kinh doanh</li>
        <li>Tăng 50% hiệu quả marketing campaigns</li>
      </ul>
    `,
    image: "/blog/img-itTP-03.png",
    created_at: "2025-06-20T16:20:00Z",
    updated_at: "2025-06-20T16:20:00Z",
    author: "Phạm Văn Đức",
    category: "Big Data",
    template: "template1",
    status: "published",
    author_id: 4
  },
  {
    id: 7,
    title: "Cloud Computing: Chuyển đổi số với điện toán đám mây",
    content: `
      <h2>Điện toán đám mây - Tương lai của IT</h2>
      <p>Cloud Computing không chỉ là xu hướng mà đã trở thành necessity cho mọi doanh nghiệp muốn cạnh tranh trong thời đại số.</p>
      
      <h3>Lợi ích của Cloud Computing</h3>
      
      <h4>1. Tính linh hoạt và mở rộng</h4>
      <ul>
        <li>Scale up/down resources theo nhu cầu</li>
        <li>Pay-as-you-use model</li>
        <li>Deploy nhanh chóng</li>
      </ul>
      
      <h4>2. Tiết kiệm chi phí</h4>
      <ul>
        <li>Không cần đầu tư hardware ban đầu</li>
        <li>Giảm chi phí bảo trì</li>
        <li>Tối ưu hóa tài nguyên IT</li>
      </ul>
      
      <h4>3. Bảo mật và độ tin cậy</h4>
      <ul>
        <li>Enterprise-grade security</li>
        <li>Automatic backups</li>
        <li>99.9% uptime guarantee</li>
      </ul>
      
      <h3>Dịch vụ Cloud của Hitech</h3>
      
      <h4>Infrastructure as a Service (IaaS)</h4>
      <p>Cung cấp servers, storage, networking ảo hóa với performance cao.</p>
      
      <h4>Platform as a Service (PaaS)</h4>
      <p>Môi trường development và deployment cho ứng dụng web, mobile.</p>
      
      <h4>Software as a Service (SaaS)</h4>
      <p>Các ứng dụng business ready: CRM, ERP, HRM, Accounting...</p>
      
      <h3>Migration Strategy</h3>
      <ol>
        <li><strong>Assessment:</strong> Đánh giá hệ thống hiện tại</li>
        <li><strong>Planning:</strong> Lập kế hoạch migration chi tiết</li>
        <li><strong>Testing:</strong> Thử nghiệm trong môi trường sandbox</li>
        <li><strong>Migration:</strong> Chuyển đổi từng bước, đảm bảo zero downtime</li>
        <li><strong>Optimization:</strong> Tối ưu performance và cost</li>
      </ol>
      
      <h3>Success Stories</h3>
      <p><strong>Ngân hàng ABC:</strong> Giảm 60% chi phí IT và tăng 300% tốc độ deploy ứng dụng mới.</p>
      <p><strong>Công ty XYZ:</strong> Scale từ 1000 đến 100,000 users chỉ trong 3 tháng nhờ cloud infrastructure.</p>
    `,
    image: "/blog/img-itTP-04.png",
    created_at: "2025-06-18T11:30:00Z",
    updated_at: "2025-06-18T11:30:00Z",
    author: "Võ Thị Hương",
    category: "Cloud",
    template: "template2",
    status: "published",
    author_id: 5
  },
  {
    id: 8,
    title: "Cybersecurity: Bảo vệ doanh nghiệp trong thời đại số",
    content: `
      <h2>An ninh mạng - Lá chắn bảo vệ doanh nghiệp</h2>
      <p>Với sự gia tăng của các cuộc tấn công mạng, cybersecurity đã trở thành ưu tiên hàng đầu của mọi tổ chức.</p>
      
      <h3>Thực trạng an ninh mạng tại Việt Nam</h3>
      <ul>
        <li>Tăng 150% số vụ tấn công mạng trong năm 2024</li>
        <li>Thiệt hại trung bình 2.5 tỷ VNĐ/vụ tấn công</li>
        <li>80% doanh nghiệp chưa có chiến lược cybersecurity</li>
      </ul>
      
      <h3>Các mối đe dọa phổ biến</h3>
      
      <h4>1. Ransomware</h4>
      <p>Mã hóa dữ liệu và đòi tiền chuộc, có thể làm tê liệt hoạt động kinh doanh.</p>
      
      <h4>2. Phishing</h4>
      <p>Lừa đảo qua email để đánh cắp thông tin đăng nhập và dữ liệu nhạy cảm.</p>
      
      <h4>3. Insider Threats</h4>
      <p>Rủi ro từ chính nhân viên nội bộ, có thể vô tình hoặc cố ý.</p>
      
      <h4>4. IoT Vulnerabilities</h4>
      <p>Thiết bị IoT kém bảo mật trở thành cửa ngõ cho hacker.</p>
      
      <h3>Giải pháp Cybersecurity của Hitech</h3>
      
      <h4>1. Security Assessment</h4>
      <ul>
        <li>Penetration testing</li>
        <li>Vulnerability scanning</li>
        <li>Security audit</li>
      </ul>
      
      <h4>2. Endpoint Protection</h4>
      <ul>
        <li>Advanced antivirus/anti-malware</li>
        <li>Device control</li>
        <li>Application whitelisting</li>
      </ul>
      
      <h4>3. Network Security</h4>
      <ul>
        <li>Next-generation firewalls</li>
        <li>Intrusion detection/prevention</li>
        <li>Network segmentation</li>
      </ul>
      
      <h4>4. Security Operations Center (SOC)</h4>
      <ul>
        <li>24/7 monitoring</li>
        <li>Incident response</li>
        <li>Threat hunting</li>
      </ul>
      
      <h3>Best Practices</h3>
      <ol>
        <li><strong>Employee Training:</strong> Đào tạo nhận thức bảo mật</li>
        <li><strong>Regular Updates:</strong> Cập nhật patches thường xuyên</li>
        <li><strong>Backup Strategy:</strong> Sao lưu dữ liệu định kỳ</li>
        <li><strong>Access Control:</strong> Principle of least privilege</li>
        <li><strong>Incident Plan:</strong> Kế hoạch ứng phó sự cố</li>
      </ol>
      
      <blockquote>
        <p>"Cybersecurity is not a destination, but a journey. We need to constantly evolve our defenses to stay ahead of cyber criminals."</p>
        <cite>- Chuyên gia An ninh mạng Hitech</cite>
      </blockquote>
    `,
    image: "/blog/img-itTP-05.png",
    created_at: "2025-06-15T13:45:00Z",
    updated_at: "2025-06-15T13:45:00Z",
    author: "Nguyễn Thành Long",
    category: "Bảo mật",
    template: "template3",
    status: "published",
    author_id: 6
  }
];

// Mock API functions
export const postsAPI = {
  // Lấy tất cả posts - thay thế cho fetch('http://localhost:8080/posts')
  getAllPosts: async (): Promise<Post[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPostsData.filter(post => post.status === 'published');
  },

  // Lấy post theo ID - thay thế cho fetch(`http://localhost:8080/posts/${id}`)
  getPostById: async (id: string | number): Promise<Post | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const post = mockPostsData.find(post => post.id === Number(id));
    return post && post.status === 'published' ? post : null;
  },

  // Lấy posts theo category
  getPostsByCategory: async (category: string): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return mockPostsData.filter(post => 
      post.status === 'published' && 
      post.category?.toLowerCase().includes(category.toLowerCase())
    );
  },

  // Search posts
  searchPosts: async (query: string): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const searchTerm = query.toLowerCase();
    return mockPostsData.filter(post => 
      post.status === 'published' && (
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.category?.toLowerCase().includes(searchTerm)
      )
    );
  }
};

// Utility functions
export const stripHtml = (html: string): string => {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '');
};

export const truncateContent = (content: string, maxLength: number = 150): string => {
  const stripped = stripHtml(content);
  return stripped.length > maxLength 
    ? stripped.substring(0, maxLength) + '...' 
    : stripped;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Test function
export const testMockPostsData = () => {
  console.log('🧪 Testing Mock Posts Data:');
  console.log('✅ Total Posts:', mockPostsData.length);
  console.log('✅ Published Posts:', mockPostsData.filter(p => p.status === 'published').length);
  console.log('✅ Categories:', [...new Set(mockPostsData.map(p => p.category))]);
  console.log('✅ Templates:', [...new Set(mockPostsData.map(p => p.template))]);
  return true;
};

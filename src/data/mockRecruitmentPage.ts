// Mock data cho recruitment page - dựa trên dữ liệu thực tế từ backend
export interface RecruitmentPageData {
  banner: string;
  bannerTitle: string;
  mainTitle: string;
  intro: {
    logo: string;
    text: string;
  };
  hexagonImages: {
    src: string;
    alt: string;
  }[];
  goals: {
    icon: string;
    title: string;
    desc: string;
  }[];
  goalsTitle?: string;
  goalsIcon?: string;
  studentImages: {
    src: string;
    alt: string;
  }[];
  studentImagesTitle?: string;
  studentProject2: {
    src: string;
    alt?: string;
  }[];
  studentContent: string;
  recruitments: {
    id?: number;
    location: string;
    wage: string;
    address: string;
    time: string;
  }[];
  recruitmentsTitle?: string;
  studentBenefits?: string[];
  projectExamples?: string[];
}

// Mock data chính - dựa trên dữ liệu thực tế của bạn
export const mockRecruitmentPageData: RecruitmentPageData = {
  banner: "/uploads/1750345861123-z6720453861719_3a49cbabaab91f8b902b0f1bc2d76e9d.jpg",
  bannerTitle: "NƠI CHUYỂN GIAO TRI THỨC CÔNG NGHỆ, PHÁT TRIỂN NHÂN TÀI TƯƠNG LAI",
  mainTitle: "Hitech - Kết Nối Tri Thức & Công Nghệ",
  intro: {
    logo: "/uploads/1750350940513-hitechlogo.png",
    text: "Hitech không chỉ là một tổ chức công nghệ mà còn là cầu nối tri thức, nơi chuyển giao công nghệ tiên tiến và nuôi dưỡng thế hệ nhân tài tương lai. Chúng tôi cam kết mang đến những giải pháp đổi mới, giúp cá nhân và doanh nghiệp nắm bắt cơ hội trong kỷ nguyên số, tối ưu hiệu suất làm việc và phát triển bền vững. Với sứ mệnh thúc đẩy sáng tạo và kết nối công nghệ với thực tiễn, Hitech luôn đồng hành cùng doanh nghiệp, tổ chức và cá nhân trên hành trình ứng dụng công nghệ vào cuộc sống và công việc, tạo ra những giá trị thiết thực và bền vững."
  },
  hexagonImages: [
    {
      src: "/uploads/1750842903011-z6716151629120_16adf7e5af4e2cbfe9a3a458273a8c9d.jpg",
      alt: "Sự kiện 1"
    },
    {
      src: "/uploads/1750350484644-z6716151621900_5ba197719f3dd6a12c3d0bcaa69b4d1a.jpg",
      alt: ""
    },
    {
      src: "/uploads/1750350484658-z6716161245877_f612b3332ed1cd4900e40353a5127c53.jpg",
      alt: ""
    },
    {
      src: "/uploads/1750350484671-z6716161258858_0c67d4b2f661236b5e2dca7e0b8ba44e.jpg",
      alt: ""
    },
    {
      src: "/uploads/1750350484687-z6716151567559_bd2dade2ad58f16f583d73276e781bca.jpg",
      alt: ""
    }
  ],
  goalsTitle: "Mục tiêu của chúng tôi",
  goals: [
    {
      icon: "/uploads/1750350870183-istockphoto-1352367851-612x612.jpg",
      title: "Chuyển giao công nghệ",
      desc: "Đưa những giải pháp hiện đại vào thực tiễn, giúp doanh nghiệp và cá nhân ứng dụng hiệu quả. Công nghệ vào cuộc sống."
    },
    {
      icon: "/uploads/1750350870241-download.png",
      title: "Phát triển nhân tài",
      desc: "Đào tạo và bồi dưỡng nguồn nhân lực chất lượng cao, trang bị kiến thức và kỹ năng cần thiết để dẫn đầu trong thời đại số."
    },
    {
      icon: "/uploads/1750350870264-download.jfif",
      title: "Thúc đẩy đổi mới sáng tạo",
      desc: "Xây dựng môi trường khuyến khích tư duy sáng tạo, đổi mới trong lĩnh vực công nghệ."
    }
  ],
  studentImagesTitle: "Hình ảnh của sinh viên đang thực hành dự án",
  studentImages: [
    {
      src: "/uploads/1750350192197-z6716151561506_7334069cd9c27ccfd2ef82083ccd0f41.jpg",
      alt: "Sinh viên thực hành 1"
    },
    {
      src: "/uploads/1750350192664-z6716151589410_52c5ff47a23ee18d6353ec5f7cfa7bc1.jpg",
      alt: ""
    },
    {
      src: "/uploads/1750350192845-z6716151656391_7f006c8950120e29e668bbe7ffcc9692.jpg",
      alt: ""
    }
  ],
  studentProject2: [
    {
      src: "/uploads/1750353127126-z6716151549647_88450e02c6ef28d48df96f9a9b64fb5f.jpg"
    },
    {
      src: "/uploads/1750353127225-z6716151552190_e2976d23367a0467555533daadd95bb8.jpg",
      alt: ""
    },
    {
      src: "/uploads/1750353127316-z6716151590733_aa49390c1c87f4caf8553f01eef74889.jpg",
      alt: ""
    }
  ],
  studentContent: `<p><strong>Sinh viên thực hành dự án công nghệ thông tin</strong></p><p>Trong quá trình học tập, sinh viên ngành Công nghệ Thông tin được trực tiếp tham gia vào các dự án thực tế nhằm rèn luyện kỹ năng chuyên môn, phát triển tư duy sáng tạo và giải quyết vấn đề.</p><h3><strong>Thông qua các dự án này, sinh viên có cơ hội:</strong></h3><ul><li>Áp dụng kiến thức đã học như lập trình, cơ sở dữ liệu, trí tuệ nhân tạo, phát triển web/app… vào bài toán thực tế.</li><li>Làm việc theo nhóm như một mô hình doanh nghiệp thu nhỏ: phân chia vai trò, quản lý tiến độ và báo cáo kết quả.</li><li>Tiếp cận công nghệ mới như điện toán đám mây, IoT, blockchain, DevOps…</li><li>Tương tác với doanh nghiệp, nhận phản hồi từ chuyên gia và khách hàng thật.</li></ul><h3><strong>Các dự án có thể bao gồm:</strong></h3><ul><li>Xây dựng ứng dụng quản lý học tập.</li><li>Thiết kế hệ thống đặt lịch thông minh cho doanh nghiệp.</li><li>Phát triển chatbot hỗ trợ tư vấn khách hàng.</li><li>Ứng dụng AI trong xử lý ảnh hoặc phân tích dữ liệu.</li></ul><p>Việc thực hành dự án không chỉ giúp sinh viên tự tin hơn khi bước vào môi trường làm việc thực tế mà còn là bước đệm để các bạn trở thành những kỹ sư công nghệ năng động, sáng tạo và thích nghi tốt với xu hướng phát triển của thời đại số.</p>`,
  recruitmentsTitle: "CƠ HỘI NGHỀ NGHIỆP",
  recruitments: [
    {
      id: 1,
      location: "Intern Front End",
      wage: "Thỏa thuận",
      address: "Hà Nội",
      time: "Hạn hồ sơ 30/03/2025"
    },
    {
      location: "Intern Back End",
      wage: "Thỏa thuận", 
      address: "Hà Nội",
      time: "Hạn hồ sơ 30/03/2025"
    },
    {
      location: "Intern AI",
      wage: "Thỏa thuận",
      address: "Hà Nội", 
      time: "Hạn hồ sơ 30/03/2025"
    }
  ],
  studentBenefits: [
    "Áp dụng kiến thức đã học như lập trình, cơ sở dữ liệu, trí tuệ nhân tạo, phát triển web/app… vào bài toán thực tế.",
    "Làm việc theo nhóm như một mô hình doanh nghiệp thu nhỏ: phân chia vai trò, quản lý tiến độ và báo cáo kết quả.",
    "Tiếp cận công nghệ mới như điện toán đám mây, IoT, blockchain, DevOps…",
    "Tương tác với doanh nghiệp, nhận phản hồi từ chuyên gia và khách hàng thật."
  ],
  projectExamples: [
    "Xây dựng ứng dụng quản lý học tập.",
    "Thiết kế hệ thống đặt lịch thông minh cho doanh nghiệp.",
    "Phát triển chatbot hỗ trợ tư vấn khách hàng.",
    "Ứng dụng AI trong xử lý ảnh hoặc phân tích dữ liệu.",
    "Việc thực hành dự án không chỉ giúp sinh viên tự tin hơn khi bước vào môi trường làm việc thực tế mà còn là bước đệm để các bạn trở thành những kỹ sư công nghệ năng động, sáng tạo và thích nghi tốt với xu hướng phát triển của thời đại số."
  ]
};

// Mock API functions
export const recruitmentPageAPI = {
  // Lấy dữ liệu trang recruitment - thay thế cho axios.get('http://localhost:8080/recruitment-page')
  getRecruitmentPageData: async (): Promise<{ data: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Trả về giống format của backend: { data: JSON.stringify(data) }
    return {
      data: JSON.stringify(mockRecruitmentPageData)
    };
  }
};

// Utility function để test mock data
export const testMockData = () => {
  console.log('🧪 Testing Mock Recruitment Data:');
  console.log('✅ Banner:', mockRecruitmentPageData.banner);
  console.log('✅ Main Title:', mockRecruitmentPageData.mainTitle);
  console.log('✅ Goals Count:', mockRecruitmentPageData.goals.length);
  console.log('✅ Student Images Count:', mockRecruitmentPageData.studentImages.length);
  console.log('✅ Recruitments Count:', mockRecruitmentPageData.recruitments.length);
  console.log('✅ Hexagon Images Count:', mockRecruitmentPageData.hexagonImages.length);
  return true;
};

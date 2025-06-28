'use client';
import { useState } from 'react';
import Image from "next/image";
import style from "@/app/style/styles.module.css";
import Navigation from "@/components/navigation";
import Link from "next/link";
import BannerSlider from "@/components/BannerSlider";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export default function Home() {
  const items = [
    {
      id: 1,
      title: 'Product 01',
      cpu: 'Intel® Xeon® E5-26XX',
      image: '/home-slider-images01.jpg'
    },
    {
      id: 2,
      title: 'Product 02',
      cpu: 'Intel® Xeon® E5-26XX',
      image: '/home-slider-images03.jpg'
    },
    {
      id: 3,
      title: 'Product 03',
      cpu: 'Intel® Xeon® E5-26XX',
      image: '/home-slider-images02.jpg'
    },
    {
      id: 4,
      title: 'Product 03',
      cpu: 'Intel® Xeon® E5-26XX',
      image: '/home-slider-images04.jpg'
    },
    {
      id: 5,
      title: 'Product 03',
      cpu: 'Intel® Xeon® E5-26XX',
      image: '/home-slider-images05.jpg'
    },
    {
      id: 6,
      title: 'Product 03',
      cpu: 'Intel® Xeon® E5-26XX',
      image: '/home-slider-images06.jpg'
    },
    {
      id: 7,
      title: 'Product 03',
      cpu: 'Intel® Xeon® E5-26XX',
      image: '/home-slider-images07.jpg'
    },
    {
      id: 8,
      title: 'Product 03',
      cpu: 'Intel® Xeon® E5-26XX',
      image: '/home-slider-images08.jpg'
    },
    {
      id: 9,
      title: 'Product 03',
      cpu: 'Intel® Xeon® E5-26XX',
      image: '/home-slider-images09.jpg'
    },
    {
      id: 10,
      title: 'Product 03',
      cpu: 'Intel® Xeon® E5-26XX',
      image: '/home-slider-images10.jpg'
    }
  ];
  const [logos] = useState([
    "/partners/Logo-hanh-chinh-cong.jpg",
    "/partners/bo-y-te.png",
    "/partners/logo-giao-duc-2.jpg",
    "/partners/bidv-logo.png",
    "/partners/niad-logo-2.jpg",
    "/partners/virtnam-post-logo.png",
  ])
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 11) % items.length);                                   
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };
  const visibleItems = [
    items[currentIndex],
    items[(currentIndex + 1) % items.length],
    items[(currentIndex + 2) % items.length],
    items[(currentIndex + 3) % items.length]
  ];
  // xác thực OTP
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  // Gửi OTP đến email
  const sendOtp = async () => {
    setMessage("");
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setMessage("OTP đã được gửi!");
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("Lỗi khi gửi OTP!");
    }
  };
  // Xác thực OTP
  const verifyOtp = async () => {
    setMessage("");
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("OTP hợp lệ!");
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("Lỗi khi xác thực OTP!");
    }
  };
  return (
    <main className={`${style.mainIndex} w-[70%] bg-white ml-[15%] mr-[15%] relative top-[20vh] flex flex-col shadow-md`}>
      <div className='w-full h-10 bg-[#005db2] flex items-center'>
        <div className='flex justify-end h-full max-w-[1170px] w-full m-auto'>
          <ul className='p-0 m-0 h-full list-none flex items-center'>
            <li className='cursor-pointer h-full items-center py-2 relative mr-4'>
            </li>
          </ul>
        </div>
      </div>
      <Navigation />
      <BannerSlider />
      <section className={`${style.partners} p-0`}>
        <div className={`${style.customers} max-w-[1170px] w-full m-auto`}>
          <div className={`${style.title} text-[40px] ml-[2px] mt-11`}>
            <div className="flex w-[20%] h-[2.9px]">
              <div className="flex-[1] bg-[#e91e1e]"></div>
              <div className="flex-[9] bg-[#f8b133]"></div>
            </div>
            <h2 className="mt-4">
              CÁC THỰC TẬP VIÊN ĐANG  HỌC TRÊN CÁC DỰ ÁN THỰC TẾ
            </h2>
          </div>
        </div>
      </section>
      <section className='pb-[3.125rem] pt-[3.125rem] overflow-hidden'>
        <div className='w-full flex justify-center'>
          <div className="flex w-[5%] h-[3.2px]">
            <div className="flex-[10] bg-[#e91e1e]"></div>
          </div>
        </div>
        <div className={`${style.service} flex items-center justify-center  relative z-[999]`}>
          <div
            className="flex justify-center w-12 h-3/4 items-center float-left left-3 cursor-pointer group absolute z-50"
            onClick={handlePrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-12 opacity-100 group-hover:opacity-65 text-[#9c9c9c] hover:text-[#5f5e5efa]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </div>
          <div className="w-full max-500:flex-shrink-0 p-5 relative overflow-hidden">
            <div
              className={`${style.mediaFlx} flex w-full max-500:w-full overflow-hidden transition-transform duration-[900ms] ease-in-out`}
              style={{
                // transform: `translateX(-${currentIndex * 25}%)`,
              }}
            >
              {visibleItems.map((item) => (
                <div key={item.id} className={`${style.cloud} max-500:flex-shrink-0 p-1 transition-transform duration-700 w-1/4 ease-in-out`}>
                  <div className={`${style.inNiad} bg-[#ffffff] hover:scale-y-105 transform transition-transform duration-300 ease-in-out`}>
                    <div className="flex justify-center text-center w-full">
                      <Image
                        className='w-full max-h-[160px] h-auto min-h-[160px] max-500:min-h-[300px]'
                        src={item.image}
                        width={300}
                        height={300}
                        alt={item.title}
                      />
                    </div>
                  </div >
                </div >
              ))
              }
            </div >
          </div >
          <div
            className="flex justify-center w-12 h-3/4 items-center float-right right-3 cursor-pointer group absolute"
            onClick={handleNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-12 opacity-100 group-hover:opacity-65 text-[#9c9c9c] hover:text-[#5f5e5efa]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
      </section >
      <section className={`${style.whyBox} mt-[50px]`} >
        <div className={`${style.firstLine} `}>
          <div className={`${style.container} flex justify-between items-center mt-[-60px] max-w-[1170px] w-full m-auto`}>
            <div className="text-[40px] ml-[2px]">
              <div className="flex w-[30%] h-[2.9px]">
                <div className="flex-[2] bg-[#e91e1e]"></div>
                <div className="flex-[8] bg-[#f8b133]"></div>
              </div>
              <br />
              <h2 className="ml-[10px]">
                Vì sao chọn XTP - AI, BIG DATA?
              </h2>
            </div>
            <div className={`${style.content} mr-6`}>
              <Image width={100} height={100} src={'/asset1.png'} alt="asset" />
              <div className="cmt leading-[26px] text-justify font-[Roboto] font-[14px]">
                XTP – AI, Big Data  được cung ứng dụng rộng rãi trong ngành Y tế - nhà cung cấp giải pháp quản trị tiên phong tại Việt Nam với uy tín thương hiệu lâu đời, chất lượng chăm sóc khách hàng vượt trội cùng với những ưu điểm nổi bật của dịch vụ như:
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.whyBox}`}>
          <div className={`${style.container} max-w-[1170px] w-full m-auto`}>
            <div className={`${style.inside} flex w-[calc(100% +60px)]`}>
              <div className={`${style.items}`}>
                <div className={`${style.jay} p-[20px]`}>
                  <div className={`${style.img}`}>
                    <Image className="h-[60px] w-[60px]" width={60} height={60} src={'/iconitems/technologyIcon.png'} alt="icon item" />
                  </div>
                  <div className={`${style.content}`}>
                    <h5>Công nghệ hiện đại</h5>
                    <p className="cmt leading-[21px] text-justify font-[Roboto] text-[14px]">Công nghệ được ứng dụng rất rộng rãi và nổi tiếng như OpenStack và xây dựng theo mô hình Self-service giúp mềm dẻo trong cung cấp dịch vụ công nghệ riêng.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${style.items}`}>
                <div className={`${style.jay} p-[20px]`}>
                  <div className={`${style.img}`}>
                    <Image className="h-[60px] w-[60px]" width={60} height={60} src={'/iconitems/safeIcon.png'} alt="icon item" />
                  </div>
                  <div className={`${style.content}`}>
                    <h5>An toàn đáng tin cậy</h5>
                    <p className="cmt leading-[21px] text-justify font-[Roboto] text-[14px]">Hệ thống bảo mật An toàn thông tin máy chủ được đặt tại Trung tâm dữ liệu lớn, đáp ứng theo chuẩn quốc tế. Cam kết ổn định, an toàn, bảo mật, tiết kiệm thời gian.
                    </p>
                  </div>
                </div>
              </div>
              <div className={`${style.items}`}>
                <div className={`${style.jay} p-[20px]`}>
                  <div className={`${style.img}`}>
                    <Image className="h-[60px] w-[50px]" width={60} height={60} src={'/iconitems/qualityIcon.png'} alt="icon item" />
                  </div>
                  <div className={`${style.content}`}>
                    <h5>Chất lượng cao</h5>
                    <p className="cmt leading-[21px] text-justify font-[Roboto] text-[14px]">Dịch vụ cung cấp các giải pháp quản trị phần mềm của XTP – AI, Big Data được phát triển trên các cụm máy chủ phiến chuyên dụng cho hạ tầng đám mây giúp tối ưu hoá tốc độ truy xuất.
                    </p>
                  </div>
                </div>
              </div>
              <div className={`${style.items}`}>
                <div className={`${style.jay} p-[20px]`}>
                  <div className={`${style.img}`}>
                    <Image className="h-[60px] w-[60px]" width={60} height={60} src={'/iconitems/likeIcon.png'} alt="icon item" />

                  </div>
                  <div className={`${style.content}`}>
                    <h5>Chuyên nghiệp</h5>
                    <p className="cmt leading-[21px] text-justify font-[Roboto] text-[14px]">Đội ngũ hỗ trợ kỹ thuật trực tuyến 24/24 luôn có mặt giải quyết các thắc mắc của khách hàng sớm nhất. Chuyên nghiệp và thân thiện.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${style.tbaleNiad} !p-0 w-full`}>
        <div className={`${style.containeTb} max-w-[1170px] `}>
          <div className={`${style.listTb} flex mr-[3px] items-stretch`}>
            {/* Giám Giám sát sản xuất */}
            <div className={`${style.item}`}>
              <div className={`${style.in} `}>
                <div className={`${style.hot}`}>
                  <span>hot</span>
                </div>
                <div className={`${style.img}`}>
                  <Image width={800} height={800} src="/product/Giam-sat-san-xuat.png" alt="product" />
                </div>
                <div className={`${style.detail} min-h-[250px] flex flex-col justify-between h-full`}>
                  <form action="">
                    <h4>Sản phẩm giám sát sản xuất</h4>
                    <ul className="m-0 p-0 lists flex-1">
                      <li className='!leading-[1.93]'>
                        Quản lý hệ thống camera tập trung
                        Quản lý, giám sát an toàn những vùng cấm trong nhà máy
                        Cảnh báo giám sát an toàn toàn cho xe nâng Đếm...
                      </li>
                    </ul>
                    <Link className={`${style.viewGia}`} href="/product/ai-in-management/online-patient-care">
                      <span className="ml-[50px]">Xem thêm</span>
                      <Image className="ml-3" width={28} height={28} src="/icon/iconLeft-witth.png" alt="gia" />
                    </Link>
                  </form>
                </div>
              </div>
            </div>
            <div className={`${style.item}`}>
              <div className={`${style.in}`}>
                <div className={`${style.hot}`}>
                  <span>hot</span>
                </div>
                <div className={`${style.img}`}>
                  <Image width={300} height={300} src="/product/benh-vien-thong-minh-his-lis.png" alt="product" />
                </div>
                <div className={`${style.detail} flex flex-col justify-between h-full`}>
                  <form action="">
                    <h4> Bệnh viện thông minh HIS và LIS </h4>
                    <ul className="m-0 p-0 lists flex-1">
                      <li className='!leading-[1.93]'>
                        Phần mềm quản lý bệnh viện đầu và cuối
                        Phần mềm quản lý máy y tế
                        Phần mềm quản lý thông tin chuẩn đoán hình ảnh
                        Phần mềm bệnh án điện tử...
                      </li>
                    </ul>
                    <Link className={`${style.viewGia}`} href="/product/hospital/smart-hospital">
                      <span className="ml-[50px]">Xem thêm</span>
                      <Image className="ml-3" width={28} height={28} src="/icon/iconLeft-witth.png" alt="gia" />
                    </Link>
                  </form>
                </div>
              </div>
            </div>
            <div className={`${style.item}`}>
              <div className={`${style.in}`}>
                <div className={`${style.hot}`}>
                  <span>hot</span>
                </div>
                <div className={`${style.img}`}>
                  <Image width={300} height={300} src="/product/kiost-tron-y-te-thong-minh.png" alt="product" />
                </div>
                <div className={`${style.detail} flex flex-col justify-between h-full`}>
                  <form action="">
                    <h4> Kiosk quản lý thanh toán không tiền mặt </h4>
                    <ul className="m-0 p-0 lists flex-1">
                      <li className='!leading-[1.93]'> Kiosk Y tế thông minh hỗ trợ bệnh viện đón tiếp bệnh nhân, nhằm đưa những tiện ích vào
                        đề án 06 triển khai chuyển đổi số Quốc Gia...
                      </li>
                    </ul>
                    <Link className={`${style.viewGia}`} href="/product/self-service-kios/payment-kiosk">
                      <span className="ml-[50px]">xem thêm</span>
                      <Image className="ml-3" width={28} height={28} src="/icon/iconLeft-witth.png" alt="gia" />
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className={`${style.infoTb} w-[291px] mt-5`}>
            <div className="text-[40px] ml-[2px] mt-4">
              <div className={`${style.mobile} flex w-[55%] h-[3.9px]`}>
                <div className="flex-[3] bg-[#e91e1e]"></div>
                <div className="flex-[7] bg-[#f8b133]"></div>
              </div>
              <h3 className="mt-3">
                Gói dịch vụ
              </h3>
            </div>
            <p className="!leading-[26px] text-justify">
              Hệ thống cung cấp dịch vụ của XTP – AI, Big Data được được xây dựng và phát triển trên nền tảng mã nguồn mở. Đây là giải pháp được rất nhiều nền tảng lõi hãng công nghệ hàng đầu trên thế giới cung cấp, kết hợp.
            </p>
            <ul>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 mr-4"
                  style={{ color: '#7FB3D5' }}
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
                Cam kết uptime 99.99%
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 mr-4"
                  style={{ color: '#7FB3D5' }}
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
                khởi tạo nhanh, dễ dàng nâng cấp
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 mr-4"
                  style={{ color: '#7FB3D5' }}
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
                An toàn và bảo mật dữ liệu
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className={`${style.partners} p-0`}>
        <div className={`${style.customers} max-w-[1170px] w-full m-auto`}>
          <div className={`${style.title} text-[40px] ml-[2px] mt-11`}>
            <div className="flex w-[30%] h-[2.9px]">
              <div className="flex-[4] bg-[#e91e1e]"></div>
              <div className="flex-[6] bg-[#f8b133]"></div>
            </div>
            <h2 className="mt-4">
              ĐỐI TÁC & KHÁCH HÀNG
            </h2>
          </div>
          <div className={`${style.swiperContainer} mt-[30px] w-full h-full`}>
            <div className={`${style.swiperWrapper}`} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
              <div className="w-full overflow-hidden bg-white py-4 relative">
                <div className="flex gap-2 animate-slide">
                  {[...logos, ...logos].map((logo, index) => (
                    <div key={index} className="flex-shrink-0 w-[calc(100%/6)]">
                      <Image width={1000} height={300} className='w-full h-auto max-w-[80%] max-h-[50%] min-w-[60%] min-h-[50%]' src={logo} alt={`Logo ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
              <style>
                {`
                          @keyframes slide {
                              from { transform: translateX(0); }
                              to { transform: translateX(-100%); }
                          }
                          .animate-slide {
                              display: flex;
                              white-space: nowrap;
                              animation: slide 20s linear infinite;
                          }
                `}
              </style>
            </div>
          </div>
        </div>
      </section>
      <section className={`${style.contact} py-[1.125rem] overflow-hidden relative`}>
        <div className={`${style.container} max-w-[1170px] w-full !ml-[38px]`}>
          <div className={`${style.title} text-[40px] ml-[2px] mt-10`}>
            <div className="flex w-[20%] h-[2.9px]">
              <div className="flex-[5] bg-[#e91e1e]"></div>
              <div className="flex-[5] bg-[#f8b133]"></div>
            </div>
            <h2 className="mt-4"> LIÊN HỆ VỚI CHÚNG TÔI </h2>
          </div>
          <div className={`${style.form} relative`}>
            <form onSubmit={(e) => e.preventDefault()}>
              <ul className='space-y-4'>
                <li> <input type="text" placeholder="Họ Và Tên(*)" required /> </li>
                <li> <input type="text" placeholder="Số điện thoại(*)" maxLength={10} required /> </li>
                <li>
                  <input type="email" placeholder="Email(*)" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <button type="button" onClick={sendOtp} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
                    Gửi OTP
                  </button>
                </li>
                <li> <input type="text" placeholder="Nội dung" /></li>
                {otpSent && (
                  <li>
                    <input
                      type="text"
                      placeholder="Nhập mã OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <button type="button" onClick={verifyOtp} className="ml-2 bg-green-500 text-white px-2 py-1 rounded">
                      Xác thực
                    </button>
                  </li>
                )}
                <li><p className="text-red-500">{message}</p></li>

                <li className="flex items-center justify-between">
                  <div className={`${style.item}`}>
                    <button type="submit" className={`${style.view}`}>
                      Nhận tư vấn
                      <Image className="ml-4" width={30} height={30} src="/icon/iconLeft-witth.png" alt="tu van" />
                    </button>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </section>
      <Blog />
      <Footer />
    </main >
  );
}

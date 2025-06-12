'use client';
import React from 'react';
import style from "@/app/style/styles.module.css";
// import intro from "@/app/style/intro.module.css"
import Navigation from "@/components/navigation";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function Introduce() {
    const pathname = usePathname();

    return (
        <main className={`${style.mainIndex} w-[70%] bg-white ml-[15%] mr-[15%] relative top-[20vh] flex flex-col shadow-md`}>
            <div className='w-full h-10 bg-[#005db2] flex items-center'>
                <div className='flex justify-end h-full max-w-[1170px] w-full m-auto'>
                    <ul className='p-0 m-0 h-full list-none flex items-center'>
                        <li className='cursor-pointer h-full items-center py-2 relative mr-4'>
                            <Link href={'#'} className='whitespace-nowrap font-sans text-lg text-left flex items-center' id='login' style={{ fontFamily: 'inherit', lineHeight: '1.29', letterSpacing: 'normal', fontWeight: 'normal', fontStretch: 'normal', color: '#ffffff', textDecoration: 'none', }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>Đăng Nhập<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Navigation />
            <section className={`${style.mainIntro} py-[3.125rem]`}>
                <div className={`${style.container}`}>
                    <div className={`${style.leftIntro}`}>
                        <div className={`${style.textIntro} bg-[#005db2]`}>
                            <div className={`${style.title}`}>
                                {/* <div className={`${style.mobile} flex w-[50%] h-[3.5px]`}>
                                    <div className="flex-[6] bg-[#f8b133]"></div>
                                    <div className="flex-[4] bg-[#e91e1e]"></div>
                                </div> */}
                                <h2 className="mt-2 text-white text-[48px]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Giới Thiệu
                                </h2>
                            </div>
                        </div>
                        <div className={`${style.listMenu}`}>
                            <ul>
                                <li className={pathname === "/introduce" ? `${style.active}` : ""}>
                                    <Link href={'/introduce'}>Về chúng tôi</Link>
                                </li>
                                <li className={pathname === "/introduce/structure" ? `${style.active}` : ""}>
                                    <Link href={'/introduce/structure'}>Cơ cấu tổ chức</Link>
                                </li>
                                <li className={pathname === "/introduce/corevalues" ? `${style.active}` : ""}>
                                    <Link href={'/introduce/corevalues'}>Giá trị cố lõi</Link>
                                </li>
                                <li className={pathname === "/introduce/partandcust" ? `${style.active}` : ""}>
                                    <Link href={'/introduce/partandcust'}>Đối tác & Khách hàng</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${style.rightIntro}`}>
                        <div className={`${style.breadcrumb}`}>
                            <p>
                                <span>Trang chủ</span> / <span>Giới thiệu</span> / <span>Về chúng tôi</span>
                            </p>
                        </div>
                        <div className={`${style.contentIntro}`}>
                            <p className='!mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    <strong>PHARMACY VIỆT NAM </strong>lấy khách hàng làm trọng tâm, với sứ mệnh cung cấp dịch vụ sản xuất gia công phần mềm tiên tiến nhất trên thế giới. Cùng đội ngũ chuyên gia Công ty 15 năm kinh nghiệm phân tích nghiệp vụ và 200 đội ngũ nhân lực công nghệ dồi dào, chi phí thực thi thấp và chất lượng tốt để đáp ứng nhu cầu của người dân – doanh nghiệp – xã hội, sãn sàng bước vào kỷ nguyên mới của chuyển đổi số.
                                </span>
                            </p> <br />
                            <p>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    <strong> Tầm nhìn:</strong><br /><strong>PHARMACY VIỆT NAM </strong>Cùng với việc đi đầu cung cấp gải pháp phần mềm quản trị trong ngành Y tế, Doanh nghiệp, Chính phủ, không ngừng tạo ra các sản phẩm, dịch vụ và giải pháp để giúp khách hàng nâng tầm trải nghiệm, giúp doanh nghiệp nâng cao hiệu suất kinh doanh, cùng đóng góp vào sự phát triển của xã hội Việt Nam.
                                </span>
                            </p>
                            <p>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    <strong>Sứ mệnh:</strong> <br />Với tinh thần đổi mới và sáng tạo không ngừng, <strong>PHARMACY VIỆT NAM </strong> xây dựng một hệ sinh thái mạnh mẽ, góp phần đưa Việt Nam chở thành quốc gia số.
                                </span>
                            </p>
                            <p>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    <strong>Triết lý:</strong><br /> CÔNG NGHỆ DẪN NỐI - KHÁCH HÀNG LÀM TRUNG TÂM <br /> Chúng tôi hành động với mục đích, niềm đam mê và thái độ tích cực để giúp khách hàng thực hiện ước mơ của họ.
                                </span>
                            </p>
                            <p>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    <strong>Giá trị cốt lõi:</strong><br /> Trên tinh thần đổi mới, thần tốc, phát huy các giá trị cốt lõi: <br />
                                    ĐỔI MỚI - THẦN TỐC - CHUYÊN NGHIỆP - HIỆU QUẢ.
                                </span>
                            </p>
                            <p className='!mr-0 !text-justify !leading-7'>&nbsp;</p>
                            <p className='!mr-0 !text-justify !leading-7'>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    <strong>Cam kết của PHARMACY VIỆT NAM :</strong> <br />
                                    Năm 2025 trở thành đối tác gia công, phát triển nghiệp vụ phần mềm tin cậy của các Công ty Công nghệ tầm cỡ trong và ngoài nước. Tóp 10 trên thị trường dịch vụ phần mềm tại Việt Nam; Đạt tốc độ tang trưởng doanh thu bình quân 42-45%/ Năm; Ứng dụng tiên phong công nghệ mới trong cung cấp dịch vụ
                                    <br />
                                    Năm 2030 làm chủ tri thức công nghệ, phát triển nhân tài tương lai, trở thành đối tác gia công, phát triển hàng đầu trong các lĩnh vực công nghệ trên phạm vi toàn cầu.Tóp 10 trên thị trường dịch vụ phần mềm tại Việt Nam; Đạt doanh nghiệp quốc tế về cung cấp các giải pháp công nghệ ( ISO 27001, ISO 9001); Làm chủ các công nghệ như Blockchain, AI, AR/VR, ...
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main >
    );
}

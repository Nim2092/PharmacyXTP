'use client';
<<<<<<< HEAD
import React, {useEffect, useRef, useState} from 'react';
=======
import React from 'react';
>>>>>>> 255b29b (Initial commit: Add existing project files)
import style from "@/app/style/styles.module.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/Footer";
import Link from 'next/link';
<<<<<<< HEAD
import {usePathname} from "next/navigation";
import Image from 'next/image';

export default function page() {
    const allPartners = [
        {src: "/partners/training1.png", alt: "Chương trình đào tạo thực tập sinh do Hitech tổ chức.", title: "Chương Trình Thực Tập Sinh"},
        {src: "/partners/training2.png", alt: "Hitech trao đổi với đối tác nước ngoài", title: "Hợp Tác Quốc Tế"},
        {src: "/partners/training3.png", alt: "Đào tạo chuyên sâu về công nghệ cho doanh nghiệp", title: "Đào Tạo Chuyên Sâu"},
        {src: "/partners/training4.png", alt: "Tổ chức workshop và hội thảo công nghệ", title: "Workshop Công Nghệ"},
        {src: "/partners/training5.png", alt: "Sinh viên làm việc trong các dự án phần mềm thực tế.", title: " Tham Gia Dự Án Thực Tế"},
        {src: "/partners/training7.png", alt: "Hoạt động thực chiến của đội ngũ thực tập sinh.", title: "Hoạt Động Gắn Kết Đội Nhóm"},
        {src: "/partners/training8.png", alt: "Hội thảo chia sẻ kiến thức và kinh nghiệm", title: "Hội Thảo Công Nghệ"},
        {src: "/partners/training9.png", alt: "Cơ hội networking với các chuyên gia đầu ngành", title: "Mở Rộng Mạng Lưới"},
        {src: "/partners/training10.png", alt: "Thúc đẩy phát triển khoa học công nghệ đổi mới sáng tạo", title: "Hội Thảo Khoa Học"},
    ];

    const internshipAndWorkImages = allPartners.filter(p => p.src.includes('training1.png') || p.src.includes('training5.png') || p.src.includes('training7.png'));
    const carouselPartners = allPartners.filter(p => !internshipAndWorkImages.includes(p));
    
    const pathname = usePathname();

    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);
    const slideCount = carouselPartners.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slideCount);
        }, 4000);
        return () => clearInterval(interval);
    }, [slideCount]);

    return (
        <main
            className={`${style.mainIndex} w-[70%] bg-white ml-[15%] mr-[15%] relative top-[20vh] flex flex-col shadow-md`}>
=======
import { usePathname } from "next/navigation";
import Image from 'next/image';

export default function page() {
    const partners = [
        { src: "/partners/Logo-hanh-chinh-cong.jpg", alt: "bidv", },
        { src: "/partners/bo-y-te.png", alt: "bic", },
        { src: "/partners/logo-giao-duc-2.jpg", alt: "niad", },
        { src: "/partners/bidv-logo.png", alt: "bidv", },
        { src: "/partners/niad-logo-2.jpg", alt: "bic", },
        { src: "/partners/virtnam-post-logo.png", alt: "niad", },
    ]
    const pathname = usePathname();
    return (
        <main className={`${style.mainIndex} w-[70%] bg-white ml-[15%] mr-[15%] relative top-[20vh] flex flex-col shadow-md`}>
>>>>>>> 255b29b (Initial commit: Add existing project files)
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
<<<<<<< HEAD
            
            <Navigation/>
            
            <section className={`${style.mainIntro} py-[3.125rem]`}>
                <div className={`${style.container}`}>
                <div className={`${style.leftIntro}`}>
                        <div className={`${style.textIntro} bg-[#005db2]`}>
                            <div className={`${style.title}`}>
                                {/* <div className={`${style.mobile} flex w-[50%] h-[3.5px]`}>
                                    <div className="flex-[6] bg-[#f8b133]"></div>
                                    <div className="flex-[4] bg-[#e91e1e]"></div>
                                </div> */}
=======
            <Navigation />
            <section className={`${style.mainIntro} py-[3.125rem]`}>
                <div className={`${style.container}`}>
                    <div className={`${style.leftIntro}`}>
                        <div className={`${style.textIntro} bg-[#005db2]`}>
                            <div className={`${style.title}`}>
>>>>>>> 255b29b (Initial commit: Add existing project files)
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
<<<<<<< HEAD
                    
                    {/* Right Content */}
                    <div className={`${style.rightIntro}`}>
                    <div className={`${style.breadcrumb}`}>
                            <p>
                                <span>Trang chủ</span> / <span>Giới thiệu</span> / <span>Đối tác & Khách hàng</span>
                            </p>
                        </div>
                        {/* Main Content */}
                        <div className={`${style.contentIntro} mb-12`}>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border-l-4 border-[#005db2]">
                                <p className='text-justify leading-7 text-base text-[#2d2d2d]'>
                                    <span style={{fontFamily: "Arial,Helvetica,sans-serif"}}>
                                        Tại Hitech, chúng tôi tin rằng nền tảng của thành công đến từ việc xây dựng mối quan hệ đối tác bền chặt và chiến lược phát triển nhân tài có tầm nhìn. Chúng tôi không chỉ cung cấp giải pháp công nghệ mà còn kiến tạo một hệ sinh thái hợp tác toàn diện, nơi các doanh nghiệp và tài năng trẻ cùng nhau phát triển, đổi mới và tạo ra những giá trị bền vững cho tương lai.
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Internship Program Section */}
                        <div className={`${style.contentIntro} mb-12`}>
                            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                                <div className="mb-8 text-center">
                                    <h3 className="inline-block text-3xl font-bold text-[#005db2] border-b-2 border-[#005db2] pb-3">
                                        Hợp Tác Đào Tạo Phát Triển Nhân Tài
                                    </h3>
                                </div>
                                
                                <p className='text-left leading-relaxed text-base text-gray-700 mb-8'>
                                    Hitech tự hào hợp tác chặt chẽ với các trường đại học và cơ sở giáo dục hàng đầu để triển khai chương trình thực tập chuyên nghiệp. Chúng tôi tạo ra một môi trường học đi đôi với hành, nơi sinh viên có thể áp dụng kiến thức vào các dự án công nghệ thực tế, từ đó phát triển kỹ năng chuyên môn, tư duy giải quyết vấn đề và sẵn sàng cho sự nghiệp tương lai.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                    {internshipAndWorkImages.map((image, index) => (
                                        <div key={index} className="flex flex-col items-center group">
                                            <div className="relative w-full h-[250px] overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300">
                                                <Image
                                                    src={image.src}
                                                    alt={image.alt}
                                                    fill
                                                    style={{ objectFit: "cover" }}
                                                    className="group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="mt-4 text-center">
                                                <h4 className="font-semibold text-[#005db2] text-lg">{image.title}</h4>
                                                <p className="text-gray-600 text-sm">{image.alt}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h4 className="text-lg font-semibold text-[#005db2] mb-4">
                                        Tham gia chương trình, thực tập sinh sẽ được:
                                    </h4>
                                    <ul className='space-y-4 text-base text-gray-800'>
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-[#005db2] rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                            <span>Trực tiếp tham gia vào các dự án về phần mềm, dữ liệu, trí tuệ nhân tạo, chuyển đổi số.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-[#005db2] rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                            <span>Hướng dẫn bởi các mentor giàu kinh nghiệm và hỗ trợ theo từng giai đoạn phát triển dự án.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-[#005db2] rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                            <span>Rèn luyện kỹ năng làm việc nhóm, quản lý thời gian và tư duy sản phẩm.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-[#005db2] rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                            <span>Cơ hội trở thành nhân sự chính thức sau khi hoàn thành tốt kỳ thực tập.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Partners Carousel */}
                        <div className={`${style.contentIntro}`}>
                            <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg border border-gray-100">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#005db2] mb-4">Đối Tác & Khách Hàng Tiêu Biểu</h3>
                                    <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">Sự tin tưởng và hợp tác của quý đối tác, khách hàng là nền tảng cho sự phát triển bền vững của Hitech.</p>
                                </div>

                                <div className="relative overflow-hidden rounded-lg">
                                    <div
                                        ref={slideRef}
                                        className="flex transition-transform duration-700 ease-in-out"
                                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    >
                                        {carouselPartners.map((partner, idx) => (
                                            <div key={idx} className="w-full flex-shrink-0">
                                                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
                                                    <Image
                                                        src={partner.src}
                                                        alt={partner.alt}
                                                        fill
                                                        style={{ objectFit: "cover" }}
                                                        sizes="(max-width: 768px) 100vw, 800px"
                                                        priority={idx === 0}
                                                    />
                                                </div>
                                                <div className="mt-4 text-center p-4">
                                                    <h4 className="font-semibold text-[#005db2] text-lg md:text-xl mb-1">{partner.title}</h4>
                                                    <p className="text-gray-600 text-sm md:text-base">{partner.alt}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="flex justify-center mt-4 space-x-2">
                                        {carouselPartners.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentIndex(index)}
                                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                                    index === currentIndex ? 'bg-[#005db2]' : 'bg-gray-300 hover:bg-gray-400'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
=======
                    <div className={`${style.rightIntro}`}>
                        <div className={`${style.breadcrumb}`}>
                            <p>
                                <span>Trang chủ</span> / <span>Giới thiệu</span> / <span>Đối tác và Khách hàng</span>
                            </p>
                        </div>
                        <div className={`${style.customIntro}`}>
                            <div className={`${style.grid}`}>
                                {partners.map((partner, index) => (
                                    <div key={index} className={`${style.logoItem}`}>
                                        <Image
                                            src={partner.src}
                                            alt={partner.alt}
                                            width={120}
                                            height={50}
                                            objectFit="contain"
                                        />
                                    </div>
                                ))}
>>>>>>> 255b29b (Initial commit: Add existing project files)
                            </div>
                        </div>
                    </div>
                </div>
            </section>
<<<<<<< HEAD
            <Footer/>
=======
            <Footer />
>>>>>>> 255b29b (Initial commit: Add existing project files)
        </main>
    )
}

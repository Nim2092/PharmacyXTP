'use client';
import React from 'react';
import style from "@/app/style/styles.module.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/Footer";
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function page() {
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
                                {/* <div className="flex w-[50%] h-[3.5px]">
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
                                <li className={pathname === "/introduce/whychooose" ? `${style.active}` : ""}>
                                    <Link href={'/introduce/whychooose'}>Tại sao nên chọn XTP</Link>
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
                                <span>Trang chủ</span> / <span>Giới thiệu</span> / <span>Cơ cấu tổ chức</span>
                            </p>
                        </div>
                        <div className={`${style.contentIntro} flex justify-around text-center mb-7`}>
                            <div className={`${style.iconItem}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16 text-center">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                </svg>
                                <p className='mt-3 font-bold'>Thần tốc</p>
                            </div>
                            <div className={`${style.iconItem}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16 text-center">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                                </svg>

                                <p className='mt-3 font-bold'>Đổi mới</p>
                            </div>
                            <div className={`${style.iconItem}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16 text-center">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                                </svg>

                                <p className='mt-3 font-bold'>Chuyên nghiệp</p>
                            </div>
                            <div className={`${style.iconItem}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16 text-center">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                                </svg>

                                <p className='mt-3 font-bold'>Hiệu quả</p>
                            </div>

                        </div>
                        <div className={`${style.contentIntro}`}>
                            <p>
                                <strong className='font-bold'> <em>&bull; Giá trị " Thần Tốc" </em></strong>
                            </p>
                            <p className='ml-2'>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    Có thể khẳn định một cách chắc chắn rằng trong lĩnh vực công nghệ số, tốc độ là yếu tố quyết định. Trong không gian số không hề có các giào cản hữu hình, mọi thứ rất bình đẳng. Chậm không chỉ bị thụt lùi còn đứng trước nguy cơ mất tất cả
                                </span>
                            </p>
                            <p className='!mr-0 !text-justify !leading-7'>&nbsp;</p>
                            <p>
                                <strong className='font-bold'> <em>&bull; Giá trị "Đổi mới" </em> </strong>
                            </p>
                            <p className='ml-2'>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    “Đổi mới” được hiểu là tự làm mới mình một cách toàn diện từ trong ra ngoài, từ suy nghĩ, thái độ, chuyên môn cho đến tác phong, hành xử. Đổi mới không có nghĩa là vứt bỏ những cái cũ, nhưng là sự sàng lọc có mục đích
                                </span>
                            </p>
                            <p className='!mr-0 !text-justify !leading-7'>&nbsp;</p>

                            <p>
                                <strong className='font-bold'><em>&bull; Giá trị " Chuyên nghiệp" </em> </strong>
                            </p>
                            <p className='ml-2'>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    “ Chuyên nghiệp” được hiểu là biết điều gì cần làm trong phạm vi trách nhiệm của bản thân, có ý thức hoàn thành điều đó và nghiêm túc bắt tay vào thực hiện chúng theo cách chuẩn mực cao nhất “ Chuyên nghiệp” cần thể hiện từ suy nghĩ, nguyên tắc bên trong, đến hình thức, tác phong bên ngoài.
                                </span>
                            </p>
                            <p className='!mr-0 !text-justify !leading-7'>&nbsp;</p>
                            <p>
                                <strong className='font-bold'> <em>&bull; Giá trị " Hiệu quả"</em></strong>
                            </p>
                            <p className='ml-2'>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    “ Hiệu quả” là giá trị cốt lõi thể hiện nét văn hóa nổi bật của XTP trong xuất chiều dài lịc sử hình thành và phát triển. “ Hiệu quả” có hai cấp độ: hiệu quả cá nhân và hiệu quả tập thể. “ Hiệu quả” cũng thường được nhìn nhận dưới hai phương diện: hiệu quả trong từng tình huống và hiệu quả một cách bền vững.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main >
    )
}

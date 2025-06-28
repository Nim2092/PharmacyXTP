'use client';
import React from 'react';
import style from "@/app/style/styles.module.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import Image from "next/image";


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
                                <span>Trang chủ</span> / <span>Giới thiệu</span> / <span>Cơ cấu tổ chứ</span>
                            </p>
                        </div>
                        <div className={`${style.contentIntro}`}>
                            <Image width={600} height={600} src={'/structure.jpg'} alt='structure' /><br />
                            <p className='!mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    <b>XTP VIỆT NAM</b> với tên gọi là Công ty TNHH công nghệ pharmacy Việt nam, kinh doanh trong các lĩnh vực: Phần mềm quản trị Bệnh viện, Tài chính, Hành chính công, nhà máy khu công nghiệp, VAS, Data, sản phẩm khách hàng doanh nghiệp, dịch vụ công nghệ thông tin, bán lẻ và phân phối và đầu tư nước ngoài.
                                </span>
                            </p>
                            <p className='!mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <strong className='text-[#005db2]'> <em>XTP VIỆT NAM </em>  </strong> <br />

                            </p>
                            <p className='ml-10 !mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    Địa chỉ văn phòng: Tòa nhà N09B2 Đường Thành Thái, Phường Dịch Vọng, Quận Cầu Giấy, TP Hà Nội.
                                </span>
                            </p>
                            <p className='!mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <strong className='text-[#005db2]'> <em>Các Công ty Dịch vụ phần mềm Khu vực 1, 2, 3, 4
                                </em>  </strong>
                            </p>
                            <p className='ml-10 !mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    Có nhiệm vụ kinh doanh toàn bộ các dịch vụ do Tổng công ty cung cấp đối với tất cả các nhóm khách hàng theo mục tiêu, quy hoạch và kế hoạch phát triển của Tổng công ty trên địa bàn được giao.
                                </span>
                            </p>

                            <p className='ml-6 !mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <strong className='text-[#005db2]'><em>Công ty Dịch vụ  Khu vực 1</em></strong>
                            </p>
                            <p className='ml-10 !mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    Trụ sở chính tại TP. Hà Nội. <br />
                                    Địa chỉ: Tòa nhà Galaxy 6 Số 69 P.Tố Hữu, Vạn Phúc,Q Hà Đông, TP. Hà Nội
                                </span>
                            </p>
                            <p className='ml-6 !mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <strong className='text-[#005db2]'><em>Công ty Dịch vụ  Khu vực 2</em></strong>
                            </p>
                            <p className='ml-10 !mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    Trụ sở chính tại TP. Hà Nội.<br />
                                    Địa chỉ: Tòa nhà BIDV Số 263 Cầu Giấy, P. Dịch Vọng, Q. Cầu Giấy, TP. Hà Nội
                                </span>
                            </p>
                            <p className='ml-6 !mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <strong className='text-[#005db2]'><em>Công ty Dịch vụ  Khu vực 3</em></strong>
                            </p>
                            <p className='ml-10 !mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    Trụ sở chính tại TP. Hồ Chí Minh.<br />
                                    Địa chỉ: Tòa nhà số 255 , đường Nguyễn Thị Minh Khai, phường 5, Quận 3, TP. Hồ Chí Minh. <br />
                                    Địa bàn kinh doanh tại TP. Hồ Chí Minh.
                                </span>
                            </p>
                            <p className='ml-6 !mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <strong className='text-[#005db2]'><em>Công ty Dịch vụ Khu vực 4</em></strong>
                            </p>
                            <p className='ml-10 !mr-0 !text-justify !leading-7 text-sm text-[#2d2d2d]'>
                                <span className='text-sm' style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                                    Trụ sở chính tại Phú Thọ
                                    <br />
                                    Địa chỉ: Tòa nhà Số 22 - Khu Đồng Mạ, đường Nguyễn Tất Thành, phường Tiên Cát, TP. Việt Trì, tỉnh Phú Thọ.
                                    <br />
                                    <b>Trung tâm Công nghệ Thông tin
                                    </b> <br />
                                    Trụ sở chính tại TP.Hà Nội, có nhiệm vụ Quản lý, nghiên cứu, sản xuất, phát triển mới và kinh doanh các sản phẩm phần mềm, dịch vụ, giải pháp công nghệ thông tin phục vụ khách hàng trong và ngoài nước; Phân tích và khai phá dữ liệu lớn để thực hiện phát triển, sản xuất sản phẩm, dịch vụ Công nghệ thông tin ; Tư vấn và hỗ trợ kỹ thuật đối với các sản phẩm, dịch vụ, giải pháp công nghệ thông tin cho khách hàng bên ngoài Tổng công ty; Quản lý, vận hành, khai thác các hệ thống công nghệ thông tin phục vụ kinh doanh bên ngoài Tổng công ty; Phát triển, quản lý, khai thác và kinh doanh các sản phẩm, dịch vụ, giải pháp Big Data, Iot, Blockchain, AR/VR, AI.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}

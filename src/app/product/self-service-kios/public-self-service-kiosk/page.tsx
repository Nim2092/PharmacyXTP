'use client';
import React, { useState, useEffect } from "react";
import style from "@/app/style/styles.module.css";
import Navigation from '@/components/navigation';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import Footer from "@/components/Footer";

export default function product() {
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        if (showVideo) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showVideo]);
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
            <section className='py-[3.125rem] bg-[#f3f4f8] pb-[100px] p-12 relative overflow-hidden'>
                <div className='container w-full max-w-[1200px]'>
                    <div>
                        <div className='m-auto relative min-h-0.5 px-4 w-[55%] float-left max-930:w-full'>
                            <h1 className='text-lg mb-12 font-bold'>
                                KIOSK TỰ PHỤC VỤ
                            </h1>
                            <p className='text-sm mb-5 font-medium'>
                                Giải pháp kiosk tự động cung cấp các dịch vụ thông minh và tiếp cận công dân, khách hàng 24/7
                            </p>
                            <div className='mt-12 mr-[-15px]'>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2 max-750:w-full max-750:mt-5"
                                    onClick={() => {
                                        const link = document.createElement("a");
                                        link.href = "/file/hanh-chinh-cong.pdf";
                                        link.download = "OFFICIAL HỆ THỐNG KIOST HANH CHINH CONG.pdf";
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                >
                                    Download now
                                </button>
                                <button
                                    className="bg-white hover:bg-slate-200 text-slate-500 font-bold py-2 px-4 rounded-full m-2 max-750:w-full max-750:mt-5"
                                    onClick={() => setShowVideo(true)}
                                >
                                    video hướng dẫn
                                </button>
                                {showVideo && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 mt-28">
                                        <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full ">
                                            <button
                                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-200"
                                                onClick={() => setShowVideo(false)}
                                            >
                                                ✖
                                            </button>
                                            <div className="aspect-w-16 aspect-h-9">
                                                <iframe width="560" height="315" className="w-full" src="https://www.youtube.com/embed/Ec77hS0xhAY?si=LfgVQ6-P3uuU6ITe" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='text-center relative min-h-0.5 px-4 w-[45%] m-auto float-right max-930:w-full'>
                            <Image className='w-full h-full' width={300} height={300} src={'/product/kiost-tu-phuc-vu-hanh-chinh-cong.png'} alt='' />
                        </div>
                    </div>
                </div>
            </section>
            <div className='py-[60px] overflow-hidden bg-white'>
                <div className='w-full max-w-[1200px] m-auto container'>
                    <div className='px-[65px] text-center'> <h2 className='text-4xl font-bold text-[#005db2] text-left leading-[1.33]' style={{ fontStretch: 'normal', fontStyle: 'normal', textTransform: 'uppercase', fontFamily: 'VIE-HandelGothic,sans-serif' }}> Lợi Ích</h2></div>
                    <div className='px-[65px] mt-5'>
                        <div className='relative min-h-[1px] px-4 w-full float-left'>
                            <div className='rounded-sm bg-white mb-8 mx-[15px] m-0' style={{ boxShadow: '0 2px 6px 0 rgba(218, 218, 253, 0.65), 0 2px 6px 0 rgba(206, 206, 238, 0.54)' }}>
                                <div className='p-0 relative min-h-[1px] w-1/4 float-left'>
                                    <Image width={300} height={300} src={'/product/data-transfer.svg'} alt='' />
                                </div>
                                <div className='p-3 w-3/4 float-left relative min-h-[1px]'>
                                    <div>
                                        <h5 className='text-sm my-2'>Tích kiệm chi phí</h5>
                                        <br />
                                        <p className='text-base' style={{ margin: '0 0 10px' }}>
                                            XIP - AI, BIG DATA giúp tiết kiệm chi phí đầu tư công cụ quản trị, nhân sự vận hành hệ thống, đây là công cụ hiệu quả cho các doanh nghiệp không đủ nhân sự vận hành hoặc muốn tiết kiệm chi phí và tối ưu nguồn lực vận hành trên hạ tầng điện toán đám mây.
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='relative min-h-[1px] px-4 w-full float-left mt-5'>
                            <div className='rounded-sm bg-white mb-8 mx-[15px] m-0' style={{ boxShadow: '0 2px 6px 0 rgba(218, 218, 253, 0.65), 0 2px 6px 0 rgba(206, 206, 238, 0.54)' }}>
                                <div className='p-0 relative min-h-[1px] w-1/4 float-left'>
                                    <Image width={300} height={300} src={'/product/data-transfer.svg'} alt='' />
                                </div>
                                <div className='p-3 w-3/4 float-left relative min-h-[1px]'>
                                    <div>
                                        <h5 className='text-sm my-2'>
                                            Đảm bảo tính sẵn sàng của hệ thống
                                        </h5>
                                        <br />
                                        <p className='text-base' style={{ margin: '0 0 10px' }}>
                                            XIP - AI, BIG DATA giúp tiết kiệm chi phí đầu tư công cụ quản trị, nhân sự vận hành hệ thống, đây là công cụ hiệu quả cho các doanh nghiệp không đủ nhân sự vận hành hoặc muốn tiết kiệm chi phí và tối ưu nguồn lực vận hành trên hạ tầng điện toán đám mây.
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <section className={`${style.mainIntro} py-[3.125rem]`}>
                <div className={`${style.container}`}>
                    <div className={`${style.leftIntro}`}>
                        <div className={`${style.textIntro} bg-[#005db2]`}>
                            <div className={`${style.title}`}>
                                <h2 className="mt-2 text-white text-[48px]" style={{ fontFamily: "VIE-HandelGothic" }}>
                                    Sản Phẩm
                                </h2>
                            </div>
                        </div>
                        <div className={`${style.listMenu}`}>
                            <ul>
                                <li className={pathname === "/product" ? `${style.active}` : ""} style={{ paddingLeft: "15px" }}>
                                    <Link className='!text-lg' href={'/product'}>( AI ) Trong hệ thống quản trị</Link>
                                </li>
                                <li className={pathname === "/product/hospital" ? `${style.active}` : ""} style={{ paddingLeft: "15px" }}>
                                    <Link className='!text-lg' href={'/product/hospital'}>Phần quản trị bệnh viện</Link>
                                </li>
                                <li className={pathname === "/product/online-patient-care" ? `${style.active}` : ""} style={{ paddingLeft: "15px" }}>
                                    <Link className='!text-lg' href={'/product/online-patient-care'}>phần chăm sóc bệnh nhân online</Link>
                                </li>
                                <li className={pathname === "/product/security-CSDL" ? `${style.active}` : ""} style={{ paddingLeft: "15px" }}>
                                    <Link className='!text-lg' href={'/product/security-CSDL'}>Giải pháp bảo mật CSDL</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div
                        className={`${style.rightIntro}`}
                        style={{
                            marginLeft: "2%",
                            width: "65%"
                        }}
                    >
                        <div className={`${style.breadcrumb}`}>
                            <p>
                                <span>Trang chủ</span> / <span>Sản phẩm</span> / <span>( AI ) Trong hệ thống quản trị</span>
                            </p>
                        </div>
                        <div className='mt-4 ml-[-15px]'>
                            <div className='flex flex-wrap'>
                                {products.map((product) => (
                                    <div key={product.id} className='relative rounded-xl items-center justify-between w-1/3 max-500:w-full group'>
                                        <div className='p-4 w-full'>
                                            <div className='rounded-md' style={{ border: "1px solid #ececec" }}>
                                                <div className='flex items-center'>
                                                    <Image
                                                        src={product.image}
                                                        width={350}
                                                        height={350}
                                                        alt={product.title}
                                                    />
                                                </div>
                                                <div className='py-8 '>
                                                    <h3 className='m-0 p-0 text-[18px] min-h-[60px] mx-3 text-left text-[#005db2]'
                                                        style={{
                                                            fontFamily: 'VIE-HandelGothic',
                                                            fontWeight: "bold",
                                                            fontStretch: "normal",
                                                            fontStyle: "normal",
                                                            lineHeight: "1.32",
                                                            letterSpacing: "normal",
                                                            textTransform: "uppercase",
                                                        }}
                                                    >
                                                        {product.title}
                                                    </h3>
                                                    <div className='mx-3'>
                                                        <div className='text-xs text-left text-[#707070]'
                                                            style={{
                                                                fontFamily: "Roboto",
                                                                fontWeight: "normal",
                                                                fontStretch: "normal",
                                                                fontStyle: "normal",
                                                                lineHeight: "2.14",
                                                                letterSpacing: "normal",
                                                            }}
                                                        >
                                                            CPU: {product.cpu}
                                                        </div>
                                                        <div className='text-xs text-left text-[#707070]'
                                                            style={{
                                                                fontFamily: "Roboto",
                                                                fontWeight: "normal",
                                                                fontStretch: "normal",
                                                                fontStyle: "normal",
                                                                lineHeight: "2.14",
                                                                letterSpacing: "normal",
                                                            }}
                                                        >
                                                            CORE: {product.core}
                                                        </div>
                                                        <div className='text-xs text-left text-[#707070]'
                                                            style={{
                                                                fontFamily: "Roboto",
                                                                fontWeight: "normal",
                                                                fontStretch: "normal",
                                                                fontStyle: "normal",
                                                                lineHeight: "2.14",
                                                                letterSpacing: "normal",
                                                            }}
                                                        >
                                                            HDD: {product.hdd}
                                                        </div>
                                                        <div className='text-xs text-left text-[#707070]'
                                                            style={{
                                                                fontFamily: "Roboto",
                                                                fontWeight: "normal",
                                                                fontStretch: "normal",
                                                                fontStyle: "normal",
                                                                lineHeight: "2.14",
                                                                letterSpacing: "normal",
                                                            }}
                                                        >
                                                            RAM: {product.ram}
                                                        </div>
                                                        <div className='text-xs text-left text-[#707070]'
                                                            style={{
                                                                fontFamily: "Roboto",
                                                                fontWeight: "normal",
                                                                fontStretch: "normal",
                                                                fontStyle: "normal",
                                                                lineHeight: "2.14",
                                                                letterSpacing: "normal",
                                                            }}
                                                        >
                                                            IP: {product.ip}
                                                        </div>
                                                    </div>
                                                </div>
                                                <form action="/" className='w-full' method='GET'>
                                                    <button
                                                        className='flex text-base font-bold text-left items-center !mt-2 !mb-7'
                                                        style={{
                                                            fontFamily: "VIE-HandelGothic",
                                                            fontStretch: "normal",
                                                            fontStyle: "normal",
                                                            lineHeight: "1.33",
                                                            letterSpacing: "normal",
                                                            textTransform: "uppercase",
                                                            color: "#005db2",
                                                            padding: "10px 20px",
                                                            border: "none",
                                                            cursor: "pointer",
                                                            margin: " 20px auto",
                                                        }}
                                                    >
                                                        {product.price}₫ &nbsp;
                                                        <Image className="ml-3" width={30} height={30} src="/icon/iconLeft.png" alt="gia" />
                                                    </button>
                                                    <Link
                                                        href={'/contact'}
                                                        className={`${style.viewGia} !mt-[-73px] group-hover:opacity-100 group-hover:visible`}
                                                        style={{ transition: "0,3s" }}
                                                    >
                                                        <span className="ml-[50px]">Đặt mua</span>
                                                        <Image className="ml-3" width={28} height={28} src="/icon/iconLeft-witth.png" alt="gia" />
                                                    </Link>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <Footer />
        </main >

    )
}

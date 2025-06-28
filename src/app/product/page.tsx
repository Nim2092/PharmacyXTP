'use client';
import React from 'react';
import style from "@/app/style/styles.module.css";
import Navigation from '@/components/navigation';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import Footer from "@/components/Footer";

export default function product() {

    // const products = [
    //     {
    //         id: 1,
    //         image: '/Cloud_Service.png',
    //         title: 'Product AI 01',
    //         cpu: 'Intel® Xeon® E5-26XX',
    //         core: '2 Cores',
    //         hdd: '20 GB',
    //         ram: '2 GB',
    //         ip: '1',
    //     },
    //     {
    //         id: 2,
    //         image: '/Cloud_Service.png',
    //         title: 'Product AI 02',
    //         cpu: 'Intel® Xeon® E5-26XX',
    //         core: '3 Cores',
    //         hdd: '40 GB',
    //         ram: '4 GB',
    //         ip: '1',
    //         price: "500.000",
    //     },
    //     {
    //         id: 3,
    //         image: '/Cloud_Service.png',
    //         title: 'Product AI 03',
    //         cpu: 'Intel® Xeon® E5-26XX',
    //         core: '2 Cores',
    //         hdd: '60 GB',
    //         ram: '6 GB',
    //         ip: '1',
    //         price: "1000.000",
    //     },
    //     {
    //         id: 4,
    //         image: '/Cloud_Service.png',
    //         title: 'Product AI 04',
    //         cpu: 'Intel® Xeon® E5-26XX',
    //         core: '2 Cores',
    //         hdd: '80 GB',
    //         ram: '8 GB',
    //         ip: '1',
    //         price: "1500.000",
    //     },
    //     {
    //         id: 5,
    //         image: '/Cloud_Service.png',
    //         title: 'Product AI 05',
    //         cpu: 'Intel® Xeon® E5-26XX',
    //         core: '1 Cores',
    //         hdd: '128 GB',
    //         ram: '12 GB',
    //         ip: '1',
    //         price: "2000.000",
    //     },
    //     {
    //         id: 6,
    //         image: '/Cloud_Service.png',
    //         title: 'Product AI 06',
    //         cpu: 'Intel® Xeon® E5-26XX',
    //         core: '3 Cores',
    //         hdd: '256 GB',
    //         ram: '16 GB',
    //         ip: '1',
    //         price: "2500.000",
    //     }
    // ];
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
            </section>
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

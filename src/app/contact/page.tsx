'use client';
import React from 'react';
import style from "@/app/style/styles.module.css";
import Navigation from "@/components/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function contact() {
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
            <div className={`${style.contactPage}`}>
                <div className={`${style.container} px-5`}>
                    <h3> CÔNG TY TNHH CÔNG NGHỆ PHARMACY VIỆT NAM </h3>
                    <ul className='max-1200:flex-col'>
                        <li className='w-[40%] max-1200:w-full max-800:py-4'>
                            <div className={`${style.img}`}>
                                <Image
                                    className='w-8'
                                    src={'/contact/loacll-icon.png'}
                                    width={300}
                                    height={300}
                                    alt='logo'
                                />
                            </div>
                            <div className={`${style.contInfo}`}>
                                <div className={`${style.title}`}>
                                    Địa chỉ
                                </div>
                                <p className='text-xs'>Tòa nhà N09B2 Đường Thành Thái, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội
                                </p>
                            </div>
                        </li>
                        <li className='w-[27.5%] max-1200:w-full max-800:py-4'>
                            <div className={`${style.img}`}>
                                <Image
                                    className='w-8'
                                    src={'/contact/phone-ringing-icon.png'}
                                    width={300}
                                    height={300}
                                    alt='logo'
                                />
                            </div>
                            <div className={`${style.contInfo}`}>
                                <div className={`${style.title}`}>
                                    Địên thoại
                                </div>
                                <p>( +84) 437.656.899 – 0988176899
                                </p>
                            </div>
                        </li>
                        <li className='w-[30%] max-1200:w-full max-800:py-4'>
                            <div className={`${style.img}`}>
                                <Image
                                    className='w-8'
                                    src={'/contact/send-icon.png'}
                                    width={300}
                                    height={300}
                                    alt='logo'
                                />
                            </div>
                            <div className={`${style.contInfo}`}>
                                <div className={`${style.title}`}>
                                    Mail
                                </div>
                                <p> support.xtp@ai.vn</p>
                            </div>
                        </li>
                    </ul>
                    <div className={`${style.map} relative overflow-hidden h-full m-0 p-0 pb-5`}>
                        <div className='h-full w-full top-0 left-0 flex justify-center'>
                            <Link
                                href={'https://www.google.com/maps/place/BIDV+C%E1%BA%A7u+Gi%E1%BA%A5y/@21.0341494,105.7933712,16z/data=!4m14!1m7!3m6!1s0x3135ab47bd99568d:0x795771a5661f8b96!2zQklEViBD4bqndSBHaeG6pXk!8m2!3d21.0341701!4d105.7956325!16s%2Fg%2F1tdxbrpq!3m5!1s0x3135ab47bd99568d:0x795771a5661f8b96!8m2!3d21.0341701!4d105.7956325!16s%2Fg%2F1tdxbrpq?entry=ttu&g_ep=EgoyMDI1MDEwOC4wIKXMDSoASAFQAw%3D%3D'}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image className='w-[870px]' width={500} height={500} src={'/map_vitri_cty.png'} alt='c' />
                            </Link>
                        </div>
                    </div>
                    <div className={`${style.contactUs} pb-16`}>
                        <h3 className='text-[32px]'>Liên hệ với chúng tôi</h3>
                        <div className={`${style.form}`}>
                            <form className='w-full' action="">
                                <ul className='flex w-full flex-wrap mb-0'>
                                    <li>
                                        <label>Họ Và Tên</label>
                                        <input
                                            type="text"
                                            name="FullName"
                                            className={`${style.formControl}`}
                                        />
                                    </li>
                                    <li>
                                        <label>Số Điện Thoại</label>
                                        <input
                                            type="number"
                                            name="FullName"
                                            className={`${style.formControl}`}
                                        />
                                    </li>
                                    <li>
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="FullName"
                                            className={`${style.formControl}`}
                                        />
                                    </li>
                                    <li>
                                        <label>Nội Dung</label>
                                        <textarea name="content"></textarea>
                                    </li>
                                    <li>
                                        <label>Mã Xác Thực</label>
                                        <input
                                            type="text"
                                            name="FullName"
                                            className={`${style.formControl}`}
                                        />
                                    </li>
                                    <li className='w-auto pt-7'>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main >
    )
}

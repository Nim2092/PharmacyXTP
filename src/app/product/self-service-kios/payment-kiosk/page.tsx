'use client';
import React, { useState, useEffect } from "react";
import style from "@/app/style/styles.module.css";
import Navigation from '@/components/navigation';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import Footer from "@/components/Footer";
import Benefit from "@/components/benefit";

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
                                GIẢI PHÁP KIOSK Y TẾ THÔNG MINH XTP TRONG BỆNH VIỆN
                            </h1>
                            <p className='text-sm mb-5 font-medium'>
                                Kiosk Y tế thông minh hỗ trợ bệnh viện đón tiếp bệnh nhân, nhằm đưa những tiện ích vào đề án 06 triển khai chuyển đổi số Quốc Gia, thanh toán không tiền mặt cho các cơ sở Y tế
                            </p>
                            <div className='mt-12 mr-[-15px]'>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
                                    onClick={() => {
                                        const link = document.createElement("a");
                                        link.href = "/file/OFFICIAL HỆ THỐNG KIOSK TỰ PHỤC NIAD  20.11.24 (1).pdf";
                                        link.download = "OFFICIAL HỆ THỐNG KIOSK TỰ PHỤC NIAD  20.11.24 (1).pdf";
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                >
                                    Download now
                                </button>
                                <button
                                    className="bg-white hover:bg-slate-200 text-slate-500 font-bold py-2 px-4 rounded-full m-2"
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
                                                <iframe className="w-full" width="560" height="315" src="https://www.youtube.com/embed/GV7AI9HrDJ4?si=gK4OVmVquIsAvAkY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='text-center relative min-h-0.5 px-4 w-[45%] m-auto float-right max-930:w-full'>
                            <Image className='w-full h-full' width={300} height={300} src={'/product/kiost-tron-y-te-thong-minh.png'} alt='' />
                        </div>
                    </div>
                </div>
            </section>
            <Benefit />
            <Footer />
        </main >

    )
}

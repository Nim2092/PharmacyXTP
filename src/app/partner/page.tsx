'use client';
import React, { useState } from 'react';
import style from "@/app/style/styles.module.css";
import Navigation from '@/components/navigation';
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import BannerSlider from '@/components/BannerSlider';
export default function partner() {
    const [logos] = useState([
        "/partners/Logo-hanh-chinh-cong.jpg",
        "/partners/bo-y-te.png",
        "/partners/logo-giao-duc-2.jpg",
        "/partners/bidv-logo.png",
        "/partners/niad-logo-2.jpg",
        "/partners/virtnam-post-logo.png",
    ]);

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
                        <div className="flex w-[30%] h-[2.9px]">
                            <div className="flex-[4] bg-[#e91e1e]"></div>
                            <div className="flex-[6] bg-[#f8b133]"></div>
                        </div>
                        <h2 className="mt-4">ĐỐI TÁC & KHÁCH HÀNG</h2>
                    </div>
                    <div className="w-full overflow-hidden bg-white py-4 relative">
                        <div className="flex gap-2 animate-slide">
                            {[...logos, ...logos].map((logo, index) => (
                                <div key={index} className="flex-shrink-0 w-[calc(100%/6)]">
                                    <Image width={1000} height={300} className='w-auto h-auto max-w-[80%] max-h-[100%] min-w-[60%] min-h-[80%]' src={logo} alt={`Logo ${index + 1}`} />
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
            </section>
            <Footer />
        </main>
    )
}

'use client';
import React, { useState, useEffect } from "react";
import style from "@/app/style/styles.module.css";
import Navigation from '@/components/navigation';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import Benefit from '@/components/benefit';
import Footer from "@/components/Footer";

export default function product() {
    const pathname = usePathname();
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
            <section className='py-[3.125rem] pb-[100px] overflow-hidden'>
                <Image width={1000} height={300} src={'/product/backgroud-xe-cho-tien-cho-ngan-hang.jpg'} alt="" className="w-full h-full" />
                <div className='container w-full max-w-[1200px]'>
                    <div>
                        <div className='m-auto relative min-h-0.5 px-4 w-[55%] float-left max-930:w-full'>
                            <div className=' mr-[-15px]'>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2 "
                                    onClick={() => {
                                        const link = document.createElement("a");
                                        link.href = "/file/OFFICIAL GIAI PHAP QUAN LY XE CHO TIEN.pdf";
                                        link.download = "OFFICIAL GIAI PHAP QUAN LY XE CHO TIEN.pdf";
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
                                                <iframe width="560" height="315" className='w-full' src="https://www.youtube.com/embed/Ec77hS0xhAY?si=6_eT0h16MCIbq6mL" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Benefit />
            <Footer />
        </main >

    )
}

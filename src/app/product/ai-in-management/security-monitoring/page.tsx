'use client';
import React, { useState } from "react";
import style from "@/app/style/styles.module.css";
import Navigation from '@/components/navigation';
import Image from "next/image";
import Benefit from '@/components/benefit';
import Footer from "@/components/Footer";

export default function product() {
    const [showVideo, setShowVideo] = useState(false);

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
            <section className='py-[3.125rem] pb-[100px]'>
                <div className="relative w-full max-w-[1200px] mx-auto">
                    <Image
                        src={'/product/backgroud-giam-sat-ngan-hang-giao-dich-tien-mat.jpg'}
                        width={1200}
                        height={500}
                        className="w-full h-auto object-cover rounded-lg"
                        alt="Background giám sát ngân hàng"
                    />                 
                    <div className="absolute top-[77%] left-[2%] transform -translate-y-1/2">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mr-4 text-[clamp(12px,1.5vw,14px)]"
                            onClick={() => {
                                const link = document.createElement("a");
                                link.href = "/file/OFFICIAL GIAM SAT AN NINH.pdf";
                                link.download = "OFFICIAL GIAM SAT NGAN HANG GIAO DICH TIEN MAT.pdf";
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                        >
                            Download now
                        </button>
                        <button
                            className="bg-white hover:bg-slate-200 text-slate-500 font-bold py-2 px-6 rounded-full text-[clamp(12px,1.5vw,14px)]"
                            onClick={() => setShowVideo(true)}
                        >
                            Video hướng dẫn
                        </button>
                    </div>
                </div>

                {/* Popup video hướng dẫn */}
                {showVideo && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                                onClick={() => setShowVideo(false)}
                            >
                                ✖
                            </button>
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    width="560"
                                    height="315"
                                    className="w-full"
                                    src="https://www.youtube.com/embed/Ec77hS0xhAY?si=6_eT0h16MCIbq6mL"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <Benefit />
            <Footer />
        </main >

    )
}

'use client';
import React from 'react';
import Image from "next/image";
import style from "@/app/style/styles.module.css";
import Navigation from "@/components/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";
import BannerSlider from '@/components/BannerSlider';


export default function news() {
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
            <Blog />
            <Footer />
        </main>
    )
}

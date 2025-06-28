'use client';
import React from 'react';
import style from "@/app/style/styles.module.css";
import Navigation from '@/components/navigation';
import Footer from "@/components/Footer";
import { FaBoxOpen } from "react-icons/fa";

export default function page() {
    return (
        <main className={`${style.mainIndex} w-[70%] bg-white ml-[15%] mr-[15%] relative top-[20vh] flex flex-col shadow-md`}>
            <Navigation />
            <section className='container w-full h-full text-center text-gray-500'>
                <div className=' my-16'>
                    <FaBoxOpen className="text-6xl mx-auto mb-4 text-gray-400" />
                    <h2 className='flex flex-row justify-center items-center text-3xl opacity-50'> Hiện chưa có sản phẩm nào! Vui lòng quay lại sau</h2>
                </div>
            </section>
            <Footer />
        </main>
    )
}

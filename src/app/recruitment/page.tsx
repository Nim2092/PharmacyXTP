'use client';
import React, { useState, useEffect, useRef } from 'react';
import emailjs from "@emailjs/browser";
import style from "@/app/style/styles.module.css";
import Navigation from '@/components/navigation';
import Footer from "@/components/Footer";
import BannerSlider from '@/components/BannerSlider';
import Link from "next/link";

export default function recruitment() {
    const [showForm, setShowForm] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    const [formData, setFormData] = useState({
        position: '',
        name: '',
        university: '',
        specialized: '',
        studentyear: '',
        skill: '',
        project: '',
        email: '',
        phone: '',
        message: '',
    });

    const formRef = useRef<HTMLFormElement | null>(null);

    const handleClick = () => {
        setShowForm(true);
        document.body.style.overflow = "hidden"; // Chặn cuộn trang khi hiển thị form
    };

    const handleClickOff = () => {
        setShowForm(false);
        document.body.style.overflow = "auto"; // Khôi phục cuộn trang khi đóng form
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formRef.current) {
            console.error("Form reference is null");
            return;
        }

        try {
            const result = await emailjs.sendForm(
                'service_465',  // Service ID 
                'template_1210',  // Template 
                formRef.current, //
                'xK1xvHBDf9fjhLR_D',    // Public Key
            );

            alert("Hồ sơ đã gửi thành công!");
            setFormData({ position: '', name: '', university: '', specialized: '', skill: '', project: '', studentyear: '', email: '', phone: '', message: '' });
            setShowForm(false);
        } catch (error) {
            alert("Có lỗi xảy ra, vui lòng thử lại!");
            console.error("Lỗi gửi email:", error);
        }
    };

    const reacuitments = [
        {
            id: 1,
            location: ' Intern Front End',
            wage: 'Thỏa thuận',
            address: 'Hà Nội',
            time: ' Hạn hồ sơ 30/03/2025',
        },
        {
            id: 2,
            location: 'Intern Back End',
            wage: 'Thỏa thuận',
            address: 'Hà Nội',
            time: ' Hạn hồ sơ 30/03/2025',
        },
        {
            id: 3,
            location: 'Intern Ai (Python)',
            wage: 'Thỏa thuận',
            address: 'Hà Nội',
            time: ' Hạn hồ sơ 30/03/2025',
        }
    ];
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
            <section className={`py-[3.125rem]`}>
                <div className='w-full px-4 mx-auto'>
                    <div className='flex items-center justify-center flex-col flex-grow'>
                        <h2 className='text-black text-[32px] font-bold text-center uppercase'>
                            CƠ HỘI NGHỀ NGHIỆP
                        </h2>
                        <span className='bg-[#db0d0d] w-20 h-1 mt-2 mb-6'></span>
                    </div>
                </div>
                <div className={`${style.container} w-full px-7 py-4 mx-auto`}>
                    <div className='justify-center flex flex-wrap'>
                        {reacuitments.map(recruitment => (
                            <div key={recruitment.id} className='p-6 mb-4 cursor-default w-full mx-auto' style={{ borderBottom: '1px solid #e0e0e0' }}>
                                <div className='flex flex-wrap'>
                                    <div className='pl-0 flex-col flex flex-grow relative pr-4 w-1/2'>
                                        <div>
                                            <Link href={'#'} className='font-[700] no-underline '>
                                                {recruitment.location}
                                            </Link>
                                        </div>
                                        <div className='flex flex-col pt-2'>
                                            <div className='pr-2 pt-3 flex flex-col '>
                                                <div className='flex flex-row'>
                                                    <span className='inline-block w-6 h-6'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                                        </svg>
                                                    </span>
                                                    <span className='text-red-500 ml-2 mr-12 text-base whitespace-nowrap flex flex-col justify-center'>
                                                        {recruitment.wage}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='pr-2 pt-3 flex flex-col '>
                                                <div className='flex flex-row'>
                                                    <span className='inline-block w-6 h-6'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                        </svg>
                                                    </span>
                                                    <span className='text-black ml-2 mr-12 text-base whitespace-nowrap flex flex-col justify-center'>
                                                        {recruitment.address}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='pr-2 pt-3 flex flex-col '>
                                                <div className='flex flex-row'>
                                                    <span className='inline-block w-6 h-6'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                    </span>
                                                    <span className='text-black ml-2 mr-12 text-base whitespace-nowrap flex flex-col justify-center'>
                                                        {recruitment.time}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='justify-center flex-col flex '>
                                        <button
                                            className='w-full block no-underline p-3 my-auto text-white text-center whitespace-nowrap' style={{ background: '#2690eb', maxWidth: '200px', minWidth: '100px', borderRadius: '24px' }}
                                            onClick={handleClick}
                                        >
                                            Ứng tuyển
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <div id='bgForm' className={`${showForm ? "!block" : "hidden"} fixed top-[0] left-0 w-full h-full bg-[#000000] opacity-50 z-[9999]`}></div>
            {showForm && (
                <section
                    className="fixed h-[98%] max-h-[80%] min-h-[200px] p-6 left-1/2 bg-white flex z-[9999] w-[600px] top-[21%] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,.16)] border-t-4 border-solid border-[#2680eb] overflow-y-hidden flex-col max-726:w-[90%] max-726:!h-[75%] max-726:max-h-full max-726:mx-auto max-500:top-[15%]"
                    style={{ transform: 'translateX(-50%)' }}
                >
                    <div className='absolute w-[calc(100%-48px)] justify-between flex'>
                        <div className='text-base font-bold absolute'>Nộp Hồ Sơ</div>
                        <button className="absolute top-0 right-2" onClick={handleClickOff}>✖</button>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} className="mt-8 overflow-y-auto overflow-x-hidden">
                        <div className="mt-8 overflow-y-auto overflow-x-hidden">
                            <div className='w-[98%] h-auto'>
                                <div className='w-full mb-4'>
                                    <div className='flex'>
                                        <label className='mb-2'>Chọn vị trí ứng tuyển</label>
                                        <span className='text-red-600 ml-1'>*</span>
                                    </div>
                                    <div className='w-full'>
                                        <select
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            required
                                            className="px-4 h-10 border border-solid border-gray-300 rounded-[4px] outline-none w-full"
                                        >
                                            <option className='opacity-50' value=""></option>
                                            <option value="TTS Frontend">TTS Frontend</option>
                                            <option value="TTS Backend">TTS Backend</option>
                                            <option value="TTS Python">TTS Python</option>
                                            <option value="TTS Fullstack">TTS Fullstack</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='w-full mb-4'>
                                    <div className='flex'>
                                        <label className='mb-2'>Họ và tên</label>
                                        <span className='text-red-600 ml-1'>*</span>
                                    </div>
                                    <div className='w-full'>
                                        <input
                                            className="px-4 h-10 border border-solid border-gray-300 rounded-[4px] outline-none w-full"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='w-full mb-4'>
                                    <div className='flex'>
                                        <label className='mb-2'>Trường đại học</label>
                                        <span className='text-red-600 ml-1'>*</span>
                                    </div>
                                    <div className='w-full'>
                                        <input
                                            type="text"
                                            name="university"
                                            value={formData.university}
                                            onChange={handleChange}
                                            required
                                            className="px-4 h-10 border border-solid border-gray-300 rounded-[4px] outline-none w-full"
                                        />
                                    </div>
                                </div>
                                <div className='w-full mb-4'>
                                    <div className='flex'>
                                        <label className='mb-2'>Chuyên nghành</label>
                                        <span className='text-red-600 ml-1'>*</span>
                                    </div>
                                    <div className='w-full'>
                                        <input
                                            type="text"
                                            name="specialized"
                                            value={formData.specialized}
                                            onChange={handleChange}
                                            required
                                            className="px-4 h-10 border border-solid border-gray-300 rounded-[4px] outline-none w-full"
                                        />
                                    </div>
                                </div>
                                <div className='w-full mb-4'>
                                    <div className='flex'>
                                        <label className='mb-2'>Sinh viên năm học</label>
                                        <span className='text-red-600 ml-1'>*</span>
                                    </div>
                                    <div className='w-full'>
                                        <select
                                            name="studentyear"
                                            value={formData.studentyear}
                                            onChange={handleChange}
                                            required
                                            className="px-4 h-10 border border-solid border-gray-300 rounded-[4px] outline-none w-full"
                                        >
                                            <option className='opacity-50' value=""></option>
                                            <option value="TTS Frontend">Năm 3</option>
                                            <option value="TTS Backend">Năm 4</option>
                                            <option value="TTS Fullstack">Năm cuối</option>
                                            <option value="TTS Fullstack">Đã ra trường</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='w-full mb-4'>
                                    <div className='flex'>
                                        <label className='mb-2'>Kỹ năng</label>
                                        <span className='text-red-600 ml-1'>*</span>
                                    </div>
                                    <div className='w-full'>
                                        <textarea
                                            name="skill"
                                            value={formData.skill}
                                            onChange={handleChange}
                                            required
                                            className="px-4 h-12 border border-solid border-gray-300 rounded-[4px] outline-none w-full"
                                        />
                                    </div>
                                </div>
                                <div className='w-full mb-4'>
                                    <div className='flex'>
                                        <label className='mb-2'>Project</label>
                                        <span className='text-red-600 ml-1'>*</span>
                                    </div>
                                    <div className='w-full'>
                                        <textarea
                                            name="project"
                                            placeholder=""
                                            value={formData.project}
                                            onChange={handleChange}
                                            required
                                            className="px-4 h-12 border border-solid border-gray-300 rounded-[4px] outline-none w-full"
                                        />
                                    </div>
                                </div>
                                <div className='w-full mb-4'>
                                    <div className='flex'>
                                        <label className='mb-2'>Email</label>
                                        <span className='text-red-600 ml-1'>*</span>
                                    </div>
                                    <div className='w-full'>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="px-4 h-10 border border-solid border-gray-300 rounded-[4px] outline-none w-full"
                                        />
                                    </div>
                                </div>
                                <div className='w-full mb-4'>
                                    <div className='flex'>
                                        <label className='mb-2'>Số điện thoại</label>
                                        <span className='text-red-600 ml-1'>*</span>
                                    </div>
                                    <div className='w-full'>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="px-4 h-10 border border-solid border-gray-300 rounded-[4px] outline-none w-full"
                                        />
                                    </div>
                                </div>
                                <div className='w-ful mb-4'>
                                    <div className='flex'>
                                        <label className='mb-2'>message</label>
                                        <span className='text-red-600 ml-1'>*</span>
                                    </div>
                                    <div className='w-full'>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="px-4 h-12 border border-solid border-gray-300 rounded-[4px] outline-none w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="flex justify-center items-center w-full bg-blue-500 text-white p-2 hover:bg-blue-600 transition-all rounded cursor-pointer mt-4 leading-10 h-10"
                        >
                            Gửi hồ sơ
                        </button>
                    </form>
                </section>
            )}
            <Footer />
        </main >
    )
}

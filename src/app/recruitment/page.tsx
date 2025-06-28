'use client';
import React, { useState, useEffect, useRef } from 'react';
import emailjs from "@emailjs/browser";
import style from "@/app/style/styles.module.css";
import Navigation from '@/components/navigation';
import Footer from "@/components/Footer";
<<<<<<< HEAD
import BannerSlider from '@/components/BannerSlider';
import Link from "next/link";
=======
import RecruitmentBanner from "@/components/Recruitmentbanner"
import HexagonImage from "@/components/HexagonImage";
import Link from "next/link";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"; 
import { uploadFileToDrive } from '@/utils/googleDriveUpload';
>>>>>>> 255b29b (Initial commit: Add existing project files)

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

<<<<<<< HEAD
    const formRef = useRef<HTMLFormElement | null>(null);

    const handleClick = () => {
        setShowForm(true);
        document.body.style.overflow = "hidden"; // Chặn cuộn trang khi hiển thị form
=======
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [recruitmentData, setRecruitmentData] = useState<any>(null);
    const formRef = useRef<HTMLFormElement | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const sliderRef = useRef<any>(null);

    const handleClick = () => {
        setShowForm(true);
        document.body.style.overflow = "hidden";
>>>>>>> 255b29b (Initial commit: Add existing project files)
    };

    const handleClickOff = () => {
        setShowForm(false);
<<<<<<< HEAD
        document.body.style.overflow = "auto"; // Khôi phục cuộn trang khi đóng form
=======
        document.body.style.overflow = "auto";
>>>>>>> 255b29b (Initial commit: Add existing project files)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
<<<<<<< HEAD

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

=======
    const RoundImage = ({ src, alt, className = "" }: { src: string; alt?: string; className?: string }) => (
    <img src={src} alt={alt} className={`rounded-full border-4 border-[#1553ad] object-cover ${className}`} />
    );

    const SquareImage = ({ src, alt, className = "" }: { src: string; alt?: string; className?: string }) => (
        <img src={src} alt={alt} className={`rounded-lg object-cover ${className}`} />
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
>>>>>>> 255b29b (Initial commit: Add existing project files)
        if (!formRef.current) {
            console.error("Form reference is null");
            return;
        }
<<<<<<< HEAD

        try {
            const result = await emailjs.sendForm(
                'service_465',  // Service ID 
                'template_1210',  // Template 
                formRef.current, //
                'xK1xvHBDf9fjhLR_D',    // Public Key
            );

            alert("Hồ sơ đã gửi thành công!");
            setFormData({ position: '', name: '', university: '', specialized: '', skill: '', project: '', studentyear: '', email: '', phone: '', message: '' });
=======
        if (!cvFile) {
            alert("Vui lòng tải lên file CV (PDF)");
            return;
        }
        try {
            // 1. Upload file lên back-end, back-end sẽ trả về link Google Drive
            const driveLink = await uploadFileToDrive(cvFile);
            if (!driveLink) {
                alert("Không upload được file lên Google Drive!");
                return;
            }

            // 2. Gửi form qua EmailJS, trường cv là link Google Drive
            const formDataCopy = { ...formData, cv: driveLink };
            await emailjs.send(
                'service_qyw5t0d',
                'template_1210',
                formDataCopy,
                'VTy0S3ULSFWXJaFkJ'
            );
            alert("Hồ sơ đã gửi thành công!");
            setFormData({ position: '', name: '', university: '', specialized: '', skill: '', project: '', studentyear: '', email: '', phone: '', message: '' });
            setCvFile(null);
>>>>>>> 255b29b (Initial commit: Add existing project files)
            setShowForm(false);
        } catch (error) {
            alert("Có lỗi xảy ra, vui lòng thử lại!");
            console.error("Lỗi gửi email:", error);
        }
    };

<<<<<<< HEAD
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
=======
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCvFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8080/recruitment-page').then(res => {
            let loaded = {};
            try {
                loaded = JSON.parse(res.data.data || '{}');
            } catch (e) {
                loaded = {};
            }
            setRecruitmentData(loaded);
        });
    }, []);

>>>>>>> 255b29b (Initial commit: Add existing project files)
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
<<<<<<< HEAD
            <BannerSlider />
=======
            {/* Banner động */}
            {recruitmentData && recruitmentData.banner && (
                <RecruitmentBanner 
                    banner={recruitmentData.banner}
                    bannerTitle={recruitmentData.bannerTitle}
                />
            )}

            {/* --- PHẦN GIỚI THIỆU HITECH --- */}
            <section className="w-full flex flex-col items-center mt-8">
                <h1 className="text-[64px] font-bold text-[#1553ad] text-center leading-tight bg-[#b3d2f1] px-8 py-2 rounded-md mb-6 w-fit mx-auto">
                    {recruitmentData?.mainTitle || ''}
                </h1>
                <hr className="w-[96%] h-[6px] bg-gray-100 border-0 my-6" />
                <div className="flex flex-row w-full justify-center items-start gap-8 mt-4">
                    <img
                        src={recruitmentData?.intro?.logo || ''}
                        alt="Hitech Vietnam"
                        className="w-[350px] h-auto object-contain"
                        style={{ minWidth: 220 }}
                    />
                    <div className="max-w-[900px] text-[28px] leading-[1.4] text-black text-justify">
                        {recruitmentData?.intro?.text || ''}
                    </div>
                </div>
            </section>

            {/* Hexagon Images động */}
            <section
                className="flex flex-wrap justify-center items-center gap-y-0"
                style={{ marginTop: 100 }}
            >
                {recruitmentData?.hexagonImages?.map((img: any, idx: number) => (
                    <HexagonImage key={idx} src={img.src} alt={img.alt} className={idx % 2 === 0 ? "mt-12" : ""} />
                ))}
            </section>

            {/* --- MỤC TIÊU CỦA CHÚNG TÔI --- */}
            <section className="w-full flex flex-col items-center mt-16 mb-8">
                <div className="flex items-center justify-center mb-8">
                    <h2 className="text-[64px] font-bold text-[#1553ad] text-center leading-tight uppercase mr-4">
                        {recruitmentData?.goalsTitle || 'Mục tiêu của chúng tôi'}
                    </h2>
                    {recruitmentData?.goalsIcon && <img src={recruitmentData.goalsIcon} alt="Chart" className="w-20 h-20 object-contain" />}
                </div>
                <div className="w-[98%] bg-[#f7f7f7] rounded-lg flex flex-row justify-center items-stretch gap-8 py-10 px-4">
                    {recruitmentData?.goals?.map((goal: any, idx: number) => (
                        <div key={idx} className="flex-1 flex flex-col items-center text-center px-4">
                            {goal.icon && <img src={goal.icon} alt="" className="w-16 h-16 mb-2" />}
                            <h3 className="text-2xl font-semibold mb-2">{goal.title}</h3>
                            <p className="text-lg text-gray-800">{goal.desc}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* --- HÌNH ẢNH SINH VIÊN THỰC HÀNH --- */}
            <section className="w-full flex flex-col items-center mt-16 mb-8">
                <h2 className="text-[40px] md:text-[48px] font-bold text-[#1553ad] text-center mb-2">
                    {recruitmentData?.studentImagesTitle || 'Hình ảnh của sinh viên đang thực hành dự án'}
                </h2>
                <div className="w-full flex justify-center items-center relative" style={{ minHeight: 420 }}>
                    {/* Nút chuyển trái */}
                    <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-14 h-14 flex items-center justify-center shadow hover:bg-blue-100 z-20 transition"
                        style={{ border: "none" }}
                        onClick={() => sliderRef.current?.slickPrev()}
                    >
                        <FaAngleLeft className="text-3xl text-[#1553ad]" />
                    </button>

                    {/* Ảnh mờ trái */}
                    {recruitmentData?.studentImages?.length > 1 && (
                        <img
                            src={recruitmentData.studentImages[
                                (currentSlide - 1 + recruitmentData.studentImages.length) % recruitmentData.studentImages.length
                            ]?.src}
                            alt=""
                            className={`w-[280px] h-[190px] object-cover blur-sm mx-4 transition-all duration-700
                                ${isSliding ? "opacity-0" : "opacity-30"}`}
                            style={{ zIndex: 5 }}
                        />
                    )}

                    {/* Ảnh chính */}
                    <div className="flex flex-col items-center justify-center">
                        <Slider
                            dots={false}
                            infinite={true}
                            speed={700}
                            slidesToShow={1}
                            slidesToScroll={1}
                            arrows={false}
                            autoplay={true}
                            autoplaySpeed={3000}
                            ref={sliderRef}
                            className="w-[600px]"
                            beforeChange={(_, next) => {
                                setIsSliding(true);
                                setTimeout(() => setIsSliding(false), 700); // 700 = speed
                                setCurrentSlide(next);
                            }}
                        >
                            {recruitmentData?.studentImages?.map((img: any, idx: number) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-[600px] h-[350px] object-cover shadow-lg mx-auto"
                                    />
                                    {img.alt && (
                                        <div className="mt-4 text-center text-lg text-gray-700">{img.alt}</div>
                                    )}
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {/* Ảnh mờ phải */}
                    {recruitmentData?.studentImages?.length > 1 && (
                        <img
                            src={recruitmentData.studentImages[
                                (currentSlide + 1) % recruitmentData.studentImages.length
                            ]?.src}
                            alt=""
                            className={`w-[280px] h-[190px] object-cover blur-sm mx-4 transition-all duration-700
                                ${isSliding ? "opacity-0" : "opacity-30"}`}
                            style={{ zIndex: 5 }}
                        />
                    )}

                    {/* Nút chuyển phải */}
                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-14 h-14 flex items-center justify-center shadow hover:bg-blue-100 z-20 transition"
                        style={{ border: "none" }}
                        onClick={() => sliderRef.current?.slickNext()}
                    >
                        <FaAngleRight className="text-3xl text-[#1553ad]" />
                    </button>
                </div>
            </section>

       {/* --- ẢNH SINH VIÊN THỰC HÀNH DỰ ÁN 2 + NỘI DUNG SINH VIÊN THỰC HÀNH (CKEditor) --- */}
            {(recruitmentData?.studentProject2?.length > 0 || recruitmentData?.studentContent) && (
                <section className="w-full flex flex-col items-center mt-16 mb-8">
                    <div className="flex flex-col md:flex-row w-full max-w-[1500px] mx-auto gap-8">
                        {/* Ảnh bên trái động */}
                        <div className="flex flex-col gap-6 flex-shrink-0 items-center md:items-start w-full md:w-[400px]">
                            {recruitmentData?.studentProject2?.map((img: any, idx: number) => (
                                <SquareImage
                                    key={idx}
                                    src={img.src}
                                    alt={img.alt}
                                    className={`w-[420px] h-[250px] rounded-xl object-cover shadow transition-all duration-300 mt-12 ${idx % 2 === 1 ? "ml-8" : ""}`}
                                />
                            ))}
                        </div>
                        {/* Nội dung bên phải: studentContent (CKEditor) */}
                        <div className="flex-1 flex flex-col justify-start" >
                            {recruitmentData?.studentContent && (
                                <div className="w-full text-[20px] leading-[1.7] text-black bg-[#f7f7f7] rounded-lg p-8 shadow" 
                                    dangerouslySetInnerHTML={{ __html: recruitmentData.studentContent }} />
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* --- CƠ HỘI NGHỀ NGHIỆP --- */}
>>>>>>> 255b29b (Initial commit: Add existing project files)
            <section className={`py-[3.125rem]`}>
                <div className='w-full px-4 mx-auto'>
                    <div className='flex items-center justify-center flex-col flex-grow'>
                        <h2 className='text-black text-[32px] font-bold text-center uppercase'>
<<<<<<< HEAD
                            CƠ HỘI NGHỀ NGHIỆP
=======
                            {recruitmentData?.recruitmentsTitle || 'CƠ HỘI NGHỀ NGHIỆP'}
>>>>>>> 255b29b (Initial commit: Add existing project files)
                        </h2>
                        <span className='bg-[#db0d0d] w-20 h-1 mt-2 mb-6'></span>
                    </div>
                </div>
                <div className={`${style.container} w-full px-7 py-4 mx-auto`}>
                    <div className='justify-center flex flex-wrap'>
<<<<<<< HEAD
                        {reacuitments.map(recruitment => (
                            <div key={recruitment.id} className='p-6 mb-4 cursor-default w-full mx-auto' style={{ borderBottom: '1px solid #e0e0e0' }}>
=======
                        {recruitmentData?.recruitments?.map((recruitment: any, idx: number) => (
                            <div key={idx} className='p-6 mb-4 cursor-default w-full mx-auto' style={{ borderBottom: '1px solid #e0e0e0' }}>
>>>>>>> 255b29b (Initial commit: Add existing project files)
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
<<<<<<< HEAD
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
=======
            {/* Overlay để click ra ngoài đóng form */}
            <div
                id='bgForm'
                className={`${showForm ? "!block" : "hidden"} fixed top-0 left-0 w-full h-full bg-[#000000] opacity-50 z-[9998]`}
                onClick={handleClickOff}
            ></div>
            {showForm && (
                <section
                    className="fixed h-[98%] max-h-[80%] min-h-[200px] p-6 left-1/2 bg-white flex z-[9999] w-[420px] top-[10%] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,.16)] border-t-4 border-solid border-[#2680eb] overflow-y-auto flex-col"
                    style={{ transform: 'translateX(-50%)' }}
                    onClick={e => e.stopPropagation()} // Ngăn sự kiện nổi bọt khi click vào form
                >
                    <div className='flex justify-between items-center mb-4'>
                        <div className='text-lg font-bold'>Nộp hồ sơ ứng tuyển</div>
                        <button className="text-2xl" onClick={handleClickOff}>✖</button>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
                        {/* Upload CV */}
                        <div>
                            <label className="block mb-1 font-semibold">Tải lên CV (PDF)</label>
                            <input
                                type="file"
                                name="cv"
                                accept=".pdf"
                                required
                                className="block w-full border border-gray-300 rounded px-3 py-2"
                                onChange={handleFileChange}
                            />
                        </div>
                        {/* Họ và tên */}
                        <div>
                            <label className="block mb-1 font-semibold">Họ và tên</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="block w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-semibold">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="block w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        {/* Số điện thoại */}
                        <div>
                            <label className="block mb-1 font-semibold">Số điện thoại</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="block w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        {/* Thư giới thiệu */}
                        <div>
                            <label className="block mb-1 font-semibold">Thư giới thiệu</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Viết giới thiệu ngắn gọn về bản thân, điểm mạnh, điểm yếu và lý do bạn muốn ứng tuyển..."
                                className="block w-full border border-gray-300 rounded px-3 py-2 min-h-[80px]"
                            />
                        </div>
                        {/* Nút gửi */}
                        <button
                            type="submit"
                            className="w-full bg-[#00b14f] text-white font-bold py-2 rounded hover:bg-[#009944] transition"
                        >
                            Nộp hồ sơ ứng tuyển
>>>>>>> 255b29b (Initial commit: Add existing project files)
                        </button>
                    </form>
                </section>
            )}
            <Footer />
        </main >
    )
}

'use client';
import React, { useState, useEffect, useRef } from 'react';
import emailjs from "@emailjs/browser";
import style from "@/app/style/styles.module.css";
import Navigation from '@/components/navigation';
import Footer from "@/components/Footer";
import RecruitmentBanner from "@/components/Recruitmentbanner"
import HexagonImage from "@/components/HexagonImage";
import Link from "next/link";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"; 
import { uploadFileToDrive } from '@/utils/googleDriveUpload';
// Import mock data và environment config
import { mockRecruitmentPageData, recruitmentPageAPI } from '@/data/mockRecruitmentPage';
import { ENV_CONFIG, envLog } from '@/config/environment';

export default function recruitment() {
    const [showForm, setShowForm] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const [cvFile, setCvFile] = useState<File | null>(null);
    const [recruitmentData, setRecruitmentData] = useState<any>(null);
    const formRef = useRef<HTMLFormElement | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const sliderRef = useRef<any>(null);

    const handleClick = () => {
        setShowForm(true);
        document.body.style.overflow = "hidden";
    };

    const handleClickOff = () => {
        setShowForm(false);
        document.body.style.overflow = "auto";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const RoundImage = ({ src, alt, className = "" }: { src: string; alt?: string; className?: string }) => {
        if (!src) return null;
        return (
            <img src={src} alt={alt} className={`rounded-full border-4 border-[#1553ad] object-cover ${className}`} />
        );
    };

    const SquareImage = ({ src, alt, className = "" }: { src: string; alt?: string; className?: string }) => {
        if (!src) return null;
        return (
            <img src={src} alt={alt} className={`rounded-lg object-cover ${className}`} />
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) {
            console.error("Form reference is null");
            return;
        }
        if (!cvFile) {
            alert("Vui lòng tải lên file CV (PDF)");
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // 1. Upload CV lên Google Drive
            console.log('📤 Uploading CV to Google Drive...');
            const driveLink = await uploadFileToDrive(cvFile);
            if (!driveLink) {
                alert("Không upload được file lên Google Drive!");
                setIsSubmitting(false); // Fix: Reset loading state
                return;
            }
            console.log('✅ CV uploaded successfully:', driveLink);

            // 2. Lưu data vào Google Sheets
            console.log('📊 Saving data to Google Sheets...');
            await saveToGoogleSheets(formData, driveLink);
            console.log('✅ Data saved to Google Sheets');

            // 3. Gửi email thông báo cho admin
            console.log('📧 Sending notification email...');
            const GOOGLE_SHEETS_LINK = 'https://docs.google.com/spreadsheets/d/1t-he4Ap19XPjw7OxkRx-9gHMdA-tgw21-dZVc33ZKoI/edit#gid=0';
            
            await emailjs.send(
                'service_qyw5t0d',
                'template_1210', // Template sẽ gửi đến vietkey951@gmail.com
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    sheetsLink: GOOGLE_SHEETS_LINK,
                    timestamp: new Date().toLocaleString('vi-VN'),
                    adminEmail: 'vietkey951@gmail.com', // Email admin để nhận thông báo
                    applicantName: formData.name,
                    position: 'Thực tập sinh/Sinh viên'
                },
                'VTy0S3ULSFWXJaFkJ'
            );
            console.log('✅ Notification email sent');

            alert("Hồ sơ đã gửi thành công! Admin sẽ liên hệ với bạn sớm.");
            
            // Reset form
            setFormData({ 
                position: '', name: '', university: '', specialized: '', 
                skill: '', project: '', studentyear: '', email: '', phone: '', message: '' 
            });
            setCvFile(null);
            setShowForm(false);
            document.body.style.overflow = "auto";
            
        } catch (error) {
            console.error("❌ Error in form submission:", error);
            alert("Có lỗi xảy ra khi gửi hồ sơ. Vui lòng thử lại!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCvFile(e.target.files[0]);
        }
    };

    // Function để gửi data tới Google Sheets
    const saveToGoogleSheets = async (formData: any, cvLink: string) => {
        const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxOuuTi4AiKovf_CXfwgRC5kAQSKYV7DiYIsoIR9v0M4rO_1wExkI5vWTCTEojLXCc5/exec';
        
        try {
            console.log('📊 Sending data to Google Sheets:', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message?.substring(0, 50) + '...', // Log first 50 chars
                cvLink: cvLink
            });

            const response = await fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    cvLink: cvLink
                }),
                mode: 'no-cors' // Cần thiết cho Google Apps Script
            });

            // Với no-cors, response sẽ không có body
            // Nếu không có error thì coi như thành công
            console.log('✅ Data sent to Google Sheets successfully');
            return true;
        } catch (error) {
            console.error('❌ Error saving to Google Sheets:', error);
            throw new Error('Không thể lưu dữ liệu vào Google Sheets: ' + error);
        }
    };

    useEffect(() => {
        const loadRecruitmentData = async () => {
            try {
                envLog('Loading recruitment data...', { useMockData: ENV_CONFIG.USE_MOCK_DATA });
                
                if (ENV_CONFIG.USE_MOCK_DATA) {
                    // Sử dụng mock data
                    envLog('Using mock data for recruitment page');
                    const mockResponse = await recruitmentPageAPI.getRecruitmentPageData();
                    let loaded = {};
                    try {
                        loaded = JSON.parse(mockResponse.data || '{}');
                        envLog('Mock data loaded successfully', { dataKeys: Object.keys(loaded) });
                    } catch (e) {
                        envLog('Error parsing mock data', e);
                        loaded = mockRecruitmentPageData; // Fallback to direct mock data
                    }
                    setRecruitmentData(loaded);
                } else {
                    // Sử dụng real API
                    envLog('Using real API for recruitment page');
                    const response = await axios.get(`${ENV_CONFIG.API_BASE_URL}${ENV_CONFIG.RECRUITMENT_PAGE_ENDPOINT}`);
                    let loaded = {};
                    try {
                        loaded = JSON.parse(response.data.data || '{}');
                        envLog('Real API data loaded successfully', { dataKeys: Object.keys(loaded) });
                    } catch (e) {
                        envLog('Error parsing real API data', e);
                        loaded = {};
                    }
                    setRecruitmentData(loaded);
                }
            } catch (error) {
                envLog('Error loading recruitment data', error);
                // Fallback to mock data on error
                envLog('Falling back to mock data due to error');
                setRecruitmentData(mockRecruitmentPageData);
            }
        };

        loadRecruitmentData();
    }, []);

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
                    {recruitmentData?.intro?.logo && (
                        <img
                            src={recruitmentData.intro.logo}
                            alt="Hitech Vietnam"
                            className="w-[350px] h-auto object-contain"
                            style={{ minWidth: 220 }}
                        />
                    )}
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
                    {recruitmentData?.studentImages?.length > 1 && 
                     recruitmentData.studentImages[(currentSlide - 1 + recruitmentData.studentImages.length) % recruitmentData.studentImages.length]?.src && (
                        <img
                            src={recruitmentData.studentImages[
                                (currentSlide - 1 + recruitmentData.studentImages.length) % recruitmentData.studentImages.length
                            ].src}
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
                                    {img.src && (
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            className="w-[600px] h-[350px] object-cover shadow-lg mx-auto"
                                        />
                                    )}
                                    {img.alt && (
                                        <div className="mt-4 text-center text-lg text-gray-700">{img.alt}</div>
                                    )}
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {/* Ảnh mờ phải */}
                    {recruitmentData?.studentImages?.length > 1 && 
                     recruitmentData.studentImages[(currentSlide + 1) % recruitmentData.studentImages.length]?.src && (
                        <img
                            src={recruitmentData.studentImages[
                                (currentSlide + 1) % recruitmentData.studentImages.length
                            ].src}
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
            <section className={`py-[3.125rem]`}>
                <div className='w-full px-4 mx-auto'>
                    <div className='flex items-center justify-center flex-col flex-grow'>
                        <h2 className='text-black text-[32px] font-bold text-center uppercase'>
                            {recruitmentData?.recruitmentsTitle || 'CƠ HỘI NGHỀ NGHIỆP'}
                        </h2>
                        <span className='bg-[#db0d0d] w-20 h-1 mt-2 mb-6'></span>
                    </div>
                </div>
                <div className={`${style.container} w-full px-7 py-4 mx-auto`}>
                    <div className='justify-center flex flex-wrap'>
                        {recruitmentData?.recruitments?.map((recruitment: any, idx: number) => (
                            <div key={idx} className='p-6 mb-4 cursor-default w-full mx-auto' style={{ borderBottom: '1px solid #e0e0e0' }}>
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
                            disabled={isSubmitting}
                            className={`w-full font-bold py-2 rounded transition ${
                                isSubmitting 
                                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                                    : 'bg-[#00b14f] text-white hover:bg-[#009944]'
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang gửi...
                                </span>
                            ) : (
                                'Nộp hồ sơ ứng tuyển'
                            )}
                        </button>
                    </form>
                </section>
            )}
            <Footer />
        </main >
    )
}

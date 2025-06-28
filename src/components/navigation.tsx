import Link from 'next/link';
import React, { useState } from "react";
import style from "@/app/style/styles.module.css";


export default function Navigation() {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible((prev) => !prev);
    };

    return (
        <nav className={`${style.hdMenu}`}>
            <div className={`${style.container}`}>
                <div className={`${style.logo}`}>
                    <Link href="/">
                        <img
                            className="h-16"
                            src="/logo.png"
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className='flex-grow-[1]'></div>
                <div
                    className={`overflow-visible transition-all duration-500 ease-in-out ${style.menuMain} ${menuVisible ? "!block" : ""} transition-all duration-500 ease-in-out`}
                >
                    <ul className={`${style.afHover}`}>
                        <li className='pb-7 pt-7 cursor-pointer'>
                            <Link href="/introduce" className="hover:text-blue-700 transition duration-300 font-bold">
                                Giới thiệu
                            </Link>
                            <ul className={`${style.subMenu} z-[99999]`}>
                                <li>
                                    <Link className='text-white !text-left' href={'/introduce'}> Về chúng tôi </Link>
                                </li>
                                <li>
                                    <Link className='text-white !text-left' href={'/introduce/structure'}>Cơ cấu tổ chức</Link>
                                </li>
                                <li>
                                    <Link className='text-white !text-left' href={'/introduce/corevalues'}>Giá trị cốt lõi</Link>
                                </li>
                                <li>
                                    <Link className='text-white !text-left' href={'/introduce/partandcust'}>Đối tác/Khách hàng</Link>
                                </li>
                            </ul>
                        </li>
                        <li className='pb-7 pt-7 cursor-pointer'>
                            <Link href="/product/ai-in-management" className="hover:text-blue-700 transition duration-300 font-bold">
                                Sản phẩm
                            </Link>
                            <ul className={`${style.subMenu} z-[99999]`}>
                                <li className={`relative ${style.Menu} group`}>
                                    <Link className='text-white justify-between !text-left' href={'/product/ai-in-management'}> (AI) Trong hệ thống quản trị
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </Link>
                                    <ul className={`${style.subMenu} sub-list-menu sub-left absolute !left-[216px] !top-[-10px] !w-[225px] !hidden group-hover:!block`} >
                                        <li>
                                            <Link className='text-white !text-left' href={'/product/ai-in-management/security-monitoring'}>  Giám sát ngân hàng GD tiền mặt</Link>
                                        </li>
                                        <li>
                                            <Link className='text-white !text-left' href={'/product/ai-in-management/timekeeping'}>Chấm công tính lương</Link>
                                        </li>
                                        <li>
                                            <Link className='text-white !text-left' href={'/product/ai-in-management/monitor-entry-and-exit'}>Giám sát xe chở tiền cho ngân hàng</Link>
                                        </li>
                                        <li>
                                            <Link className='text-white !text-left' href={'/product/ai-in-management/online-patient-care'}>Giám sát sản xuất</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={`relative ${style.Menu} group`}>
                                    <Link className='text-white justify-between !text-left' href={'/product/hospital/smart-hospital'}>
                                        phần mềm quản trị bệnh viện
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </Link>

                                    <ul className={`${style.subMenu} sub-left absolute !left-[216px] !top-[-10px] !w-[225px] !hidden group-hover:!block`} >
                                        <li>
                                            <Link className='text-white !text-left' href={'/product/hospital/device-management'}> Vật tư y tế, thiết bị </Link>
                                        </li>
                                        <li>
                                            <Link className='text-white !text-left' href={'/product/hospital/smart-hospital'}>Phần mềm HIS & LIS</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={`relative ${style.Menu} group`}>
                                    <Link className='text-white justify-between !text-left' href={'/product/patient-care'}>
                                        phần mềm chăm sóc bệnh nhân online
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </Link>
                                    <ul className={`${style.subMenu} sub-left absolute !left-[216px] !top-[-10px] !w-[225px] !hidden group-hover:!block`} >
                                        <li>
                                            <Link className='text-white !text-left' href={'/product/patient-care/chat-ai'}>Tư vấn bệnh nhân</Link>
                                        </li>
                                        <li>
                                            <Link className='text-white !text-left' href={'/product/patient-care/remote-registration'}>Đăng ký khám từ xa</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={`relative ${style.Menu} group`}>
                                    <Link className='text-white !text-left' href={'/product/payment-kiosk'}>
                                        Kiosk tự phục vụ Đề án 06/CP
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </Link>
                                    <ul className={`${style.subMenu} sub-mobile sub-left absolute !left-[216px] !top-[-11px] !w-[225px] !hidden group-hover:!block`} >
                                        <li>
                                            <Link className='text-white !text-left' href={'/product/self-service-kios/payment-kiosk'}>Quản lý thanh toán không tiền mặt bệnh viện </Link>
                                        </li>
                                        <li>
                                            <Link className='text-white !text-left' href={'/product/self-service-kios/public-self-service-kiosk'}>Tự phục vụ công dân & đăng ký online</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={`relative ${style.Menu} group`}>
                                    <Link className='text-white justify-between !text-left' href={'/product/big-data/security-CSDL'}>Big data <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg></Link>
                                    <ul className={`${style.subMenu} sub-left absolute !left-[216px] !top-[-11px] !w-[225px] !hidden group-hover:!block`} >
                                        <li>
                                            <Link className='text-white !text-left' href={'/product/big-data/security-CSDL'}> Bảo mật an toàn TT cơ sở dữ liệu </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className='pb-7 pt-7 cursor-pointer'>
                            <Link href="/partner" className="hover:text-blue-700 transition duration-300 font-bold">
                                Công ty liên danh
                            </Link>
                            <ul className={`${style.subMenu} z-[99999]`}>
                                <li>
                                    <Link className='text-white !text-left' href={'#'}> Hitech </Link>
                                </li>
                                <li>
                                    <Link
                                        className='text-white !text-left'
                                        href={'https://www.bic.vn/'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >Bảo hiểm Bic</Link>
                                </li>
                                <li>
                                    <Link
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='text-white !text-left' href={'https://www.edreams.com/offers/flights/airline/VN/vietnam-airlines/?mktportal=bing&utm_id=bi_cmp-614041404_adg-1164384646735721_ad-72774248682417_kwd-72774729965455_dev-c_ext-_locphy-142921_mtype-e_ntw-o&utm_term=72774729965455&utm_content=1164384646735721&msclkid=76311a57fe331812ec6b7df8ca14984a&utm_source=bing&utm_medium=cpc&utm_campaign=B-E-GB-FL-AIRLINE-SEA-PC-R'}>Đặt vé máy bay vé máy bay vietnam airline
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className='text-white !text-left'
                                        href={'https://www.hitc.vn/'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >Viễn thông HITC</Link>
                                </li>
                            </ul>
                        </li>
                        <li className='pb-7 pt-7 cursor-pointer'>
                            <Link href="/recruitment" className="hover:text-blue-700 transition duration-300 font-bold">
                                Thông tin tuyển dụng
                            </Link>
                        </li>
                        <li className='pb-7 pt-7 cursor-pointer'>
                            <Link href="/news" className="hover:text-blue-700 transition duration-300 font-bold">
                                Tin tức
                            </Link>
                        </li>
                        <li className='pb-7 pt-7 cursor-pointer'>
                            <Link href="/contact" className="hover:text-blue-700 transition duration-300 font-bold">
                                Liên hệ
                            </Link>
                        </li>
                    </ul>
                </div>
                <div
                    className={`${style.togglerMenu} !hidden`}
                    onClick={toggleMenu}
                >
                    Menu
                </div>
            </div>
        </nav >
    )
}

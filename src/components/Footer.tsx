import Link from 'next/link';
import React from 'react';
import style from "@/app/style/styles.module.css";
import Image from "next/image";


export default function Footer() {
    return (
        <footer className={`${style.footer} px-4 py-12 bg-[#0d1e67] text-white`}>
            <div className={`${style.center} pt-[70px] pb-[60px]`}>
                <div className={`${style.container} max-w-[1170px] w-full flex justify-around`}>
                    <div className={`${style.item}`}>
                        <h4> Giới thiệu </h4>
                        <ul>
                            <li>
                                <Link href={'/introduce'}>
                                    Về chúng tôi
                                </Link>
                            </li>
                            <li>
                                <Link href={'/introduce/structure'}>
                                    Cơ cấu tổ chức
                                </Link>
                            </li>
                            <li>
                                <Link href={'/introduce/corevalues'}>
                                    Giá trị cốt lõi
                                </Link>
                            </li>
                            <li>
                                <Link href={'/introduce/partandcust'}>
                                    Đối tác/Khách hàng
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={`${style.item}`}>
                        <h4> Sản Phẩm </h4>
                        <ul>
                            <li>
                                <Link href={'#'}>
                                    AI trong hệ thống quản trị
                                </Link>
                            </li>
                            <li>
                                <Link href={'#'}>
                                    Phần mềm quản trị bệnh viện
                                </Link>
                            </li>
                            <li>
                                <Link href={'#'}>
                                    Phần mềm chăm sóc bệnh nhân online
                                </Link>
                            </li>
                            <li>
                                <Link href={'#'}>
                                    kiosk tự phục vụ thông minh
                                </Link>
                            </li>
                            <li>
                                <Link href={'#'}>
                                    Big Data
                                </Link>
                            </li>
                            <li>
                                <Link href={'#'}>
                                    Giải pháp bảo mật cơ sở dữ liệu
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={`${style.item}`}>
                        <h4> Công ty liên danh </h4>
                        <ul>
                            <li>
                                <Link href={'#'}>
                                    Hitech
                                </Link>
                            </li>
                            <li>
                                <Link href={'https://www.bic.vn/'}>
                                    Bảo hiểm BIC
                                </Link>
                            </li>
                            <li>
                                <Link href={'https://www.nganluc.vn/'}>
                                    Niad
                                </Link>
                            </li>
                            <li>
                                <Link href={'https://www.hitc.vn/vi/'}>
                                    Viễn thông HITC
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={`${style.item}`}>
                        <h4> Tin tức </h4>
                        <ul>
                            <li>
                                <Link href={'#'}>
                                    Tin tức
                                </Link>
                            </li>
                            <li>
                                <Link href={'#'}>
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className={`${style.top} pt-[30px] bg-[#005db2]`}>
                <div className={`${style.container} flex !justify-around`}>
                    <div className={`${style.logo}`}>
                        <Link href={'#'}>
                            <Image width={150} height={150} src="/logo-removebg.png" alt="Logo" />
                        </Link>
                    </div>
                    <div className={`${style.infoNiad}`}>
                        <h4>
                            CÔNG TY TNHH CÔNG NGHỆ PHARMACY VIỆT NAM
                        </h4>
                        <p className='pb-[10px] text-xs'>
                            <strong>Văn Phòng 1</strong>
                            &nbsp;&nbsp;Tòa nhà N09B2 Đường Thành Thái, Phường Dịch Vọng, Quận Cầu Giấy, TP Hà Nội
                        </p>
                        <p className='pb-[10px] text-xs'>
                            <strong>Văn Phòng 2</strong>
                            &nbsp;&nbsp;Tầng 6 số 263 đường Cầu Giấy, P. Dịch Vọng, Q. Cầu Giấy, Hà Nội
                        </p>
                        <p className='pb-[10px] text-xs'>
                            <strong>Điện thoại</strong>
                            &nbsp;&nbsp; ( +84)437.656.899 - 0988176899
                        </p>
                        <p className='text-sx'>
                            <strong>Email:</strong>
                            &nbsp;&nbsp;support.xtp@ai.vn
                        </p>
                    </div>
                    <div className={`${style.social} ml-2`}>
                        <h4>
                            Liên kết
                        </h4>
                        <ul>
                            <li>
                                <Link href={'#'}>
                                    <Image width={20} height={20} src="/icon/footer-youtube-icon.png" alt="icon youtube" />
                                </Link>
                            </li>
                            <li>
                                <Link href={'#'}>
                                    <Image width={20} height={20} src="/icon/footer-facebook-icon.png" alt="icon facebook" />
                                </Link>
                            </li>
                            <li>
                                <Link href={'#'}>
                                    <Image width={20} height={20} src="/icon/footer-website-icon.png" alt="icon website" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer >
    )
}

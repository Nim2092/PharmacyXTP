'use client';
import React, { useEffect, useRef } from 'react'
import Image from "next/image";
import style from "@/app/style/styles.module.css";
import Link from 'next/link';
export default function Blog() {
    const technologys = [
        {
            id: 1,
            src: "/blog/img-itTP-01.png",
            alt: "Big Data",
        },
        {
            id: 2,
            src: "/blog/img-itTP-02.png",
            alt: "IoT",
        },
        {
            id: 3,
            src: "/blog/img-itTP-03.png",
            alt: "Blockchain",
        },
        {
            id: 4,
            src: "/blog/img-itTP-04.png",
            alt: "AR/VR",
        },
        {
            id: 5,
            src: "/blog/img-itTP-05.png",
            alt: "AI",
        }
    ]

    const getActiveTab = () => {
        return localStorage.getItem("selectedTab") || "promotion";
    };

    const onTabClick = (tab: string) => {
        localStorage.setItem("selectedTab", tab);
        const tabs = document.querySelectorAll("li");
        tabs.forEach((tabElement) => tabElement.classList.remove(style.active));
        document.querySelector(`li[data-tab="${tab}"]`)?.classList.add(style.active);

        const blogSale = document.getElementById("blog-sale");
        const blogTechnology = document.getElementById("blog-technology");

        if (tab === "promotion") {
            if (blogSale) blogSale.style.cssText = "display: flex !important;";
            if (blogTechnology) blogTechnology.style.cssText = "display: none !important;";
        } else if (tab === "technology") {
            if (blogSale) blogSale.style.cssText = "display: none !important;";
            if (blogTechnology) blogTechnology.style.cssText = "display: flex !important;";
        }
    };

    useEffect(() => {
        const defaultTab = getActiveTab();
        document.querySelector(`li[data-tab="${defaultTab}"]`)?.classList.add(style.active);
        onTabClick(defaultTab);
    }, []);
    return (
        <section className={`${style.blog}`}>
            <div className={`${style.container} max-w-[1170px] w-full m-auto`}>
                <div className={`${style.title} text-[40px] ml-[2px] mt-10 pb-4`}>
                    <div className="flex w-[20%] h-[2.9px]">
                        <div className="flex-[6] bg-[#e91e1e]"></div>
                        <div className="flex-[4] bg-[#f8b133]"></div>
                    </div>
                </div>
                <div className="relative py-10">
                    <h2 className="text-gray-200 text-5xl font-bold absolute inset-0 flex items-start leading-[5rem] uppercase">
                        Công Nghệ Tiên Phong
                    </h2>
                    <h1 className="text-black text-4xl font-bold relative uppercase">
                        Công Nghệ Tiên Phong
                    </h1>
                </div>
                <div className="relative py-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-5 gap-4">
                        {technologys.map((technology, index) => (
                            <div key={technology.id} className="relative bg-white rounded-lg overflow-hidden shadow-md z-20">
                                <Image
                                    src={technology.src}
                                    alt={`Technology ${index + 1}`}
                                    width={300}
                                    height={300}
                                    className="w-full h-auto object-cover"
                                />
                                <div className='absolute top-0 w-full h-full p-2 flex items-end'>
                                    <p className='text-white max-700:text-xs max-400:text-[7px]'>{technology.alt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='absolute to-transparent w-[115%] top-[-12px] left-[-40px] max-500:left-0'>
                        <Image width={300} height={300} src="/blog/backgroud-red.png" alt="" className='absolute to-transparent w-full top-16 left-[-38px]' />
                    </div>
                    <div className='bg-red-600 w-full'></div>
                </div>
                <div className={`${style.listBlog}`}>
                    <div className={`${style.nav} w-full mt-10`}>
                        <ul className="flex p-0 m-0 list-none justify-between border-b-2 border-customGray">
                            <li
                                style={{ width: "50%" }}
                                data-tab="promotion"
                                onClick={() => onTabClick("promotion")}
                            >
                                Tin tức
                            </li>
                            <li
                                style={{ width: "50%" }}
                                data-tab="technology"
                                onClick={() => onTabClick("technology")}
                            >
                                Blog
                            </li>
                        </ul>
                    </div>
                    <div id='blog-sale' className={`${style.proContent} mt-9 `}>
                        <div className={`${style.item}`}>
                            <article>
                                <div className={`${style.img} relative group`}>
                                    <Link
                                        href={'https://www.youtube.com/watch?v=h6q3zIWmBGM'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='cursor-pointer block w-full h-full absolute z-10 group-hover:!filter-none' style={{ background: 'no-repeat center/68px 48px', filter: 'grayscale(100%)', transition: 'filter .1s cubic-bezier(0, 0, 0.2, 1)', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 68 48'><path d='M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z' fill='red'/><path d='M45 24 27 14v20' fill='white'/></svg>")` }}>
                                        <span className=''>

                                        </span>
                                    </Link>
                                    <Image className={`${style.mobileImg}`} width={500} height={200} src={'/blog/phong-kham-da-khoa-vien-doan.jpg'} alt="sale" />
                                </div>
                                <div className={`${style.content}`}>
                                    <Link
                                        href={'https://www.youtube.com/watch?v=h6q3zIWmBGM'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='flex'>
                                        <h4> Phần mềm quản trị bệnh viện HIS-LIS </h4>
                                    </Link>
                                    {/* <div className={`${style.summary}`}>
                                        <p className='leading-[26px] text-justify overflow-hidden'>Với tổng giá trị giải thưởng lên đến hơn 4,7 tỷ đồng, MobiFone mang đến chương trình siêu khuyến mại “Vui tiêu dùng, rinh quà khủng"...</p>
                                    </div> */}
                                </div>
                            </article>
                        </div>
                        <div className={`${style.item}`}>
                            <article>
                                <div className={`${style.img}`}>
                                    <Link
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='flex' href={'https://www.youtube.com/watch?v=LElUuLqic9Q'}
                                    >
                                        <Image className='w-[480px]' width={380} height={380} src="/blog/XTP-he-thong-quan-ly-hs-do-than-nhiey-bang-khuan-mat.jpg" alt="blog" />
                                    </Link>
                                </div>
                                <div className={`${style.content}`}>
                                    <Link
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='flex' href={'https://www.youtube.com/watch?v=LElUuLqic9Q'}
                                    >
                                        <h5> XTP Hệ thống quản lý học sinh và đo thân nhiệt bằng nhận diện khuôn mặt</h5>
                                    </Link>
                                </div>
                            </article>
                            <article>
                                <div className={`${style.img}`}>
                                    <Link
                                        className='flex' href={'https://www.youtube.com/watch?v=XWfgOHXdgPQ'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image className='w-[480px]' width={380} height={380} src="/blog/XTP-software-trien-khai-pahn-mem-quan-ly-bejnh-vien.jpg" alt="blog" />
                                    </Link>
                                </div>

                                <div className={`${style.content}`}>
                                    <Link
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='flex' href={'https://www.youtube.com/watch?v=XWfgOHXdgPQ'}>
                                        <h5> XTP Triển khai phần mềm quản lý bệnh viện thông minh XTP HIS - LIS</h5>
                                    </Link>
                                    <div className={`${style.meta}`}>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                    <div id='blog-technology' className={`${style.proContent} mt-9 hidden`} style={{ display: "none" }} >
                        <div className={`${style.item}`}>
                            <article>
                                <div className={`${style.img}`}>
                                    <Link href={'#'}>
                                        <Image width={500} height={200} src="/sale/technology-blog-26122014.png" alt="technology" />
                                    </Link>
                                </div>
                                <div className={`${style.content}`}>
                                    <h4> Chọn thuê VPS hay Shared hosting để lưu trữ? </h4>
                                    <div className={`${style.meta}`}>
                                    </div>
                                    <div className={`${style.summary}`}>
                                        <p className='leading-[26px] text-justify overflow-hidden'>Thuê VPS giá rẻ hay chọn Shared hosting để trở thành giải pháp tốt nhất cho doanh nghiệp trong việc tối ưu lưu trữ Web?.....</p>
                                    </div>
                                    <Link className={`${style.view}`} href={'#'}>
                                        Xem thêm
                                        <Image className='ml-[10px]' width={25} height={25} src="/icon/iconLeft.png" alt="" />
                                    </Link>
                                </div>
                            </article>
                        </div>
                        <div className={`${style.item}`}>
                            <article>
                                <div className={`${style.img}`}>
                                    <Link className='flex' href={'#'}>
                                        <Image className='w-[480px]' width={380} height={380} src="/Sale/blog-sale-bidv-niad-26122024.png" alt="blog" />
                                    </Link>
                                </div>
                                <div className={`${style.content}`}>
                                    <h5> Nghe nhạc cực đã với các gói dât của mobifone </h5>
                                    <div className={`${style.summary}`}>
                                        <p className='leading-[26px] text-justify overflow-hidden'>Spotity data đang là gói cước thu hút sự quan tâm của nhiều khách hàng trẻ. Phục vụ nhu cầu nghe nhạc trên nền tảng..</p>
                                    </div>
                                    <Link className={`${style.view}`} href={'#'}>
                                        Xem thêm
                                        <Image className='ml-[10px]' width={25} height={25} src="/icon/iconLeft.png" alt="" />
                                    </Link>
                                </div>
                            </article>
                            <article>
                                <div className={`${style.img}`}>
                                    <Link className='flex' href={'#'}>
                                        <Image className='w-[480px]' width={380} height={380} src="/Sale/blog-sale-bidv-niad-26122024.png" alt="blog" />
                                    </Link>
                                </div>
                                <div className={`${style.content}`}>
                                    <h5> Nghe nhạc cực đã với các gói dât của mobifone </h5>
                                    <div className={`${style.summary}`}>
                                        <p className='leading-[26px] text-justify overflow-hidden'>Spotity data đang là gói cước thu hút sự quan tâm của nhiều khách hàng trẻ. Phục vụ nhu cầu nghe nhạc trên nền tảng..</p>
                                    </div>
                                    <Link className={`${style.view}`} href={'#'}>
                                        Xem thêm
                                        <Image className='ml-[10px]' width={25} height={25} src="/icon/iconLeft.png" alt="" />
                                    </Link>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

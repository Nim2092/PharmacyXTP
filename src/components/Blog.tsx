'use client';
import React, { useEffect, useRef, useState } from 'react'
import Image from "next/image";
import style from "@/app/style/styles.module.css";
import Link from 'next/link';
// Import mock API và environment config
import { postsAPI, formatDate } from '@/data/mockPosts';
import { ENV_CONFIG, envLog } from '@/config/environment';
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

    const [posts, setPosts] = useState<any[]>([]);
    const [currentActiveTab, setCurrentActiveTab] = useState<string>("promotion");

    const getActiveTab = () => {
        return localStorage.getItem("selectedTab") || "promotion";
    };

    const onTabClick = (tab: string) => {
        setCurrentActiveTab(tab);
        localStorage.setItem("selectedTab", tab);
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
        setCurrentActiveTab(defaultTab);
        onTabClick(defaultTab);

        // Load posts data với mock API
        const loadPosts = async () => {
            try {
                envLog('Loading posts data...', { useMockData: ENV_CONFIG.USE_MOCK_DATA });
                
                if (ENV_CONFIG.USE_MOCK_DATA) {
                    // Sử dụng mock data
                    envLog('Using mock data for posts');
                    const mockPosts = await postsAPI.getAllPosts();
                    setPosts(mockPosts);
                    envLog('Mock posts loaded successfully', { count: mockPosts.length });
                } else {
                    // Sử dụng real API
                    envLog('Using real API for posts');
                    const response = await fetch(`${ENV_CONFIG.API_BASE_URL}${ENV_CONFIG.POSTS_ENDPOINT}`);
                    const data = await response.json();
                    setPosts(data);
                    envLog('Real API posts loaded successfully', { count: data.length });
                }
            } catch (error) {
                envLog('Error loading posts data', error);
                // Fallback to mock data on error
                envLog('Falling back to mock data due to error');
                const fallbackPosts = await postsAPI.getAllPosts();
                setPosts(fallbackPosts);
            }
        };

        loadPosts();
    }, []);
    return (
        <section className={`${style.blog}`}>
            <div className={`${style.container} max-w-[1170px] w-full mx-auto px-4`}>
                <div className={`${style.title} text-2xl sm:text-3xl lg:text-[40px] ml-[2px] mt-10 pb-4`}>
                    <div className="flex w-[20%] h-[2.9px]">
                        <div className="flex-[6] bg-[#e91e1e]"></div>
                        <div className="flex-[4] bg-[#f8b133]"></div>
                    </div>
                </div>
                <div className="relative py-6 sm:py-8 lg:py-10">
                    <h2 className="text-gray-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold absolute inset-0 flex items-start leading-[1.2] sm:leading-[1.3] lg:leading-[5rem] uppercase">
                        Công Nghệ Tiên Phong
                    </h2>
                    <h1 className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold relative uppercase">
                        Công Nghệ Tiên Phong
                    </h1>
                </div>
                <div className="relative py-4 sm:py-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
                        {technologys.map((technology, index) => (
                            <div key={technology.id} className="relative bg-white rounded-lg overflow-hidden shadow-md z-20">
                                <Image
                                    src={technology.src}
                                    alt={`Technology ${index + 1}`}
                                    width={300}
                                    height={300}
                                    className="w-full h-auto object-cover"
                                />
                                <div className='absolute top-0 w-full h-full p-1 sm:p-2 flex items-end'>
                                    <p className='text-white text-xs sm:text-sm lg:text-base'>{technology.alt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='absolute to-transparent w-[115%] top-[-12px] left-[-40px] sm:left-0'>
                        <Image width={300} height={300} src="/blog/backgroud-red.png" alt="" className='absolute to-transparent w-full top-8 sm:top-16 left-[-38px] sm:left-[-38px]' />
                    </div>
                    <div className='bg-red-600 w-full'></div>
                </div>
                <div className={`${style.listBlog}`}>
                    <div className="w-full mt-6 sm:mt-8 lg:mt-10">
                        <ul className="flex w-full border-b-2 border-customGray bg-white z-10">
                            <li
                                onClick={() => onTabClick("promotion")}
                                className={`w-1/2 text-center py-2 cursor-pointer ${currentActiveTab === "promotion" ? "border-b-4 border-red-600 font-bold text-blue-800 bg-white" : "bg-gray-50 text-gray-700"}`}
                            >
                                Tin tức
                            </li>
                            <li
                                onClick={() => onTabClick("technology")}
                                className={`w-1/2 text-center py-2 cursor-pointer ${currentActiveTab === "technology" ? "border-b-4 border-red-600 font-bold text-blue-800 bg-white" : "bg-gray-50 text-gray-700"}`}
                            >
                                Bài Viết
                            </li>
                        </ul>
                    </div>
                    <div id='blog-sale' className="mt-6 sm:mt-8 lg:mt-9 px-4">
                      <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cột trái: Tin nổi bật */}
                        <div className="w-full lg:w-2/3">
                          <article className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 hover:shadow-2xl transition">
                            <div className="relative group">
                              <Link
                                href={'https://www.youtube.com/watch?v=h6q3zIWmBGM'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full h-full absolute z-10 group-hover:!filter-none"
                                style={{
                                  background: 'no-repeat center/68px 48px',
                                  filter: 'grayscale(100%)',
                                  transition: 'filter .1s cubic-bezier(0, 0, 0.2, 1)',
                                  backgroundImage: `url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 68 48'><path d='M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z' fill='red'/><path d='M45 24 27 14v20' fill='white'/></svg>\")`
                                }}
                              >
                                <span></span>
                              </Link>
                              <Image
                                className="w-full h-[250px] sm:h-[320px] object-cover"
                                width={600}
                                height={320}
                                src={'/blog/phong-kham-da-khoa-vien-doan.jpg'}
                                alt="sale"
                              />
                            </div>
                            <div className="p-4">
                              <Link
                                href={'https://www.youtube.com/watch?v=h6q3zIWmBGM'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex"
                              >
                                <h4 className="text-xl lg:text-2xl font-bold leading-tight text-blue-800 hover:text-blue-600 transition">
                                  PHẦN MỀM QUẢN TRỊ BỆNH VIỆN HIS-LIS
                                </h4>
                              </Link>
                            </div>
                          </article>
                        </div>
                        {/* Cột phải: 2 tin nhỏ */}
                        <div className="w-full lg:w-1/3 flex flex-col gap-6">
                          <article className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden flex flex-col sm:flex-row lg:flex-col">
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-shrink-0"
                              href={'https://www.youtube.com/watch?v=LElUuLqic9Q'}
                            >
                              <Image
                                className="w-full h-[150px] sm:h-[120px] lg:h-[150px] object-cover"
                                width={380}
                                height={150}
                                src="/blog/XTP-he-thong-quan-ly-hs-do-than-nhiey-bang-khuan-mat.jpg"
                                alt="blog"
                              />
                            </Link>
                            <div className="p-4 flex-1 flex items-center">
                              <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex"
                                href={'https://www.youtube.com/watch?v=LElUuLqic9Q'}
                              >
                                <h5 className="text-base lg:text-lg font-semibold leading-tight text-blue-800 hover:text-blue-600 transition">
                                  XTP HỆ THỐNG QUẢN LÝ HỌC SINH VÀ ĐO THÂN NHIỆT BẰNG NHẬN DIỆN KHUÔN MẶT
                                </h5>
                              </Link>
                            </div>
                          </article>
                          <article className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden flex flex-col sm:flex-row lg:flex-col">
                            <Link
                              className="flex-shrink-0"
                              href={'https://www.youtube.com/watch?v=XWfgOHXdgPQ'}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Image
                                className="w-full h-[150px] sm:h-[120px] lg:h-[150px] object-cover"
                                width={380}
                                height={150}
                                src="/blog/XTP-software-trien-khai-pahn-mem-quan-ly-bejnh-vien.jpg"
                                alt="blog"
                              />
                            </Link>
                            <div className="p-4 flex-1 flex items-center">
                              <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex"
                                href={'https://www.youtube.com/watch?v=XWfgOHXdgPQ'}
                              >
                                <h5 className="text-base lg:text-lg font-semibold leading-tight text-blue-800 hover:text-blue-600 transition">
                                  XTP TRIỂN KHAI PHẦN MỀM QUẢN LÝ BỆNH VIỆN THÔNG MINH XTP HIS - LIS
                                </h5>
                              </Link>
                            </div>
                          </article>
                        </div>
                      </div>
                    </div>
                    <div id='blog-technology' className="mt-9 hidden" style={{ display: "none" }} >
                        {posts.length === 0 ? (
                            <div className="text-center py-8">Đang tải...</div>
                        ) : (
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Sidebar bên trái - Danh sách tin tức blog */}
                                <div className="w-full lg:w-1/3">
                                    <h3 className="text-xl font-bold mb-6 text-blue-800 border-b-2 border-blue-800 pb-2">
                                        Bài Viết
                                    </h3>
                                    <div className="space-y-3">
                                        {posts.slice(0, 8).map((post: any) => (
                                            <Link
                                                key={post.id}
                                                href={`/news/${post.id}`}
                                                className="group flex items-center gap-3 rounded-lg bg-white shadow-sm p-2 hover:bg-blue-50 transition cursor-pointer border border-gray-100"
                                            >
                                                <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                                                    <Image
                                                        src={post.image || "/blog/phong-kham-da-khoa-vien-doan.jpg"}
                                                        alt={stripHtml(post.title)}
                                                        width={56}
                                                        height={56}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-sm line-clamp-2 text-blue-900 group-hover:text-blue-700">
                                                        {stripHtml(post.title)}
                                                    </div>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        {post.created_at ? formatDate(post.created_at) : ''}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="mt-6">
                                        <Link 
                                            href="/news" 
                                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                                        >
                                            Xem tất cả →
                                        </Link>
                                    </div>
                                </div>

                                {/* Main content bên phải - Nội dung chính */}
                                <div className="w-full lg:w-2/3">
                                    <div className="grid grid-cols-1 gap-6">
                                        {posts.slice(0, 4).map((post: any) => (
                                            <article key={post.id} className="flex flex-col sm:flex-row gap-4 border-b border-gray-200 pb-6">
                                                <Link href={`/news/${post.id}`} className="flex-shrink-0">
                                                    <div className="w-full sm:w-48 h-32 bg-gray-100 rounded overflow-hidden relative">
                                                        <Image
                                                            src={post.image || "/blog/phong-kham-da-khoa-vien-doan.jpg"}
                                                            alt={stripHtml(post.title)}
                                                            fill
                                                            className="object-cover rounded-xl shadow-lg"
                                                        />
                                                    </div>
                                                </Link>
                                                <div className="flex-1">
                                                    <Link href={`/news/${post.id}`} className="block">
                                                        <h3 className="font-bold text-lg mb-2 leading-tight text-blue-800 hover:text-blue-600 transition-colors line-clamp-2">
                                                            {stripHtml(post.title)}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-gray-700 mb-3 line-clamp-3">
                                                        {stripHtml(post.content)}
                                                    </p>
                                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                                        <span>{post.created_at ? formatDate(post.created_at) : ''}</span>
                                                        <span>{post.author || 'Admin'}</span>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                    {/* Phân trang hoặc link xem thêm */}
                                    <div className="mt-8 text-center">
                                        <Link 
                                            href="/news" 
                                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            Xem thêm bài viết
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </section >
    )
}

// Hàm loại bỏ thẻ HTML khỏi chuỗi
function stripHtml(html: string) {
    if (!html) return '';
    // Sử dụng regex để đảm bảo tính nhất quán giữa server và client
    return html.replace(/<[^>]+>/g, '');
}

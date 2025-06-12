"use client";
import { usePathname } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next"
import React, { useState, useEffect } from 'react';
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import style from "@/app/style/styles.module.css";
import Loading from "@/app/ui/loading";
import Script from 'next/script';

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const banerTop = [
    {
      id: 1,
      imageSrc1: '/banner/slider-niad1.png',
      imageSrc2: '/banner/slider-níad2.png',
      span1: 'NIAD CUNG CẤP, CHO THUÊ ATM, CRM, TCR VÀ SYSTEM',
      span2: 'SẢN PHẨM XE CHỞ TIỀN LẦN ĐẦU TIÊN ĐƯỢC LẮP RÁP TẠI VIỆT NAM',
      imgAlt: 'Global AI Summit',
      href_1: 'https://www.nganluc.vn/vn/cung-cap-cho-thue-atm-va-thiet-bi-back-end-system.html',
      href_2: 'https://www.nganluc.vn/vn/ban-xe-oto-thuong-mai-chuyen-dung.html',
    },
    {
      id: 2,
      imageSrc1: '/banner/slider-níad2.png',
      imageSrc2: '/banner/slider-niad1.png',
      span2: 'NIAD CUNG CẤP, CHO THUÊ ATM, CRM, TCR VÀ SYSTEM',
      span1: 'SẢN PHẨM XE CHỞ TIỀN LẦN ĐẦU TIÊN ĐƯỢC LẮP RÁP TẠI VIỆT NAM',
      imgAlt: 'Global AI Summit',
      href_1: 'https://www.nganluc.vn/vn/cung-cap-cho-thue-atm-va-thiet-bi-back-end-system.html',
      href_2: 'https://www.nganluc.vn/vn/ban-xe-oto-thuong-mai-chuyen-dung.html',
    },
    {
      id: 3,
      imageSrc1: '/banner/slider-niad1.png',
      imageSrc2: '/banner/slider-níad2.png',
      span1: 'NIAD CUNG CẤP, CHO THUÊ ATM, CRM, TCR VÀ SYSTEM',
      span2: 'SẢN PHẨM XE CHỞ TIỀN LẦN ĐẦU TIÊN ĐƯỢC LẮP RÁP TẠI VIỆT NAM',
      imgAlt: 'Global AI Summit',
      href_1: 'https://www.nganluc.vn/vn/cung-cap-cho-thue-atm-va-thiet-bi-back-end-system.html',
      href_2: 'https://www.nganluc.vn/vn/ban-xe-oto-thuong-mai-chuyen-dung.html',
    },
    {
      id: 4,
      imageSrc1: '/banner/slider-níad2.png',
      imageSrc2: '/banner/slider-niad1.png',
      span2: 'BIC CUNG CẤP, CHO THUÊ ATM, CRM, TCR VÀ SYSTEM',
      span1: 'SẢN PHẨM XE CHỞ TIỀN LẦN ĐẦU TIÊN ĐƯỢC LẮP RÁP TẠI VIỆT NAM',
      imgAlt: 'Global AI Summit',
      href_1: 'https://www.nganluc.vn/vn/cung-cap-cho-thue-atm-va-thiet-bi-back-end-system.html',
      href_2: 'https://www.nganluc.vn/vn/ban-xe-oto-thuong-mai-chuyen-dung.html',
    },
    //   {
    //     id: 2,
    //     imageSrc1: '/banner/uu-dai-ron-rang-van-dam-binh-an.jpg',
    //     imageSrc2: '/banner/bic-giam-15-phi-bao-hiem-tnds-xe-may-tri-an-khach-hang-tai-tuc.jpg',
    //     span1: 'Ưu đãi rộn ràng, nạn rặng đường xa',
    //     span2: 'Sống đẳng cấp trọn an tâm cùng BIC samrt care',
    //     imgAlt: 'Banner Top 2025',
    //   },
    //   {
    //     id: 3,
    //     imageSrc1: '/banner/song-dang-cap-tron-an-tam-cung-bic-smart-care.jpg',
    //     imageSrc2: '/banner/uu-dai-ron-rang-van-dam-binh-an.jpg',
    //     span1: 'Sống đẳng cấp trọn an tâm cùng BIC samrt care',
    //     span2: 'Ưu đãi rộn ràng, nạn rặng đường xa',
    //     imgAlt: 'Global AI Summit',
    //   },
    //   {
    //     id: 4,
    //     imageSrc1: '/banner/bic-giam-15-phi-bao-hiem-tnds-xe-may-tri-an-khach-hang-tai-tuc.jpg',
    //     imageSrc2: '/banner/song-dang-cap-tron-an-tam-cung-bic-smart-care.jpg',
    //     span1: 'BIC giảm 15% phí bảo hiểm TNDS xe máy tri ân khách hàng tái tục',
    //     span2: 'Sống đẳng cấp trọn an tâm cùng BIC samrt care',
    //     imgAlt: 'Global AI Summit',
    //   },
    //   {
    //     id: 5,
    //     imageSrc1: '/banner/uu-dai-ron-rang-van-dam-binh-an.jpg',
    //     imageSrc2: '/banner/bic-giam-15-phi-bao-hiem-tnds-xe-may-tri-an-khach-hang-tai-tuc.jpg',
    //     span1: 'Ưu đãi rộn ràng, nạn rặng đường xa',
    //     span2: 'Sống đẳng cấp trọn an tâm cùng BIC samrt care',
    //     imgAlt: 'Banner Top 2025',
    //   },
    //   {
    //     id: 6,
    //     imageSrc1: '/banner/song-dang-cap-tron-an-tam-cung-bic-smart-care.jpg',
    //     imageSrc2: '/banner/uu-dai-ron-rang-van-dam-binh-an.jpg',
    //     span1: 'Sống đẳng cấp trọn an tâm cùng BIC samrt care',
    //     span2: 'Ưu đãi rộn ràng, nạn rặng đường xa',
    //     imgAlt: 'Global AI Summit',
    //   },
  ];

  const extendedBanners = [
    banerTop[banerTop.length - 1],
    ...banerTop,
    banerTop[0],
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(extendedBanners.length - 2);
      }, 100);
    } else if (currentIndex === extendedBanners.length - 1) {

      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 100);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex, extendedBanners.length]);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const getMetadata = (path: string) => {
    if (path === "/") {
      return {
        title: "Trang Chủ - Medtechai.vn Giải Pháp Kiosk Y Tế Thông Minh",
        description: "CTY công nghệ Pharmacy Việt Nam",
      };
    }
    if (path === "/product") {
      return {
        title: "Sản phẩm Ai trong hệ thống quản trị - Medtechai.vn Giải Pháp Kiosk Y Tế Thông Minh",
        description: "CTY công nghệ Pharmacy Việt Nam",
      };
    }
    if (path === "/introduce") {
      return {
        title: "Giới Thiệu - Medtechai.vn Giải Pháp Kiosk Y Tế Thông Minh",
        description: "Tìm hiểu về các giải pháp y tế thông minh của chúng tôi.",
      };
    }
    if (path === "/introduce/structure") {
      return {
        title: "Cơ cấu tổ chức - Medtechai.vn Giải Pháp Kiosk Y Tế Thông Minh",
        description: "Xem cấu trúc của giải pháp y tế thông minh của chúng tôi.",
      };
    }
    const commonMeta = {
      title: "Giới Thiệu - Medtechai.vn Giải Pháp Kiosk Y Tế Thông Minh",
      description: "Tìm hiểu về các giải pháp y tế thông minh của chúng tôi.",
    };

    const validPaths = [
      "/introduce/structure",
      "/introduce/corevalues",
      "/introduce/partandcust"
    ];
    if (validPaths.includes(path)) {
      return commonMeta;
    }

    return {
      title: "Medtechai.vn Giải Pháp Kiosk Y Tế Thông Minh",
      description: "CTY công nghệ Pharmacy Việt Nam",
    };
  };
  const metadata = getMetadata(pathname);
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    },);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KDZM5PNK');
          `}
        </Script>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KDZM5PNK"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col h-screen">
            <header
              className={`${style.bannerHeader} bg-white overflow-hidden flex fixed top-0 left-0 w-full z-[999] h-[20%]`}
            >
              <div
                className="flex"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: isTransitioning ? 'transform 0.7s ease-in-out' : 'none',
                  width: `${extendedBanners.length * 100}%`,
                  alignItems: 'center'
                }}
              >
                {extendedBanners.map((banner, index) => (
                  <div
                    key={index}
                    className="relative w-full flex flex-shrink-0 overflow-hidden"
                  >
                    <div className="absolute w-[335px] h-full flex items-center ml-3 text-xl font-bold text-white drop-shadow-[1px_1px_1px_#006e3b] max-1200:w-[250px] max-1083:text-base max-1083:w-[200px]">
                      <span>
                        {banner.span1}
                      </span>
                    </div>
                    <Link className="w-full cursor-pointer" href={banner.href_1}>
                      <Image
                        className={`${style.bannerG} object-cover max-h-full h-[18vh] w-full px-[1px] max-720:w-full`}
                        width={1000}
                        height={300}
                        src={banner.imageSrc1}
                        alt={banner.imgAlt}
                      />
                    </Link>
                    <div className="absolute float-left left-1/2 w-[335px] h-full flex items-center ml-3 text-xl font-bold text-white drop-shadow-[1px_1px_1px_#006e3b] max-1200:w-[250px] max-1083:text-base max-1083:w-[200px] max-720:hidden">
                      <span>
                        {banner.span2}
                      </span>
                    </div>
                    <Link className="w-full cursor-pointer max-720:!hidden" href={banner.href_2}>
                      <Image
                        className={`${style.bannerG} object-cover max-h-full h-[18vh] w-full px-[1px] max-720:!hidden`}
                        width={1000}
                        height={300}
                        src={banner.imageSrc2}
                        alt={banner.imgAlt}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </header>
            <div className="flex relative justify-between z-50">
              <aside className={`${style.banerLeft} w-[15%] top-[20vh] bg-gray-100 fixed left-0 h-[100vh] z-[99]`}>
                <div>
                  <div className='p-2 !pt-0 mb-2'>
                    <Link href={'https://bic.vn/noi-dung/ban-tin-bic/2025-bic-vuon-minh-but-pha-huong-toi-ky-niem-20-nam-thanh-lap.html'}>
                      <Image className='w-full h-[20vh]' width={300} height={300} src="/banner/2025-bic-vuon-minh-but-pha-huong-toi-ky-niem-20-nam-thanh-lap.png" alt="image banner left" />
                      <div className='mt-3'>
                        <div className='text-sm text-gray-500 mb-2 max-1316:text-sx max-1083:text-[.9rem] max-800:text-[.6rem]'>18.02.2025</div>
                        <p className='text-ellipsis overflow-hidden text-base text-black max-1316:text-sm max-1083:text-xs max-800:text-[10px]'>
                          2025: BIC vươn mình bứt phá hướng tới kỷ niệm 20 năm thành lập.
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className='p-2 !pt-0'>
                    <Link href={'https://bic.vn/noi-dung/ban-tin-bic/bic-tang-phong-hoc-cho-truong-mam-non-binh-luong.html'}>
                      <Image className='w-full h-[20vh]' width={300} height={300} src="/banner/bic-tang-phong-hoc-cho-truong-mam-non-binh-luong.png" alt="image banner left" />
                    </Link>
                    <div className='mt-3'>
                      <div className='text-sm text-gray-500 mb-2 max-1316:text-sx max-1083:text-[.9rem] max-800:text-[.6rem]'>23.01.2025</div>
                      <p className='text-ellipsis overflow-hidden text-base text-black max-1316:text-sm max-1083:text-xs max-800:text-[10px]'>
                        BIC tặng phòng học cho trường Mầm non Bình Lương
                      </p>
                    </div>
                  </div>
                </div>
              </aside >
              {children}
              <aside className={`${style.banerRight} w-[15%] top-[20vh] bg-gray-100 fixed right-0 h-[100vh] z-[999]`}>
                <div>
                  <div className='p-2 !pt-0 mb-2'>
                    <Link href={'https://bic.vn/ttsp/bao-hiem-suc-khoe/bic-smart-care-bao-hiem-suc-khoe-cao-cap.html'}>
                      <Image className='w-full h-[20vh]' width={700} height={70} src="/banner/bic-smart-care-bao-hiem-suc-khoe-cao-cap.jpg" alt="image banner left" />
                      <div className='mt-3'>
                        <div className='text-sm text-gray-500 mb-2 max-1316:text-sx max-1083:text-[.9rem] max-800:text-[.6rem]'>18.02.2025</div>
                        <p className='text-ellipsis overflow-hidden text-base text-black max-1316:text-sm max-1083:text-xs max-800:text-[10px]'>
                          BIC Smart Care - Bảo hiểm sức khỏe cao cấp - Sống đẳng cấp, trịn an tâm
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className='p-2 !pt-0'>
                    <Link href={'https://bic.vn/ttsp/bao-hiem-suc-khoe/bao-hiem-y-te-bo-tro.html'}>
                      <Image className='w-full h-[20vh]' width={700} height={70} src="/banner/bao-hiem-y-te-bo-tro.jpg" alt="image banner left" />
                      <div className='mt-3'>
                        <div className='text-sm text-gray-500 mb-2 max-1316:text-sx max-1083:text-[.9rem] max-800:text-[.6rem]'>18.02.2025</div>
                        <p className='text-ellipsis overflow-hidden text-base text-black max-1316:text-sm max-1083:text-xs max-800:text-[10px]'>
                          Bảo hiểm y tế hỗ trợ - Gạt bỏ lo âu, an âm điều trị
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}

import Image from "next/image";

export default function RecruitmentBanner({ banner, bannerTitle }: { banner: string; bannerTitle: string }) {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Background image */}
      <Image
        src={banner || "/home-slider-images01.jpg"}
        alt="Recruitment Banner"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-yellow-100 text-center mb-8 drop-shadow-lg">
          {bannerTitle || (
            <>
              NƠI CHUYỂN GIAO TRI THỨC CÔNG NGHỆ,<br />
              PHÁT TRIỂN NHÂN TÀI TƯƠNG LAI
            </>
          )}
        </h1>
        <button className="bg-red-600 rounded-full p-6 flex items-center justify-center shadow-lg hover:scale-105 transition">
          <svg width="32" height="32" fill="#fff" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
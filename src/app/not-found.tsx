 import Link from "next/link";
import style from "@/app/style/styles.module.css";

export default function NotFound() {
    return (
        <main className={`${style.mainIndex} w-[70%] bg-white ml-[15%] mr-[15%] mt-[94px] flex flex-col shadow-md`}>
            <div className="flex flex-col items-center justify-center min-h-[86vh] bg-gray-100">
                <h1 className="text-4xl font-bold text-blue-600">404 - Không tìm thấy trang</h1>
                <p className="mt-2 text-gray-600">Có vẻ như bạn đang tìm kiếm một trang không tồn tại.</p>
                <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                    Quay về trang chủ
                </Link>
            </div>
        </main>

    );
};


import React from 'react';
import Image from "next/image";

export default function benefit() {
    return (
        <div className='blog py-14 bg-[#fff]'>
            <div className='container max-w-[1200px] m-auto px-4'>
                <div className='section-title mx-[-15px] text-center'>
                    <h2 className='text-5xl font-[VIE-HandelGothic,sans-serif] font-bold leading-[1.33] text-left text-[#005db2] uppercase my-4 mx-10' style={{ fontStretch: 'normal', fontStyle: 'normal', letterSpacing: 'normal' }}>Lợi ích</h2>
                </div>
                <div className='mx-[-15px] mt-[20px] min-992:w-1/2 min-992:float-left md:w-full md:float-left relative min-h-1 px-[15px] ml-6'>
                    <div className='blog-singe m-0 shadow-[0_2px_6px_0_rgba(218,218,253,0.65),_0_2px_6px_0_rgba(206,206,238,0.54)' style={{ boxShadow: '0 2px 6px 0 rgba(218, 218, 253, 0.65), 0 2px 6px 0 rgba(206, 206, 238, 0.54)', borderRadius: '2px', backgroundColor: '#fff', marginBottom: '30px', marginLeft: '-15px', marginRight: '-15px', margin: '0' }}>
                        <div className='col-sm-3 p-0 md:w-1/4 md:float-left relative min-h-1'>
                            <Image width={300} height={300} src={'/product/data-transfer.svg'} alt='' />
                        </div>
                        <div className='p-4 md:w-3/4 md:float-left relative min-h-1'>
                            <div>
                                <h5 className='text-sx my-2 font-[inherit] font-[500] leading-[1.1] text-[inherit]'> Thiết lập nhanh chóng và dễ dàng qua dashboard quản trị </h5>
                                <p className='text-base'>
                                    Giao diện thân thiện, dễ dàng kết nối phần mềm thứ ba, thiết lập cảnh báo. Cho phép tự cấu hình cảnh báo bằng AI giúp tăng tính chủ động, tiện lợi khi sử dụng.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mx-[-15px] mt-[20px] min-992:w-1/2 min-992:float-left md:w-full md:float-left relative min-h-1 px-[15px]'>
                    <div className='blog-singe m-0 shadow-[0_2px_6px_0_rgba(218,218,253,0.65),_0_2px_6px_0_rgba(206,206,238,0.54)' style={{ boxShadow: '0 2px 6px 0 rgba(218, 218, 253, 0.65), 0 2px 6px 0 rgba(206, 206, 238, 0.54)', borderRadius: '2px', backgroundColor: '#fff', marginLeft: '-15px', marginRight: '-15px', margin: '0' }}>
                        <div className='col-sm-3 p-0 md:w-1/4 md:float-left relative min-h-1'>
                            <Image width={300} height={300} src={'/product/data-transfer.svg'} alt='' />
                        </div>
                        <div className='p-4 md:w-3/4 md:float-left relative min-h-1'>
                            <div>
                                <h5 className='text-sx my-2 font-[inherit] font-[500] leading-[1.1] text-[inherit]'> Đảm bảo tính sẵn sàng của hệ thống</h5>
                                <p className='text-base'>
                                    Việc phát hiện kip thời các bất thường của hệ thống giúp giảm thiểu thời gian gián đoạn hoạt động hệ thống, tiết kiệm chi phí ban đầu và dễ dang triển khai.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { NextResponse } from "next/server";

const otpStorage: Record<string, { otp: string; expires: number }> = {};
export async function POST(req: Request) {
    const { email, otp } = await req.json();

    if (!email || !otp) {
        return NextResponse.json({ error: "Thiếu email hoặc OTP" }, { status: 400 });
    }

    // Kiểm tra OTP trong bộ nhớ
    const storedOtp = otpStorage[email];

    if (!storedOtp) {
        return NextResponse.json({ error: "OTP không tồn tại hoặc đã hết hạn" }, { status: 400 });
    }

    // Kiểm tra OTP có đúng không
    if (storedOtp.otp !== otp) {
        return NextResponse.json({ error: "OTP không chính xác" }, { status: 400 });
    }

    // Kiểm tra thời gian hết hạn
    if (Date.now() > storedOtp.expires) {
        delete otpStorage[email]; // Xóa OTP sau khi hết hạn
        return NextResponse.json({ error: "OTP đã hết hạn" }, { status: 400 });
    }

    // Xóa OTP sau khi xác thực thành công
    delete otpStorage[email];

    return NextResponse.json({ message: "OTP hợp lệ!" });
}
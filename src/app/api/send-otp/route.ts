import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Lưu OTP vào bộ nhớ tạm thời
const otpStorage: Record<string, { otp: string; expires: number }> = {};

// Tạo transporter gửi email (cấu hình Gmail SMTP)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Thay bằng email của bạn
        pass: process.env.EMAIL_PASS, // Thay bằng mật khẩu ứng dụng (App Password)
    },
});

// API gửi OTP
export async function POST(req: Request) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ error: "Vui lòng nhập email" }, { status: 400 });
    }

    // Tạo mã OTP ngẫu nhiên 6 chữ số
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // Hết hạn sau 5 phút

    // Lưu OTP vào bộ nhớ tạm thời
    otpStorage[email] = { otp, expires };

    // Nội dung email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Mã xác nhận OTP",
        text: `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 5 phút.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "OTP đã được gửi!" });
    } catch (error) {
        console.error("Lỗi gửi email:", error);
        return NextResponse.json({ error: "Không thể gửi email" }, { status: 500 });
    }
}

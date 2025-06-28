// File này chỉ giữ lại hàm placeholder để gọi API back-end upload file lên Google Drive.
// Không còn xử lý Google OAuth hay upload trực tiếp từ front-end nữa.

/**
 * Gửi file lên back-end, back-end sẽ upload lên Google Drive và trả về link.
 * @param file File CV ứng viên
 * @returns Link Google Drive (Promise<string | null>)
 */
export const uploadFileToDrive = async (file: File): Promise<string | null> => {
  // TODO: Gọi API back-end nhận file, upload lên Google Drive, trả về link
  // Ví dụ:
  // const form = new FormData();
  // form.append('file', file);
  // const res = await fetch('/api/upload', { method: 'POST', body: form });
  // const data = await res.json();
  // return data.driveLink;
  return null; // Chưa triển khai
};

// Các hàm liên quan Google API/OAuth đã được loại bỏ hoàn toàn.
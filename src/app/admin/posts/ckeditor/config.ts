// CKEditor Configuration - Đơn giản không có extraPlugins để tránh duplicated modules
export const editorConfig: any = {
  toolbar: [
    'heading', '|',
    'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
    'bold', 'italic', 'underline', 'strikethrough', '|',
    'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify', '|',
    'bulletedList', 'numberedList', 'outdent', 'indent', '|',
    'link', 'imageUpload', 'blockQuote', 'insertTable', '|',
    'undo', 'redo'
  ],
  placeholder: 'Nhập nội dung bài viết tại đây...',
};

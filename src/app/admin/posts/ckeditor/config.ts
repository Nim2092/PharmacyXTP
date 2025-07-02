// CKEditor Configuration - Client-side only for Decoupled Document
// Chỉ import plugins khi đã có editor instance
export const editorConfig: any = {
  // Decoupled document không cần extraPlugins trong config
  // Toolbar sẽ được attach riêng biệt
  toolbar: {
    items: [
      'heading', '|',
      'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify', '|',
      'bulletedList', 'numberedList', 'outdent', 'indent', '|',
      'link', 'imageUpload', 'blockQuote', 'insertTable', '|',
      'undo', 'redo'
    ],
    shouldNotGroupWhenFull: true
  },
  placeholder: 'Nhập nội dung bài viết tại đây...',
  image: {
    toolbar: [
      'imageTextAlternative',
      '|',
      'imageStyle:full',
      'imageStyle:side',
      '|', 
      'resizeImage'
    ],
    upload: {
      types: ['jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg+xml']
    },
    resizeOptions: [
      {
        name: 'resizeImage:original',
        label: 'Original',
        value: null
      },
      {
        name: 'resizeImage:50',
        label: '50%',
        value: '50'
      },
      {
        name: 'resizeImage:75',
        label: '75%',
        value: '75'
      }
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow', 
      'mergeTableCells',
      'tableCellProperties',
      'tableProperties'
    ]
  }
};

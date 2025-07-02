'use client';

import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

// Define the data structure for recruitment page
interface RecruitmentPageData {
  banner: string;
  bannerTitle: string;
  mainTitle: string;
  intro: {
    logo: string;
    text: string;
  };
  hexagonImages: { src: string; alt: string }[];
  goals: { icon: string; title: string; desc: string }[];
  studentImages: { src: string; alt: string }[];
  studentProject2: { src: string; alt: string }[];
  studentContent: string;
  recruitments: { location: string; wage: string; address: string; time: string }[];
}

const defaultData: RecruitmentPageData = {
  banner: '',
  bannerTitle: '',
  mainTitle: '',
  intro: { logo: '', text: '' },
  hexagonImages: [],
  goals: [],
  studentImages: [],
  studentProject2: [],
  studentContent: '',
  recruitments: [],
};

// CKEditor React wrapper removed to use build classic directly
export default function AdminRecruitmentPage() {
  const [data, setData] = useState<RecruitmentPageData>(defaultData);
  const [saving, setSaving] = useState(false);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [hexagonPreviews, setHexagonPreviews] = useState<(string | null)[]>([]);
  const [hexagonFiles, setHexagonFiles] = useState<(File | null)[]>([]);
  const [goalIconPreviews, setGoalIconPreviews] = useState<(string | null)[]>([]);
  const [goalIconFiles, setGoalIconFiles] = useState<(File | null)[]>([]);
  const [studentImagePreviews, setStudentImagePreviews] = useState<(string | null)[]>([]);
  const [studentImageFiles, setStudentImageFiles] = useState<(File | null)[]>([]);
  const [studentProject2Previews, setStudentProject2Previews] = useState<(string | null)[]>([]);
  const [studentProject2Files, setStudentProject2Files] = useState<(File | null)[]>([]);
  const ClassicEditorRef = useRef<any>(null);
  const [editorReady, setEditorReady] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    let mounted = true;
    import('@ckeditor/ckeditor5-build-decoupled-document').then((mod) => {
      if (mounted) {
        ClassicEditorRef.current = mod.default;
        setEditorReady(true);
      }
    });
    return () => { mounted = false; };
  }, []);

  // Initialize CKEditor when ready
  useEffect(() => {
    if (isClient && editorReady && ClassicEditorRef.current && editorContainerRef.current && !editorInstance) {
      const initEditor = async () => {
        try {
          const editor = await ClassicEditorRef.current.create(editorContainerRef.current, editorConfig);
          setEditorInstance(editor);
          
          // Set initial content
          if (data.studentContent) {
            editor.setData(data.studentContent);
          }
          
          // Listen for content changes
          editor.model.document.on('change:data', () => {
            const newContent = editor.getData();
            setData((prev: any) => ({ ...prev, studentContent: newContent }));
          });
          
          console.log('✅ CKEditor ready for recruitment admin');
        } catch (error) {
          console.error('❌ Failed to initialize CKEditor:', error);
        }
      };
      
      initEditor();
    }
  }, [isClient, editorReady, ClassicEditorRef.current, editorInstance, data.studentContent]);

  // Cleanup editor
  useEffect(() => {
    return () => {
      if (editorInstance && typeof editorInstance.destroy === 'function') {
        try {
          if (!editorInstance.isDestroyed) {
            editorInstance.destroy().catch(console.warn);
          }
        } catch (error) {
          console.warn('Error destroying editor:', error);
        }
      }
    };
  }, [editorInstance]);

  // Khi load data
  useEffect(() => {
    axios.get('http://localhost:8080/recruitment-page').then(res => {
      let loaded: Partial<RecruitmentPageData> = {};
      try {
        loaded = JSON.parse(res.data.data || '{}');
      } catch (e) {
        loaded = {};
      }
      setData({
        ...defaultData,
        ...loaded,
        studentProject2: Array.isArray(loaded.studentProject2)
          ? loaded.studentProject2
          : loaded.studentProject2
          ? [loaded.studentProject2]
          : [],
        intro: { ...defaultData.intro, ...(loaded.intro || {}) },
        hexagonImages: loaded.hexagonImages || [],
        goals: loaded.goals || [],
        studentImages: loaded.studentImages || [],
        recruitments: loaded.recruitments || [],
        studentContent: typeof loaded.studentContent === 'string' ? loaded.studentContent : '',
      });
      setStudentProject2Previews(
        Array.isArray(loaded.studentProject2) 
          ? loaded.studentProject2.map((img: any) => img.src || null)
          : loaded.studentProject2 && typeof loaded.studentProject2 === 'object' && 'src' in loaded.studentProject2
            ? [(loaded.studentProject2 as any).src || null] 
            : []
      );
      setStudentProject2Files([]);
    });
  }, []);

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleArrayChange = (field: string, arr: any[]) => {
    setData((prev: any) => ({ ...prev, [field]: arr }));
  };

  // Khi upload xong
  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  // Logo upload
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };
  // Hexagon upload
  const handleHexagonFileChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newFiles = [...hexagonFiles];
    const newPreviews = [...hexagonPreviews];
    newFiles[idx] = file;
    newPreviews[idx] = URL.createObjectURL(file);
    setHexagonFiles(newFiles);
    setHexagonPreviews(newPreviews);
  };
  // Goal icon upload
  const handleGoalIconFileChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newFiles = [...goalIconFiles];
    const newPreviews = [...goalIconPreviews];
    newFiles[idx] = file;
    newPreviews[idx] = URL.createObjectURL(file);
    setGoalIconFiles(newFiles);
    setGoalIconPreviews(newPreviews);
  };
  // Student image upload
  const handleStudentImageFileChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newFiles = [...studentImageFiles];
    const newPreviews = [...studentImagePreviews];
    newFiles[idx] = file;
    newPreviews[idx] = URL.createObjectURL(file);
    setStudentImageFiles(newFiles);
    setStudentImagePreviews(newPreviews);
  };
  // Student Project 2 upload
  const handleStudentProject2FileChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStudentProject2Files(prev => {
      const arr = [...prev];
      arr[idx] = file;
      return arr;
    });
    setStudentProject2Previews(prev => {
      const arr = [...prev];
      arr[idx] = URL.createObjectURL(file);
      return arr;
    });
  };

  // Khi bấm Lưu
  const handleSave = async () => {
    setSaving(true);
    let bannerUrl = data.banner;
    let logoUrl = data.intro.logo;
    let studentProject2Url = data.studentProject2;
    // Banner upload
    if (bannerFile) {
      const formData = new FormData();
      formData.append('file', bannerFile);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const dataRes = await res.json();
      bannerUrl = dataRes.url;
      handleChange('banner', bannerUrl);
    }
    // Logo upload
    if (logoFile) {
      const formData = new FormData();
      formData.append('file', logoFile);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const dataRes = await res.json();
      logoUrl = dataRes.url;
      handleNestedChange('intro', 'logo', logoUrl);
    }
    // Student Project 2 upload
    if (studentProject2Files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < studentProject2Files.length; i++) {
        if (studentProject2Files[i]) {
          formData.append('file', studentProject2Files[i]!);
        }
      }
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const dataRes = await res.json();
      studentProject2Url = dataRes.urls;
      handleChange('studentProject2', studentProject2Url);
    }
    // Hexagon images upload
    let hexagonImages = [...data.hexagonImages];
    for (let i = 0; i < hexagonFiles.length; i++) {
      if (hexagonFiles[i]) {
        const formData = new FormData();
        formData.append('file', hexagonFiles[i]!);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const dataRes = await res.json();
        hexagonImages[i].src = dataRes.url;
      }
    }
    // Goal icons upload
    let goals = [...data.goals];
    for (let i = 0; i < goalIconFiles.length; i++) {
      if (goalIconFiles[i]) {
        const formData = new FormData();
        formData.append('file', goalIconFiles[i]!);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const dataRes = await res.json();
        goals[i].icon = dataRes.url;
      }
    }
    // Student images upload
    let studentImages = [...data.studentImages];
    for (let i = 0; i < studentImageFiles.length; i++) {
      if (studentImageFiles[i]) {
        const formData = new FormData();
        formData.append('file', studentImageFiles[i]!);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const dataRes = await res.json();
        studentImages[i].src = dataRes.url;
      }
    }
    let studentProject2Arr = [...data.studentProject2];
    for (let i = 0; i < studentProject2Files.length; i++) {
      if (studentProject2Files[i]) {
        const formData = new FormData();
        formData.append('file', studentProject2Files[i]!);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const dataRes = await res.json();
        studentProject2Arr[i] = { ...studentProject2Arr[i], src: dataRes.url };
      }
    }
    await axios.put('http://localhost:8080/recruitment-page', {
      data: JSON.stringify({
        ...data,
        banner: bannerUrl,
        intro: { ...data.intro, logo: logoUrl },
        hexagonImages,
        goals,
        studentImages,
        studentProject2: studentProject2Arr,
        studentContent: data.studentContent || '',
      })
    });
    setSaving(false);
    setBannerFile(null);
    setBannerPreview(null);
    setLogoFile(null);
    setLogoPreview(null);
    setHexagonFiles([]);
    setHexagonPreviews([]);
    setGoalIconFiles([]);
    setGoalIconPreviews([]);
    setStudentImageFiles([]);
    setStudentImagePreviews([]);
    setStudentProject2Files([]);
    setStudentProject2Previews(studentProject2Arr.map(img => img.src));
    setData(prev => ({ ...prev, studentProject2: studentProject2Arr }));
    alert('Đã lưu!');
    setPendingData({ ...data });
    setShowPreview(true);
  };

  // Custom upload adapter cho CKEditor
  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            fetch('/api/upload', { method: 'POST', body: formData })
              .then(res => res.json())
              .then(data => {
                resolve({ default: data.url });
              })
              .catch(reject);
          });
        });
      },
    };
  }
  // Cấu hình CKEditor để dùng custom upload adapter
  const editorConfig = {
    extraPlugins: [function(editor: any) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => uploadAdapter(loader);
    }],
    toolbar: [
      'heading', '|', 'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList', 'blockQuote',
      '|', 'fontSize', 'fontColor', 'fontBackgroundColor', 'alignment', '|', 'insertTable', 'imageUpload', 'undo', 'redo'
    ],
    image: {
      toolbar: [
        'imageTextAlternative', 'imageStyle:full', 'imageStyle:side'
      ]
    },
  };

  const handleConfirmSave = async () => {
    await axios.put('http://localhost:8080/recruitment-page', {
      data: JSON.stringify(pendingData)
    });
    setData(pendingData);
    setShowPreview(false);
    setPendingData(null);
    alert('Đã lưu thành công!');
  };

  const handleCancelPreview = () => {
    setShowPreview(false);
    setPendingData(null);
  };

  // Thêm 1 mục tiêu mới
  const addGoal = () => {
    setData(prev => ({
      ...prev,
      goals: [...prev.goals, { icon: '', title: '', desc: '' }]
    }));
    setGoalIconFiles(prev => [...prev, null]);
    setGoalIconPreviews(prev => [...prev, null]);
  };

  // Xóa mục tiêu
  const removeGoal = (idx: number) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== idx)
    }));
    setGoalIconFiles(prev => prev.filter((_, i) => i !== idx));
    setGoalIconPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  // Sửa mục tiêu
  const handleGoalChange = (idx: number, field: string, value: string) => {
    setData(prev => {
      const goals = [...prev.goals];
      goals[idx] = { ...goals[idx], [field]: value };
      return { ...prev, goals };
    });
  };

  // Thêm 1 ảnh hexagon
  const addHexagonImage = () => {
    setData(prev => ({
      ...prev,
      hexagonImages: [...prev.hexagonImages, { src: '', alt: '' }]
    }));
    setHexagonFiles(prev => [...prev, null]);
    setHexagonPreviews(prev => [...prev, null]);
  };

  // Xóa ảnh hexagon
  const removeHexagonImage = (idx: number) => {
    setData(prev => ({
      ...prev,
      hexagonImages: prev.hexagonImages.filter((_, i) => i !== idx)
    }));
    setHexagonFiles(prev => prev.filter((_, i) => i !== idx));
    setHexagonPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  // Sửa ảnh hexagon
  const handleHexagonImageChange = (idx: number, field: string, value: string) => {
    setData(prev => {
      const hexagonImages = [...prev.hexagonImages];
      hexagonImages[idx] = { ...hexagonImages[idx], [field]: value };
      return { ...prev, hexagonImages };
    });
  };

  // Thêm 1 ảnh sinh viên
  const addStudentImage = () => {
    setData(prev => ({
      ...prev,
      studentImages: [...prev.studentImages, { src: '', alt: '' }]
    }));
    setStudentImageFiles(prev => [...prev, null]);
    setStudentImagePreviews(prev => [...prev, null]);
  };

  // Xóa ảnh sinh viên
  const removeStudentImage = (idx: number) => {
    setData(prev => ({
      ...prev,
      studentImages: prev.studentImages.filter((_, i) => i !== idx)
    }));
    setStudentImageFiles(prev => prev.filter((_, i) => i !== idx));
    setStudentImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  // Sửa ảnh sinh viên
  const handleStudentImageChange = (idx: number, field: string, value: string) => {
    setData(prev => {
      const studentImages = [...prev.studentImages];
      studentImages[idx] = { ...studentImages[idx], [field]: value };
      return { ...prev, studentImages };
    });
  };

  // Thêm một mục tuyển dụng mới
  const addRecruitment = () => {
    setData(prev => ({
      ...prev,
      recruitments: [
        ...prev.recruitments,
        { location: '', wage: '', address: '', time: '' }
      ]
    }));
  };

  // Xóa một mục tuyển dụng
  const removeRecruitment = (idx: number) => {
    setData(prev => ({
      ...prev,
      recruitments: prev.recruitments.filter((_, i) => i !== idx)
    }));
  };

  // Sửa thông tin một mục tuyển dụng
  const handleRecruitmentChange = (idx: number, field: string, value: string) => {
    setData(prev => {
      const recruitments = [...prev.recruitments];
      recruitments[idx] = { ...recruitments[idx], [field]: value };
      return { ...prev, recruitments };
    });
  };

  // Alias cho đúng tên hàm upload file hexagon
  const handleHexagonImageFileChange = handleHexagonFileChange;

  // Định nghĩa các hàm thêm/xóa ảnh thực hành dự án 2 nếu chưa có
  const addStudentProject2Image = () => {
    setData(prev => ({
      ...prev,
      studentProject2: [...prev.studentProject2, { src: '', alt: '' }]
    }));
    setStudentProject2Files(prev => [...prev, null]);
    setStudentProject2Previews(prev => [...prev, null]);
  };
  const removeStudentProject2Image = (idx: number) => {
    setData(prev => ({
      ...prev,
      studentProject2: prev.studentProject2.filter((_, i) => i !== idx)
    }));
    setStudentProject2Files(prev => prev.filter((_, i) => i !== idx));
    setStudentProject2Previews(prev => prev.filter((_, i) => i !== idx));
  };

  // Sửa ảnh thực hành dự án 2
  const handleStudentProject2Change = (idx: number, field: string, value: string) => {
    setData(prev => {
      const studentProject2 = [...prev.studentProject2];
      studentProject2[idx] = { ...studentProject2[idx], [field]: value };
      return { ...prev, studentProject2 };
    });
  };

  if (!data) return <div>Đang tải...</div>;

  return (
    <>
      {showPreview && pendingData && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Xem trước thông tin sẽ được lưu</h2>
            
            {/* --- BẮT ĐẦU PHẦN PREVIEW --- */}
            {/* Banner */}
            <section className="mb-8">
              {pendingData.banner && <img src={pendingData.banner} alt="Banner" className="w-full h-64 object-cover rounded" />}
              <div className="font-bold text-yellow-600 text-2xl text-center my-2">{pendingData.bannerTitle}</div>
              <div className="text-3xl font-bold text-blue-700 text-center">{pendingData.mainTitle}</div>
            </section>

            {/* Logo & Giới thiệu */}
            <section className="flex flex-row w-full justify-center items-start gap-8 mt-4 mb-8">
              {pendingData.intro?.logo && <img src={pendingData.intro.logo} alt="Logo" className="w-[220px] h-auto object-contain" />}
              <div className="max-w-[900px] text-[20px] leading-[1.4] text-black text-justify">
                {pendingData.intro.text}
              </div>
            </section>

            {/* Hexagon Images */}
            <section className="flex flex-wrap justify-center items-center gap-y-0 mb-8">
              {pendingData.hexagonImages.map((img: {src: string; alt: string}, idx: number) => (
                <img key={idx} src={img.src} alt={img.alt} className="w-40 h-40 object-cover rounded-full border-4 border-blue-700 m-2" />
              ))}
            </section>

            {/* Goals */}
            <section className="w-full flex flex-col items-center mb-8">
              <div className="w-[98%] bg-[#f7f7f7] rounded-lg flex flex-row justify-center items-stretch gap-8 py-10 px-4">
                {pendingData.goals.map((goal: {icon: string; title: string; desc: string}, idx: number) => (
                  <div key={idx} className="flex-1 flex flex-col items-center text-center px-4">
                    {goal.icon && <img src={goal.icon} alt="" className="w-16 h-16 mb-2" />}
                    <h3 className="text-2xl font-semibold mb-2">{goal.title}</h3>
                    <p className="text-lg text-gray-800">{goal.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Student Images */}
            <section className="w-full flex flex-col items-center mb-8">
              <h2 className="text-[40px] font-bold text-[#1553ad] text-center mb-2">
                Hình ảnh của sinh viên đang thực hành dự án
              </h2>
              <div className="flex flex-row justify-center items-end gap-12 mt-4 mb-2">
                {pendingData.studentImages.map((img: {src: string; alt: string}, idx: number) => (
                  <img key={idx} src={img.src} alt={img.alt} className="w-[180px] h-[180px] rounded-full border-4 border-[#1553ad] object-cover shadow-lg" />
                ))}
              </div>
            </section>

            {/* Student Project 2 + Content */}
            <section className="flex flex-col md:flex-row w-full max-w-[1200px] mx-auto gap-8 mb-8 text-black">
              <div className="flex flex-col gap-6 flex-shrink-0 items-center md:items-start w-full md:w-[340px]">
                {Array.isArray(pendingData.studentProject2) && pendingData.studentProject2.map((img: {src: string; alt: string}, idx: number) => (
                  <img key={idx} src={img.src} alt={img.alt || 'Sinh viên thực hành dự án 2'} className="w-[260px] h-[160px] rounded-xl object-cover shadow" />
                ))}
              </div>
              <div className="flex-1 flex flex-col justify-start">
                {/* Hiển thị HTML CKEditor */}
                <div dangerouslySetInnerHTML={{ __html: pendingData.studentContent || '' }} />
              </div>
            </section>

            {/* Recruitments */}
            <section className="py-8">
              <h2 className="text-black text-[32px] font-bold text-center uppercase mb-6">
                CƠ HỘI NGHỀ NGHIỆP
              </h2>
              <div className="flex flex-wrap justify-center">
                {pendingData.recruitments.map((recruitment: {location: string; wage: string; address: string; time: string}, idx: number) => (
                  <div key={idx} className="p-6 mb-4 w-full mx-auto border-b border-gray-200">
                    <div className="flex flex-wrap">
                      <div className="pl-0 flex-col flex flex-grow relative pr-4 w-1/2">
                        <div className="font-bold">{recruitment.location}</div>
                        <div className="flex flex-col pt-2">
                          <div className="flex flex-row items-center">
                            <span className="text-red-500 ml-2 mr-12 text-base">{recruitment.wage}</span>
                          </div>
                          <div className="flex flex-row items-center">
                            <span className="text-black ml-2 mr-12 text-base">{recruitment.address}</span>
                          </div>
                          <div className="flex flex-row items-center">
                            <span className="text-black ml-2 mr-12 text-base">{recruitment.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* --- KẾT THÚC PHẦN PREVIEW --- */}

            <div className="flex justify-end gap-4 mt-10">
              <button onClick={handleCancelPreview} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Hủy</button>
              <button onClick={handleConfirmSave} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Đồng ý lưu</button>
            </div>
          </div>
        </div>
      )}
      {!showPreview && (
        <div className="max-w mx-auto p-4 space-y-8 bg-white text-gray-800 rounded shadow">
          {/* --- FORM CHỈNH SỬA --- */}
          {/* ...toàn bộ phần form chỉnh sửa của bạn ở đây... */}
          {/* Ví dụ: */}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w mx-auto mt-8">
  <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Chỉnh sửa thông tin trang Tuyển dụng</h1>

  {/* Banner */}
  <section className="mb-6">
    <label className="block font-semibold mb-1">Ảnh Banner</label>
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={data.banner}
        onChange={e => handleChange('banner', e.target.value)}
        className="flex-1 border rounded px-3 py-2"
        placeholder="Đường dẫn ảnh banner"
      />
      <input type="file" accept="image/*" onChange={handleBannerFileChange} className="block" />
    </div>
    {(bannerPreview || data.banner) && <img src={bannerPreview || data.banner} alt="Banner" className="h-32 mt-2 rounded shadow" />}
  </section>

  {/* Banner Title */}
  <section className="mb-6">
    <label className="block font-semibold mb-1">Tiêu đề Banner</label>
    <input
      type="text"
      value={data.bannerTitle}
      onChange={e => handleChange('bannerTitle', e.target.value)}
      className="w-full border rounded px-3 py-2"
      placeholder="Tiêu đề banner"
    />
  </section>

  {/* Main Title */}
  <section className="mb-6">
    <label className="block font-semibold mb-1">Tiêu đề chính</label>
    <input
      type="text"
      value={data.mainTitle}
      onChange={e => handleChange('mainTitle', e.target.value)}
      className="w-full border rounded px-3 py-2"
      placeholder="Tiêu đề chính"
    />
  </section>

  {/* Logo & Intro */}
  <section className="mb-6">
    <label className="block font-semibold mb-1">Logo</label>
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={data.intro.logo}
        onChange={e => handleNestedChange('intro', 'logo', e.target.value)}
        className="flex-1 border rounded px-3 py-2"
        placeholder="Đường dẫn logo"
      />
      <input type="file" accept="image/*" onChange={handleLogoFileChange} className="block" />
    </div>
    {(logoPreview || data.intro.logo) && <img src={logoPreview || data.intro.logo} alt="Logo" className="h-16 mt-2 rounded" />}
    <label className="block font-semibold mt-4 mb-1">Giới thiệu</label>
    <textarea
      value={data.intro.text}
      onChange={e => handleNestedChange('intro', 'text', e.target.value)}
      className="w-full border rounded px-3 py-4 resize-none"
      rows={3}
      placeholder="Giới thiệu về tổ chức"
    />
  </section>

  {/* Hexagon Images */}
  <section className="mb-6">
    <label className="block font-semibold mb-1">Ảnh sự kiện (Hexagon)</label>
    {data.hexagonImages.map((img, idx) => (
      <div key={idx} className="flex items-center gap-4 mb-2">
        <input
          type="text"
          value={img.src}
          onChange={e => handleHexagonImageChange(idx, 'src', e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Đường dẫn ảnh"
        />
        <input
          type="text"
          value={img.alt}
          onChange={e => handleHexagonImageChange(idx, 'alt', e.target.value)}
          className="w-40 border rounded px-3 py-2"
          placeholder="Mô tả"
        />
        <input type="file" accept="image/*" onChange={e => handleHexagonImageFileChange(idx, e)} className="block" />
        {(hexagonPreviews[idx] || img.src) && <img src={hexagonPreviews[idx] || img.src} alt="" className="h-12 w-12 rounded" />}
        <button type="button" onClick={() => removeHexagonImage(idx)} className="text-red-500 font-bold ml-2">X</button>
      </div>
    ))}
    <button type="button" onClick={addHexagonImage} className="mt-2 px-3 py-1 bg-blue-100 rounded text-blue-700">+ Thêm ảnh sự kiện</button>
  </section>

  {/* Goals */}
  <section className="mb-6">
    <label className="block font-semibold mb-1">Mục tiêu</label>
    {data.goals.map((goal, idx) => (
      <div key={idx} className="flex items-center gap-4 mb-2">
        <input
          type="text"
          value={goal.icon}
          onChange={e => handleGoalChange(idx, 'icon', e.target.value)}
          className="w-32 border rounded px-3 py-2"
          placeholder="Icon"
        />
        <input
          type="text"
          value={goal.title}
          onChange={e => handleGoalChange(idx, 'title', e.target.value)}
          className="w-40 border rounded px-3 py-2"
          placeholder="Tiêu đề"
        />
        <input
          type="text"
          value={goal.desc}
          onChange={e => handleGoalChange(idx, 'desc', e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Mô tả"
        />
        <input type="file" accept="image/*" onChange={e => handleGoalIconFileChange(idx, e)} className="block" />
        {(goalIconPreviews[idx] || goal.icon) && <img src={goalIconPreviews[idx] || goal.icon} alt="" className="h-10 w-10 rounded" />}
        <button type="button" onClick={() => removeGoal(idx)} className="text-red-500 font-bold ml-2">X</button>
      </div>
    ))}
    <button type="button" onClick={addGoal} className="mt-2 px-3 py-1 bg-blue-100 rounded text-blue-700">+ Thêm mục tiêu</button>
  </section>

  {/* Student Images */}
  <section className="mb-6">
    <label className="block font-semibold mb-1">Ảnh sinh viên thực hành</label>
    {data.studentImages.map((img, idx) => (
      <div key={idx} className="flex items-center gap-4 mb-2">
        <input
          type="text"
          value={img.src}
          onChange={e => handleStudentImageChange(idx, 'src', e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Đường dẫn ảnh"
        />
        <input
          type="text"
          value={img.alt}
          onChange={e => handleStudentImageChange(idx, 'alt', e.target.value)}
          className="w-40 border rounded px-3 py-2"
          placeholder="Mô tả"
        />
        <input type="file" accept="image/*" onChange={e => handleStudentImageFileChange(idx, e)} className="block" />
        {(studentImagePreviews[idx] || img.src) && <img src={studentImagePreviews[idx] || img.src} alt="" className="h-12 w-12 rounded" />}
        <button type="button" onClick={() => removeStudentImage(idx)} className="text-red-500 font-bold ml-2">X</button>
      </div>
    ))}
    <button type="button" onClick={addStudentImage} className="mt-2 px-3 py-1 bg-blue-100 rounded text-blue-700">+ Thêm ảnh sinh viên</button>
  </section>

  {/* --- UI: phần ảnh thực hành dự án 2 --- */}
  {/* Ảnh sinh viên thực hành dự án 2 */}
  <section className="mb-6">
    <label className="block font-semibold mb-1">Ảnh sinh viên thực hành dự án 2</label>
    {Array.isArray(data.studentProject2) && data.studentProject2.length === 0 && (
      <div className="text-gray-400 italic mb-2">Chưa có ảnh nào</div>
    )}
    {Array.isArray(data.studentProject2) && data.studentProject2.map((img, idx) => (
      <div key={idx} className="flex items-center gap-4 mb-2">
        <input
          type="text"
          value={img.src}
          onChange={e => handleStudentProject2Change(idx, 'src', e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Đường dẫn ảnh"
        />
        <input
          type="text"
          value={img.alt}
          onChange={e => handleStudentProject2Change(idx, 'alt', e.target.value)}
          className="w-40 border rounded px-3 py-2"
          placeholder="Mô tả"
        />
        <input type="file" accept="image/*" onChange={e => handleStudentProject2FileChange(idx, e)} className="block" />
        {(studentProject2Previews[idx] || img.src) && <img src={studentProject2Previews[idx] || img.src} alt={img.alt} className="h-12 w-12 rounded" />}
        <button type="button" onClick={() => removeStudentProject2Image(idx)} className="text-red-500 font-bold ml-2">X</button>
      </div>
    ))}
    <button type="button" onClick={addStudentProject2Image} className="mt-2 px-3 py-1 bg-blue-100 rounded text-blue-700">+ Thêm ảnh thực hành dự án 2</button>
  </section>

  {/* Nội dung sinh viên thực hành (CKEditor) */}
  <section className="mb-6">
    <label className="block font-semibold mb-1">Nội dung sinh viên thực hành</label>
    <div className="border rounded bg-white">
      {isClient && editorReady && ClassicEditorRef.current && (
        <div className="p-4">
          <div ref={editorContainerRef} className="min-h-[300px]">
            {/* CKEditor sẽ được khởi tạo trực tiếp vào div này */}
          </div>
        </div>
      )}
      {(!isClient || !editorReady) && (
        <textarea
          className="w-full border-0 p-4 min-h-[200px] resize-none"
          placeholder="Đang tải editor..."
          value={data.studentContent || ''}
          onChange={(e) => setData((prev: any) => ({ ...prev, studentContent: e.target.value }))}
        />
      )}
    </div>
    <p className="text-xs text-gray-500 mt-1">
      Bạn có thể chèn ảnh sinh viên thực hành dự án 2 hoặc bất kỳ ảnh nào, kéo thả hoặc dán trực tiếp vào khung soạn thảo.
    </p>
  </section>

  {/* Danh sách tuyển dụng */}
  <section className="mb-6">
    <label className="block font-semibold mb-1">Danh sách tuyển dụng</label>
    {data.recruitments.map((item, idx) => (
      <div key={idx} className="flex flex-wrap gap-2 mb-2 items-center">
        <input
          type="text"
          value={item.location}
          onChange={e => handleRecruitmentChange(idx, 'location', e.target.value)}
          className="w-40 border rounded px-3 py-2"
          placeholder="Vị trí"
        />
        <input
          type="text"
          value={item.wage}
          onChange={e => handleRecruitmentChange(idx, 'wage', e.target.value)}
          className="w-32 border rounded px-3 py-2"
          placeholder="Lương"
        />
        <input
          type="text"
          value={item.address}
          onChange={e => handleRecruitmentChange(idx, 'address', e.target.value)}
          className="w-32 border rounded px-3 py-2"
          placeholder="Địa chỉ"
        />
        <input
          type="text"
          value={item.time}
          onChange={e => handleRecruitmentChange(idx, 'time', e.target.value)}
          className="w-32 border rounded px-3 py-2"
          placeholder="Thời hạn"
        />
        <button type="button" onClick={() => removeRecruitment(idx)} className="text-red-500 font-bold ml-2">X</button>
      </div>
    ))}
    <button type="button" onClick={addRecruitment} className="mt-2 px-3 py-1 bg-blue-100 rounded text-blue-700">+ Thêm tuyển dụng</button>
  </section>
</div>
          <button className="bg-green-600 text-white px-4 py-2 rounded mt-6" onClick={handleSave} disabled={saving}>
            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
      </div>
    )}
  </>
  );
}

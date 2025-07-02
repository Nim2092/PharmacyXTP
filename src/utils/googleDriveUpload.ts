/**
 * Upload file lên Google Drive thông qua API backend
 * @param file File CV ứng viên
 * @returns Link Google Drive đã upload (Promise<string | null>)
 */
export const uploadFileToDrive = async (file: File): Promise<string | null> => {
  try {
    console.log('📤 Starting Google Drive upload for:', file.name);
    
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload-to-drive', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Google Drive upload failed: ${response.status} - ${errorData.error}`);
    }
    
    const result = await response.json();
    
    if (result.driveLink) {
      console.log('✅ Google Drive upload successful:', result.driveLink);
      return result.driveLink;
    }
    
    throw new Error('No drive link returned from API');
  } catch (error) {
    console.error('❌ Error uploading to Google Drive:', error);
    return null;
  }
};
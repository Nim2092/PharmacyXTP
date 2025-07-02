// Custom Upload Adapter cho CKEditor với multiple endpoints
export class MyUploadAdapter {
  private loader: any;
  private endpoints: string[];
  private xhr?: XMLHttpRequest;
  private currentEndpointIndex: number = 0;

  constructor(loader: any) {
    this.loader = loader;
    // Multiple endpoints để fallback
    this.endpoints = [
      'http://localhost:8080/upload',           // Primary Go backend
      'http://localhost:8080/upload/ckeditor',  // CKEditor specific
      '/api/upload',                            // Next.js API route
      'http://localhost:3000/api/upload'        // Absolute Next.js
    ];
  }

  upload(): Promise<{ default: string }> {
    console.log('🔄 Starting CKEditor image upload...');
    return this.loader.file
      .then((file: File) => {
        console.log('📁 File details:', {
          name: file.name,
          size: file.size,
          type: file.type
        });
        return new Promise<{ default: string }>((resolve, reject) => {
          this._tryUpload(resolve, reject, file, 0);
        });
      });
  }

  private _tryUpload(resolve: (value: { default: string }) => void, reject: (reason?: any) => void, file: File, endpointIndex: number): void {
    if (endpointIndex >= this.endpoints.length) {
      const error = 'Tất cả upload endpoints đều failed!';
      console.error('❌', error);
      reject(error);
      return;
    }

    const endpoint = this.endpoints[endpointIndex];
    console.log(`🌐 Trying endpoint ${endpointIndex + 1}/${this.endpoints.length}: ${endpoint}`);

    this.currentEndpointIndex = endpointIndex;
    this._initRequest(endpoint);
    this._initListeners(resolve, reject, file, endpointIndex);
    this._sendRequest(file);
  }

  abort(): void {
    if (this.xhr) {
      console.log('⚠️ Upload aborted');
      this.xhr.abort();
    }
  }

  private _initRequest(url: string): void {
    const xhr = this.xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.responseType = 'json';
    
    // Set headers for better compatibility
    xhr.setRequestHeader('Accept', 'application/json');
  }

  private _initListeners(resolve: (value: { default: string }) => void, reject: (reason?: any) => void, file: File, endpointIndex: number): void {
    const xhr = this.xhr!;
    const loader = this.loader;

    xhr.addEventListener('error', () => {
      console.error(`❌ Network error on endpoint: ${this.endpoints[endpointIndex]}`);
      this._tryUpload(resolve, reject, file, endpointIndex + 1);
    });

    xhr.addEventListener('abort', () => {
      console.warn('⚠️ Upload aborted by user');
      reject('Upload aborted');
    });

    xhr.addEventListener('load', () => {
      console.log(`📥 Response from ${this.endpoints[endpointIndex]}:`, {
        status: xhr.status,
        response: xhr.response
      });

      if (xhr.status !== 200 && xhr.status !== 201) {
        console.error(`❌ HTTP ${xhr.status} from ${this.endpoints[endpointIndex]}`);
        this._tryUpload(resolve, reject, file, endpointIndex + 1);
        return;
      }

      const response = xhr.response;
      
      if (!response) {
        console.error('❌ Empty response');
        this._tryUpload(resolve, reject, file, endpointIndex + 1);
        return;
      }

      // Try different response formats
      let imageUrl = this._extractImageUrl(response);
      
      if (imageUrl) {
        console.log('✅ Upload successful:', imageUrl);
        
        // Dispatch custom event for handles setup
        document.dispatchEvent(new CustomEvent('ckeditor-image-uploaded', { 
          detail: { 
            url: imageUrl, 
            file,
            endpoint: this.endpoints[endpointIndex]
          } 
        }));
        
        resolve({ default: imageUrl });
      } else {
        console.error('❌ No valid URL in response:', response);
        this._tryUpload(resolve, reject, file, endpointIndex + 1);
      }
    });

    // Progress tracking
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          const percentComplete = (evt.loaded / evt.total) * 100;
          console.log(`📊 Upload progress: ${percentComplete.toFixed(1)}%`);
          
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  private _extractImageUrl(response: any): string | null {
    // Try different common response formats
    if (typeof response === 'string') {
      return response;
    }
    
    if (response.url) {
      return response.url;
    }
    
    if (response.data && response.data.url) {
      return response.data.url;
    }
    
    if (response.location) {
      return response.location;
    }
    
    if (response.path) {
      return response.path;
    }
    
    if (response.src) {
      return response.src;
    }
    
    if (response.file_url) {
      return response.file_url;
    }

    if (response.uploaded && response.uploaded.url) {
      return response.uploaded.url;
    }
    
    return null;
  }

  private _sendRequest(file: File): void {
    const data = new FormData();
    
    // Try both field names for compatibility
    data.append('upload', file);  // CKEditor standard
    data.append('file', file);    // Common standard
    data.append('image', file);   // Alternative
    
    console.log('🚀 Sending upload request...');
    this.xhr!.send(data);
  }
}

// Plugin factory cho upload adapter
export function MyCustomUploadAdapterPlugin(editor: any): void {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader);
  };
}

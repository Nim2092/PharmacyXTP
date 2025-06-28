// Custom Upload Adapter cho CKEditor
export class MyUploadAdapter {
  private loader: any;
  private url: string;
  private xhr?: XMLHttpRequest;

  constructor(loader: any) {
    this.loader = loader;
    this.url = 'http://localhost:8080/upload/ckeditor';
  }

  upload(): Promise<{ default: string }> {
    return this.loader.file
      .then((file: File) => new Promise<{ default: string }>((resolve, reject) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      }));
  }

  abort(): void {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  private _initRequest(): void {
    const xhr = this.xhr = new XMLHttpRequest();
    xhr.open('POST', this.url, true);
    xhr.responseType = 'json';
  }

  private _initListeners(resolve: (value: { default: string }) => void, reject: (reason?: any) => void, file: File): void {
    const xhr = this.xhr!;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;

      if (!response || xhr.status !== 200) {
        return reject(response && response.message ? response.message : genericErrorText);
      }

      // Response phải có format: { "url": "http://..." }
      if (response.url) {
        console.log('✅ Upload successful:', response.url);
        
        // Dispatch custom event để setup handles
        document.dispatchEvent(new CustomEvent('image-uploaded', { 
          detail: { url: response.url, file } 
        }));
        
        resolve({ default: response.url });
      } else {
        reject('Upload failed: No URL in response');
      }
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  private _sendRequest(file: File): void {
    const data = new FormData();
    data.append('upload', file);
    this.xhr!.send(data);
  }
}

// Plugin factory cho upload adapter
export function MyCustomUploadAdapterPlugin(editor: any): void {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader);
  };
}

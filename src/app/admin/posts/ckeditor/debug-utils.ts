// CKEditor Debug & Test Utilities
export class CKEditorDebugger {
  private editor: any;

  constructor(editor: any) {
    this.editor = editor;
  }

  // Test upload functionality
  async testUpload(file?: File): Promise<void> {
    console.log('🧪 Testing CKEditor upload functionality...');
    
    if (!file) {
      // Create a test file
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(0, 0, 100, 100);
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.fillText('TEST', 20, 60);
      }
      
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png');
      });
      
      file = new File([blob], 'test-image.png', { type: 'image/png' });
      console.log('📁 Created test file:', file);
    }

    try {
      const fileRepository = this.editor.plugins.get('FileRepository');
      const loader = fileRepository.createLoader(file);
      
      console.log('📋 File loader created:', loader);
      
      const uploadAdapter = fileRepository.createUploadAdapter(loader);
      console.log('🔌 Upload adapter created:', uploadAdapter);
      
      const result = await uploadAdapter.upload();
      console.log('✅ Upload test successful:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Upload test failed:', error);
      throw error;
    }
  }

  // Test available endpoints
  async testEndpoints(): Promise<void> {
    console.log('🌐 Testing upload endpoints...');
    
    const endpoints = [
      'http://localhost:8080/upload',
      'http://localhost:8080/upload/ckeditor', 
      '/api/upload',
      'http://localhost:3000/api/upload'
    ];

    const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    
    for (const endpoint of endpoints) {
      try {
        console.log(`📡 Testing ${endpoint}...`);
        
        const formData = new FormData();
        formData.append('file', testFile);
        formData.append('upload', testFile);
        
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData
        });
        
        console.log(`✅ ${endpoint}: ${response.status} ${response.statusText}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`📄 Response:`, data);
        }
      } catch (error) {
        console.error(`❌ ${endpoint}: ${error}`);
      }
    }
  }

  // Debug editor state
  debugEditor(): void {
    console.log('🔍 CKEditor Debug Information:');
    console.log('Editor instance:', this.editor);
    console.log('Editor state:', this.editor.state);
    console.log('Editor data:', this.editor.getData());
    
    // Check plugins
    const plugins = Array.from(this.editor.plugins).map((p: any) => p.constructor.name);
    console.log('Loaded plugins:', plugins);
    
    // Check FileRepository
    try {
      const fileRepository = this.editor.plugins.get('FileRepository');
      console.log('FileRepository plugin:', fileRepository);
    } catch (error) {
      console.error('FileRepository plugin not found:', error);
    }
    
    // Check UI elements
    const toolbar = this.editor.ui?.view?.toolbar;
    console.log('Toolbar:', toolbar);
    
    const uploadButton = document.querySelector('[data-cke-tooltip-text*="image"], [data-cke-tooltip-text*="Insert image"]');
    console.log('Upload button found:', !!uploadButton, uploadButton);
  }

  // Debug image widgets
  debugImageWidgets(): void {
    console.log('🖼️ Debugging image widgets...');
    
    const widgets = this.editor.ui.view.element?.querySelectorAll('.ck-widget');
    console.log(`Found ${widgets?.length || 0} widgets`);
    
    widgets?.forEach((widget: Element, index: number) => {
      const img = widget.querySelector('img');
      if (img) {
        console.log(`Image widget ${index}:`, {
          src: img.src,
          width: img.width,
          height: img.height,
          alt: img.alt
        });
      }
    });
  }

  // Force create handles for testing
  forceCreateHandles(): void {
    console.log('🔧 Force creating handles for all images...');
    
    const images = this.editor.ui.view.element?.querySelectorAll('.ck-widget img');
    console.log(`Found ${images?.length || 0} images to process`);
    
    images?.forEach((img: Element, index: number) => {
      const widget = img.closest('.ck-widget') as HTMLElement;
      if (widget) {
        console.log(`Processing image ${index}...`);
        
        // Dispatch event để trigger handle creation
        document.dispatchEvent(new CustomEvent('ckeditor-force-handles', {
          detail: { widget, img, index }
        }));
      }
    });
  }

  // Test image insertion manually
  async insertTestImage(): Promise<void> {
    console.log('🖼️ Inserting test image...');
    
    try {
      // Create test image
      const testImageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwN2NmZiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VEVTVF9JTUc8L3RleHQ+PC9zdmc+';
      
      this.editor.model.change((writer: any) => {
        const imageElement = writer.createElement('imageBlock', { src: testImageUrl });
        
        writer.insert(imageElement, this.editor.model.document.selection.getFirstPosition());
      });
      
      console.log('✅ Test image inserted');
      
      // Wait for DOM update then debug
      setTimeout(() => {
        this.debugImageWidgets();
      }, 500);
      
    } catch (error) {
      console.error('❌ Failed to insert test image:', error);
    }
  }
}

// Global debug functions
declare global {
  interface Window {
    debugCKEditor: (editor: any) => CKEditorDebugger;
    testCKEditorUpload: (editor: any, file?: File) => Promise<any>;
    testUploadEndpoints: () => Promise<void>;
  }
}

// Export global debug functions
export function setupGlobalDebugFunctions(): void {
  window.debugCKEditor = (editor: any) => new CKEditorDebugger(editor);
  
  window.testCKEditorUpload = async (editor: any, file?: File) => {
    const debug = new CKEditorDebugger(editor);
    return debug.testUpload(file);
  };
  
  window.testUploadEndpoints = async () => {
    const debug = new CKEditorDebugger(null);
    return debug.testEndpoints();
  };
  
  console.log('🛠️ Global CKEditor debug functions available:');
  console.log('- debugCKEditor(editor)');
  console.log('- testCKEditorUpload(editor, file?)'); 
  console.log('- testUploadEndpoints()');
}

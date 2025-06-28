// Plugin Initialization Logic - Setup event listeners và initialization
export function initializePlugin(editor: any, callbacks: any) {
  const { createEdgeHandles, setupCustomHandles, hideNativeCKEditorHandles } = callbacks;
  
  // Monitor cho image widgets mới - SUPER OPTIMIZED (chỉ khi cần)
  let hasInitialized = false;
  
  editor.model.document.on('change:data', () => {
    // Chỉ check nếu có ảnh thực sự
    const currentData = editor.getData();
    if (currentData.includes('<img') || currentData.includes('image')) {
      setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 300);
    }
  });

  // Monitor khi có element được chọn - ONLY for images
  editor.model.document.selection.on('change:range', () => {
    const selectedElement = editor.model.document.selection.getSelectedElement();
    if (selectedElement && (selectedElement.name === 'imageBlock' || selectedElement.name === 'imageInline')) {
      setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 100);
    }
  });

  // Monitor DOM mutations cho image elements - OPTIMIZED + HIDE NATIVE HANDLES
  const observeImageChanges = () => {
    const editorElement = editor.editing.view.domConverter.viewToDom(editor.editing.view.document.getRoot());
    if (editorElement) {
      const observer = new MutationObserver((mutations) => {
        let hasImageChanges = false;
        let shouldHideNativeHandles = false;
        
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                if (element.classList.contains('ck-widget') && 
                    (element.classList.contains('image') || element.classList.contains('image-inline'))) {
                  hasImageChanges = true;
                }
                // Kiểm tra cả children
                if (element.querySelector && element.querySelector('.ck-widget.image, .ck-widget.image-inline')) {
                  hasImageChanges = true;
                }
                
                // Check for native CKEditor handles being added
                if (element.classList.contains('ck-widget__resizer__handle') && 
                    !element.classList.contains('ck-custom-edge-handle') &&
                    !element.classList.contains('ck-corner-handle') &&
                    !element.classList.contains('ck-drag-handle')) {
                  shouldHideNativeHandles = true;
                }
              }
            });
          }
          
          // Check for attribute changes that might affect handles
          if (mutation.type === 'attributes') {
            const target = mutation.target as Element;
            if (target.classList.contains('ck-widget') && 
                (target.classList.contains('image') || target.classList.contains('image-inline'))) {
              shouldHideNativeHandles = true;
              
              // IMMEDIATE hide if this widget has custom handles
              const htmlTarget = target as HTMLElement;
              if (htmlTarget.getAttribute('data-custom-handles') === 'true') {
                hideNativeCKEditorHandles(htmlTarget);
              }
            }
          }
        });
        
        // Hide native handles immediately if detected
        if (shouldHideNativeHandles) {
          setTimeout(() => {
            const imageWidgets = document.querySelectorAll('.ck-widget.image, .ck-widget.image-inline');
            imageWidgets.forEach((widget) => {
              const htmlWidget = widget as HTMLElement;
              if (htmlWidget.getAttribute('data-custom-handles') === 'true') {
                hideNativeCKEditorHandles(htmlWidget);
              }
            });
          }, 50); // Very quick response to hide native handles
        }
        
        if (hasImageChanges) {
          console.log('🔥 New image detected, setting up handles...');
          setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 100);
          setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 400);
        }
      });
      
      observer.observe(editorElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
      });
      
      console.log('✅ MutationObserver ready for image changes');
    }
  };

  // Listen cho custom event từ upload adapter - ENHANCED
  document.addEventListener('image-uploaded', () => {
    console.log('🎯 Image uploaded, setting up handles...');
    // Force multiple setup với aggressive timing
    setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 50);
    setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 200);
    setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 500);
    setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 1000);
    setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 2000);
  });

  editor.on('ready', () => {
    console.log('🚀 CKEditor ready, initializing handle system...');
    hasInitialized = true;
    
    // Initial setup với nhiều attempts
    setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 100);
    setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 500);
    setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 1000);
    setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 2000);
    
    // Setup MutationObserver
    setTimeout(() => observeImageChanges(), 1500);
    
    // *** NEW: CONTINUOUS NATIVE HANDLE HUNTER ***
    // Interval để liên tục tìm và ẩn native handles
    const nativeHandleHunter = setInterval(() => {
      const imageWidgets = document.querySelectorAll('.ck-widget[data-custom-handles="true"]');
      let hiddenCount = 0;
      
      imageWidgets.forEach((widget) => {
        const htmlWidget = widget as HTMLElement;
        const nativeHandles = htmlWidget.querySelectorAll('.ck-widget__resizer__handle:not(.ck-custom-edge-handle):not(.ck-corner-handle):not(.ck-drag-handle)');
        
        if (nativeHandles.length > 0) {
          hideNativeCKEditorHandles(htmlWidget);
          hiddenCount++;
        }
      });
      
      if (hiddenCount > 0) {
        console.log(`🚫 Native handle hunter: Hidden handles on ${hiddenCount} widgets`);
      }
    }, 500); // Check every 500ms
    
    // Stop hunter after 30 seconds to avoid memory leak
    setTimeout(() => {
      clearInterval(nativeHandleHunter);
      console.log('🏁 Native handle hunter stopped');
    }, 30000);
    
    // Add click listener để force setup khi user click vào ảnh
    const editorElement = editor.ui.getEditableElement();
    if (editorElement) {
      editorElement.addEventListener('click', (e: Event) => {
        const target = e.target as Element;
        if (target && (target.closest('.ck-widget.image') || target.tagName === 'IMG')) {
          console.log('🖱️ Image clicked, forcing handles setup...');
          setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 50);
          setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 200);
          setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 500);
        }
      });
      console.log('✅ Click listener ready');
    }
  });

  // Periodic scan - CHỈ CHẠY KHI CẦN (có ảnh)
  let scanCount = 0;
  const scanner = setInterval(() => {
    // Chỉ scan nếu đã initialized và có ảnh
    if (hasInitialized) {
      const imageCount = document.querySelectorAll('.ck-widget.image, .ck-widget.image-inline').length;
      if (imageCount > 0) {
        scanCount++;
        setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles);
        
        // Dừng scan sau 5 lần hoặc khi handles đã đầy đủ
        const totalHandles = document.querySelectorAll('.ck-custom-edge-handle, .ck-corner-handle, .ck-drag-handle').length;
        if (scanCount >= 5 || totalHandles >= imageCount * 9) {
          clearInterval(scanner);
          console.log('🏁 Handle setup completed');
        }
      } else if (scanCount > 0) {
        // Không có ảnh nữa, dừng scan
        clearInterval(scanner);
      }
    }
  }, 2000);
  
  // Setup debug functions
  setupDebugFunctions(editor, createEdgeHandles, setupCustomHandles, hideNativeCKEditorHandles);
}

// Debug Functions Setup
function setupDebugFunctions(editor: any, createEdgeHandles: any, setupCustomHandles: any, hideNativeCKEditorHandles: any) {
  // SUPER ENHANCED DEBUG - Kiểm tra DOM structure và CSS
  const debugHandles = () => {
    console.log('🔍 Starting SUPER ENHANCED handle debug...');
    
    const allImages = document.querySelectorAll('.ck-widget.image');
    const totalCustom = document.querySelectorAll('.ck-custom-edge-handle').length;
    const totalCorner = document.querySelectorAll('.ck-corner-handle').length;
    const totalDrag = document.querySelectorAll('.ck-drag-handle').length;
    const totalNative = document.querySelectorAll('.ck-widget__resizer__handle').length;
    
    console.log('=== ENHANCED HANDLE DEBUG REPORT ===');
    console.log(`📸 Total image widgets: ${allImages.length}`);
    console.log(`🎯 Custom edge handles (left/right/top/bottom): ${totalCustom}`);
    console.log(`🔴 Corner handles (4 góc): ${totalCorner}`);
    console.log(`🟣 Drag handles (tím): ${totalDrag}`);
    console.log(`🔵 Native handles: ${totalNative}`);
    console.log(`📊 Total custom handles: ${totalCustom + totalCorner + totalDrag}`);
    console.log('=====================================');
    
    return { allImages: allImages.length, totalCustom, totalCorner, totalDrag, totalNative };
  };

  // Test HTML Output - để kiểm tra dữ liệu xuất có đúng không
  const testHTMLOutput = () => {
    const htmlData = editor.getData();
    console.log('=== HTML OUTPUT TEST ===');
    console.log('Full HTML:', htmlData);
    
    // Parse HTML để kiểm tra từng img
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlData, 'text/html');
    const images = doc.querySelectorAll('img');
    
    console.log(`Found ${images.length} images in HTML output:`);
    images.forEach((img, index) => {
      console.log(`Image ${index + 1}:`, {
        src: img.src,
        width: img.getAttribute('width'),
        height: img.getAttribute('height'),
        style: img.getAttribute('style'),
        'data-position': img.getAttribute('data-position')
      });
    });
    console.log('========================');
    return htmlData;
  };

  // Force Setup Function - để user có thể gọi manual
  const forceSetupHandles = () => {
    console.log('🔧 Force setup handles triggered...');
    
    // Clear tất cả data attributes và recreate
    const allWidgets = document.querySelectorAll('.ck-widget.image, .ck-widget.image-inline');
    allWidgets.forEach(widget => {
      const htmlWidget = widget as HTMLElement;
      htmlWidget.removeAttribute('data-custom-handles');
      
      // Remove existing handles
      const existingHandles = htmlWidget.querySelectorAll('.ck-custom-edge-handle, .ck-corner-handle, .ck-drag-handle');
      existingHandles.forEach(handle => handle.remove());
    });
    
    // Force recreate
    setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 50);
    setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 200);
    setTimeout(() => setupCustomHandles(createEdgeHandles, hideNativeCKEditorHandles), 500);
    
    console.log('🔧 Force setup completed');
  };

  // Expose functions ra window để debug
  // @ts-ignore
  window.debugCKEditorHandles = debugHandles;
  // @ts-ignore
  window.testCKEditorHTMLOutput = testHTMLOutput;
  // @ts-ignore
  window.forceSetupHandles = forceSetupHandles;
  
  console.log('🎯 Debug functions ready: debugCKEditorHandles, testCKEditorHTMLOutput, forceSetupHandles');
}

module.exports = { initializePlugin };

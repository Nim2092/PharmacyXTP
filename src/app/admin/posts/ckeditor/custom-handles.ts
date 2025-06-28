// Custom Edge Handles Plugin cho CKEditor với 9 handles + drag & drop - COMPLETE VERSION
import { Plugin } from '@ckeditor/ckeditor5-core';

// Plugin class để CKEditor 5 có thể load được
export class CustomEdgeHandlesPlugin extends Plugin {
  static get pluginName() {
    return 'CustomEdgeHandlesPlugin';
  }

  constructor(editor: any) {
    super(editor);
    this.init();
  }

  init(): void {
    const editor = this.editor;
  let isResizing = false;
  let isDragging = false;
  let resizeData: any = null;
  let dragData: any = null;

  console.log('🚀 CustomEdgeHandlesPlugin initialized');

  // === HANDLE CREATION FUNCTIONS ===
  
  // Tạo custom handles: 4 góc + 4 cạnh + 1 drag handle
  function createEdgeHandles(widget: HTMLElement) {
    // Kiểm tra widget có hợp lệ không
    if (!widget || !widget.isConnected) {
      return;
    }
    
    console.log('🛠️ Creating edge handles for widget');
    
    // Xóa handles cũ nếu có
    const existingHandles = widget.querySelectorAll('.ck-custom-edge-handle, .ck-drag-handle, .ck-corner-handle');
    existingHandles.forEach(handle => handle.remove());
    
    // Find the resizer wrapper
    let resizerWrapper = widget.querySelector('.ck-widget__resizer') as HTMLElement;
    if (!resizerWrapper) {
      resizerWrapper = document.createElement('div');
      resizerWrapper.className = 'ck-widget__resizer';
      resizerWrapper.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      `;
      widget.appendChild(resizerWrapper);
    }
    
    // DRAG HANDLE (tím) - để di chuyển ảnh
    const dragHandle = document.createElement('div');
    dragHandle.className = 'ck-drag-handle ck-widget__resizer__handle';
    dragHandle.innerHTML = '⋮⋮';
    dragHandle.title = 'Kéo để di chuyển ảnh';
    dragHandle.style.cssText = `
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 16px;
      background: linear-gradient(135deg, #6c5ce7, #a29bfe);
      border: 2px solid #fff;
      border-radius: 8px;
      cursor: move;
      z-index: 999999;
      box-shadow: 0 2px 8px rgba(108, 92, 231, 0.4);
      pointer-events: auto;
      display: flex !important;
      align-items: center;
      justify-content: center;
      opacity: 1 !important;
      font-size: 8px;
      color: white;
      font-weight: bold;
      line-height: 1;
    `;
    
    // Event listener cho drag handle
    dragHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      startImageDrag(e, widget);
    });
    
    // 4 CORNER HANDLES
    const corners = [
      { name: 'top-left', position: 'top: -6px; left: -6px;', cursor: 'nw-resize' },
      { name: 'top-right', position: 'top: -6px; right: -6px;', cursor: 'ne-resize' },
      { name: 'bottom-left', position: 'bottom: -6px; left: -6px;', cursor: 'sw-resize' },
      { name: 'bottom-right', position: 'bottom: -6px; right: -6px;', cursor: 'se-resize' }
    ];
    
    const cornerHandles: HTMLElement[] = [];
    corners.forEach(corner => {
      const handle = document.createElement('div');
      handle.className = `ck-corner-handle ck-corner-handle-${corner.name} ck-widget__resizer__handle`;
      handle.style.cssText = `
        position: absolute;
        ${corner.position}
        width: 12px;
        height: 12px;
        background: linear-gradient(135deg, #00cec9, #55efc4);
        border: 2px solid #fff;
        border-radius: 3px;
        cursor: ${corner.cursor};
        z-index: 999999;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        pointer-events: auto;
        display: block !important;
        opacity: 1 !important;
      `;
      
      // Event listener cho corner handle
      handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        startEdgeResize(e, corner.name, widget);
      });
      
      cornerHandles.push(handle);
    });
    
    // 4 EDGE HANDLES
    const leftHandle = document.createElement('div');
    leftHandle.className = 'ck-custom-edge-handle ck-custom-edge-handle-left ck-widget__resizer__handle';
    leftHandle.style.cssText = `
      position: absolute;
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 14px;
      height: 28px;
      background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
      border: 2px solid #fff;
      border-radius: 6px;
      cursor: w-resize;
      z-index: 999999;
      box-shadow: 0 3px 10px rgba(0,0,0,0.4);
      pointer-events: auto;
      display: block !important;
      opacity: 1 !important;
    `;
    leftHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      startEdgeResize(e, 'left', widget);
    });

    const rightHandle = document.createElement('div');
    rightHandle.className = 'ck-custom-edge-handle ck-custom-edge-handle-right ck-widget__resizer__handle';
    rightHandle.style.cssText = `
      position: absolute;
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 14px;
      height: 28px;
      background: linear-gradient(135deg, #4ecdc4, #6ee8e0);
      border: 2px solid #fff;
      border-radius: 6px;
      cursor: e-resize;
      z-index: 999999;
      box-shadow: 0 3px 10px rgba(0,0,0,0.4);
      pointer-events: auto;
      display: block !important;
      opacity: 1 !important;
    `;
    rightHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      startEdgeResize(e, 'right', widget);
    });

    const topHandle = document.createElement('div');
    topHandle.className = 'ck-custom-edge-handle ck-custom-edge-handle-top ck-widget__resizer__handle';
    topHandle.style.cssText = `
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 28px;
      height: 14px;
      background: linear-gradient(135deg, #fd79a8, #fdcb6e);
      border: 2px solid #fff;
      border-radius: 6px;
      cursor: n-resize;
      z-index: 999999;
      box-shadow: 0 3px 10px rgba(0,0,0,0.4);
      pointer-events: auto;
      display: block !important;
      opacity: 1 !important;
    `;
    topHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      startEdgeResize(e, 'top', widget);
    });

    const bottomHandle = document.createElement('div');
    bottomHandle.className = 'ck-custom-edge-handle ck-custom-edge-handle-bottom ck-widget__resizer__handle';
    bottomHandle.style.cssText = `
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 28px;
      height: 14px;
      background: linear-gradient(135deg, #a29bfe, #74b9ff);
      border: 2px solid #fff;
      border-radius: 6px;
      cursor: s-resize;
      z-index: 999999;
      box-shadow: 0 3px 10px rgba(0,0,0,0.4);
      pointer-events: auto;
      display: block !important;
      opacity: 1 !important;
    `;
    bottomHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      startEdgeResize(e, 'bottom', widget);
    });
    
    // Append all handles to resizer
    resizerWrapper.appendChild(dragHandle);
    cornerHandles.forEach(handle => resizerWrapper.appendChild(handle));
    resizerWrapper.appendChild(leftHandle);
    resizerWrapper.appendChild(rightHandle);
    resizerWrapper.appendChild(topHandle);
    resizerWrapper.appendChild(bottomHandle);
    
    // Mark widget as having custom handles
    widget.setAttribute('data-custom-handles', 'true');
    
    // Hide native CKEditor handles
    hideNativeCKEditorHandles(widget);
    
    console.log('✅ Created 9 custom handles (1 drag + 4 corners + 4 edges)');
  }

  // === DRAG & DROP FUNCTIONS ===
  
  function startImageDrag(e: MouseEvent, widget: HTMLElement) {
    e.preventDefault();
    e.stopPropagation();
    
    const img = widget.querySelector('img') as HTMLImageElement;
    if (!img) return;

    isDragging = true;
    dragData = {
      startX: e.clientX,
      startY: e.clientY,
      img,
      widget,
      initialLeft: widget.offsetLeft,
      initialTop: widget.offsetTop
    };

    document.addEventListener('mousemove', handleImageDrag);
    document.addEventListener('mouseup', stopImageDrag);
    document.body.style.cursor = 'move';
    document.body.style.userSelect = 'none';
    
    // Visual feedback
    widget.style.opacity = '0.8';
    widget.style.zIndex = '10000';
    
    console.log('🎯 Started dragging image');
  }

  function handleImageDrag(e: MouseEvent) {
    if (!isDragging || !dragData) return;

    const { startX, startY, widget } = dragData;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    // Move widget
    widget.style.position = 'relative';
    widget.style.left = deltaX + 'px';
    widget.style.top = deltaY + 'px';
    widget.style.transform = 'none';
  }

  function stopImageDrag() {
    if (isDragging && dragData) {
      const { widget } = dragData;
      
      // Restore visual state
      widget.style.opacity = '1';
      widget.style.zIndex = 'auto';
      
      // Save position to CKEditor model
      const finalLeft = widget.style.left;
      const finalTop = widget.style.top;
      
      setTimeout(() => {
        const img = widget.querySelector('img');
        if (img) {
          const positionStyle = `position: relative; left: ${finalLeft}; top: ${finalTop};`;
          const existingStyle = img.getAttribute('style') || '';
          const newStyle = existingStyle + '; ' + positionStyle;
          img.setAttribute('style', newStyle);
        }
        editor.fire('change:data');
        console.log('✅ Drag position saved:', { left: finalLeft, top: finalTop });
      }, 100);
    }
    
    isDragging = false;
    dragData = null;
    document.removeEventListener('mousemove', handleImageDrag);
    document.removeEventListener('mouseup', stopImageDrag);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }

  // === RESIZE FUNCTIONS ===
  
  function startEdgeResize(e: MouseEvent, position: string, widget: HTMLElement) {
    e.preventDefault();
    e.stopPropagation();
    
    const img = widget.querySelector('img') as HTMLImageElement;
    if (!img) return;

    isResizing = true;
    resizeData = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: img.offsetWidth,
      startHeight: img.offsetHeight,
      aspectRatio: img.offsetWidth / img.offsetHeight,
      position,
      img,
      widget
    };

    document.addEventListener('mousemove', handleEdgeResize);
    document.addEventListener('mouseup', stopEdgeResize);
    document.body.style.cursor = getCursor(position);
    document.body.style.userSelect = 'none';
    
    console.log('🎯 Started resizing from:', position);
  }

  function handleEdgeResize(e: MouseEvent) {
    if (!isResizing || !resizeData) return;

    const { startX, startY, startWidth, startHeight, aspectRatio, position, img, widget } = resizeData;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    let newWidth = startWidth;
    let newHeight = startHeight;
    const maintainAspectRatio = e.shiftKey;

    switch (position) {
      case 'left':
        newWidth = Math.max(50, startWidth - deltaX);
        if (maintainAspectRatio) {
          newHeight = newWidth / aspectRatio;
        }
        break;
      case 'right':
        newWidth = Math.max(50, startWidth + deltaX);
        if (maintainAspectRatio) {
          newHeight = newWidth / aspectRatio;
        }
        break;
      case 'top':
        newHeight = Math.max(50, startHeight - deltaY);
        if (maintainAspectRatio) {
          newWidth = newHeight * aspectRatio;
        }
        break;
      case 'bottom':
        newHeight = Math.max(50, startHeight + deltaY);
        if (maintainAspectRatio) {
          newWidth = newHeight * aspectRatio;
        }
        break;
      case 'top-left':
        newWidth = Math.max(50, startWidth - deltaX);
        newHeight = Math.max(50, startHeight - deltaY);
        if (maintainAspectRatio) {
          const scale = Math.min(newWidth / startWidth, newHeight / startHeight);
          newWidth = startWidth * scale;
          newHeight = startHeight * scale;
        }
        break;
      case 'top-right':
        newWidth = Math.max(50, startWidth + deltaX);
        newHeight = Math.max(50, startHeight - deltaY);
        if (maintainAspectRatio) {
          const scale = Math.min(newWidth / startWidth, newHeight / startHeight);
          newWidth = startWidth * scale;
          newHeight = startHeight * scale;
        }
        break;
      case 'bottom-left':
        newWidth = Math.max(50, startWidth - deltaX);
        newHeight = Math.max(50, startHeight + deltaY);
        if (maintainAspectRatio) {
          const scale = Math.min(newWidth / startWidth, newHeight / startHeight);
          newWidth = startWidth * scale;
          newHeight = startHeight * scale;
        }
        break;
      case 'bottom-right':
        newWidth = Math.max(50, startWidth + deltaX);
        newHeight = Math.max(50, startHeight + deltaY);
        if (maintainAspectRatio) {
          const scale = Math.min(newWidth / startWidth, newHeight / startHeight);
          newWidth = startWidth * scale;
          newHeight = startHeight * scale;
        }
        break;
    }

    // Apply new size
    img.style.width = newWidth + 'px';
    img.style.height = newHeight + 'px';
    img.style.transition = 'none';
    
    widget.style.width = newWidth + 'px';
    widget.style.height = newHeight + 'px';
  }

  function stopEdgeResize() {
    if (isResizing && resizeData) {
      const { img, widget } = resizeData;
      
      img.style.transition = '';
      
      const finalWidth = img.offsetWidth;
      const finalHeight = img.offsetHeight;
      
      // Save to attributes and CKEditor model
      img.setAttribute('width', finalWidth.toString());
      img.setAttribute('height', finalHeight.toString());
      
      const styleString = `width: ${finalWidth}px; height: ${finalHeight}px;`;
      img.setAttribute('style', styleString);
      
      setTimeout(() => {
        editor.model.change((writer: any) => {
          const selection = editor.model.document.selection;
          const selectedElement = selection.getSelectedElement();
          if (selectedElement && (selectedElement.name === 'imageBlock' || selectedElement.name === 'imageInline')) {
            writer.setAttribute('width', finalWidth.toString(), selectedElement);
            writer.setAttribute('height', finalHeight.toString(), selectedElement);
            writer.setAttribute('style', styleString, selectedElement);
          }
        });
        editor.fire('change:data');
        console.log('✅ Resize saved:', { width: finalWidth, height: finalHeight });
        
        // Re-hide native handles
        setTimeout(() => {
          if (widget && widget.getAttribute('data-custom-handles') === 'true') {
            hideNativeCKEditorHandles(widget);
          }
        }, 200);
      }, 100);
    }
    
    isResizing = false;
    resizeData = null;
    document.removeEventListener('mousemove', handleEdgeResize);
    document.removeEventListener('mouseup', stopEdgeResize);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }

  // === HELPER FUNCTIONS ===
  
  function getCursor(position: string): string {
    const cursors: { [key: string]: string } = {
      'left': 'w-resize',
      'right': 'e-resize', 
      'top': 'n-resize',
      'bottom': 's-resize',
      'top-left': 'nw-resize',
      'top-right': 'ne-resize',
      'bottom-left': 'sw-resize',
      'bottom-right': 'se-resize'
    };
    return cursors[position] || 'default';
  }

  function hideNativeCKEditorHandles(widget: HTMLElement) {
    try {
      // Hide native handles
      const nativeHandles = widget.querySelectorAll('.ck-widget__resizer__handle:not(.ck-custom-edge-handle):not(.ck-corner-handle):not(.ck-drag-handle)');
      nativeHandles.forEach((handle) => {
        const htmlHandle = handle as HTMLElement;
        htmlHandle.style.display = 'none !important';
        htmlHandle.style.visibility = 'hidden !important';
        htmlHandle.style.opacity = '0 !important';
        htmlHandle.style.pointerEvents = 'none !important';
      });
      
      // Add global CSS to hide native handles
      const styleId = 'custom-hide-native-handles';
      let existingStyle = document.getElementById(styleId);
      if (!existingStyle) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          .ck-widget[data-custom-handles="true"] .ck-widget__resizer__handle:not(.ck-custom-edge-handle):not(.ck-corner-handle):not(.ck-drag-handle) {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
          .ck-custom-edge-handle, .ck-corner-handle, .ck-drag-handle {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            pointer-events: auto !important;
            z-index: 999999 !important;
            position: absolute !important;
          }
        `;
        document.head.appendChild(style);
      }
      
      console.log('🚫 Native CKEditor handles hidden');
    } catch (error) {
      console.error('❌ Error hiding native handles:', error);
    }
  }

  // === PLUGIN INITIALIZATION ===
  
  // Listen for widget focus/selection events
  editor.editing.view.document.on('selectionChange', () => {
    const selection = editor.model.document.selection;
    const selectedElement = selection.getSelectedElement();
    
    if (selectedElement && (selectedElement.name === 'imageBlock' || selectedElement.name === 'imageInline')) {
      // Image is selected, create custom handles
      setTimeout(() => {
        const widgets = document.querySelectorAll('.ck-widget');
        widgets.forEach((widget: Element) => {
          const htmlWidget = widget as HTMLElement;
          const img = htmlWidget.querySelector('img');
          if (img && htmlWidget.contains(document.querySelector('.ck-widget_selected') as Node)) {
            createEdgeHandles(htmlWidget);
          }
        });
      }, 50);
    }
  });

  // Listen for image uploads
  editor.model.document.on('change:data', () => {
    setTimeout(() => {
      const widgets = document.querySelectorAll('.ck-widget img');
      widgets.forEach((img: Element) => {
        const widget = (img as HTMLElement).closest('.ck-widget') as HTMLElement;
        if (widget && !widget.getAttribute('data-custom-handles')) {
          // New image, setup handles when selected
          widget.addEventListener('click', () => {
            setTimeout(() => createEdgeHandles(widget), 50);
          });
        }
      });
    }, 500);
  });

  // === GLOBAL DEBUG FUNCTIONS ===
  
  // Expose debug functions globally
  (window as any).debugCKEditorHandles = function() {
    const widgets = document.querySelectorAll('.ck-widget');
    console.log('🔍 Debug CKEditor Handles:');
    console.log('Total widgets:', widgets.length);
    
    widgets.forEach((widget, index) => {
      const customHandles = widget.querySelectorAll('.ck-custom-edge-handle, .ck-corner-handle, .ck-drag-handle');
      const nativeHandles = widget.querySelectorAll('.ck-widget__resizer__handle:not(.ck-custom-edge-handle):not(.ck-corner-handle):not(.ck-drag-handle)');
      
      console.log(`Widget ${index}:`, {
        hasCustomHandles: widget.getAttribute('data-custom-handles'),
        customHandlesCount: customHandles.length,
        nativeHandlesCount: nativeHandles.length,
        img: widget.querySelector('img')?.src
      });
    });
  };

  (window as any).forceCreateHandlesOnWidget = function(index: number = 0) {
    const widgets = document.querySelectorAll('.ck-widget');
    if (widgets[index]) {
      createEdgeHandles(widgets[index] as HTMLElement);
      console.log(`✅ Force created handles on widget ${index}`);
    } else {
      console.log(`❌ Widget ${index} not found`);
    }
  };

  (window as any).testCKEditorHTMLOutput = function() {
    const content = editor.getData();
    console.log('📄 CKEditor HTML Output:');
    console.log(content);
    return content;
  };

  console.log('✅ CustomEdgeHandlesPlugin ready! Debug functions available:');
  console.log('- debugCKEditorHandles()');
  console.log('- forceCreateHandlesOnWidget(index)');
  console.log('- testCKEditorHTMLOutput()');
  }
}

// Handle Creation Logic - Tạo 9 handles cho image widgets
export function createEdgeHandles(widget: HTMLElement, callbacks: any) {
  // Kiểm tra widget có hợp lệ không
  if (!widget || !widget.isConnected) {
    return;
  }
  
  // Xóa handles cũ nếu có
  const existingHandles = widget.querySelectorAll('.ck-custom-edge-handle, .ck-drag-handle, .ck-corner-handle');
  existingHandles.forEach(handle => handle.remove());
  
  try {
    // Find the resizer wrapper (CKEditor's official place for handles)
    let resizerWrapper = widget.querySelector('.ck-widget__resizer') as HTMLElement;
    if (!resizerWrapper) {
      // Create resizer wrapper nếu chưa có
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
      console.log('Created resizer wrapper');
    }
    
    // *** FIX: Hide native CKEditor resize handles to avoid conflicts ***
    const nativeHandles = widget.querySelectorAll('.ck-widget__resizer__handle');
    nativeHandles.forEach((handle: Element) => {
      (handle as HTMLElement).style.display = 'none';
    });
    console.log(`Hidden ${nativeHandles.length} native CKEditor handles`);
    
    // === CREATE HANDLES IN RESIZER WRAPPER ===
    
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
    
    // 4 CORNER HANDLES (4 góc)
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
        callbacks.startEdgeResize(e, corner.name, widget);
      });
      
      cornerHandles.push(handle);
    });
    
    console.log(`Creating ${corners.length} corner handles in resizer...`);
    
    // 4 EDGE HANDLES (trái/phải/trên/dưới)
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
    
    // === EVENT LISTENERS ===
    
    // Drag handle
    dragHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      callbacks.startImageDrag(e, widget);
    });
    
    // Edge handles với DEBUG để check event listeners
    leftHandle.addEventListener('mousedown', (e) => {
      console.log('🔍 LEFT handle clicked');
      e.preventDefault();
      e.stopPropagation();
      callbacks.startEdgeResize(e, 'left', widget);
    });
    
    rightHandle.addEventListener('mousedown', (e) => {
      console.log('🔍 RIGHT handle clicked');
      e.preventDefault();
      e.stopPropagation();
      callbacks.startEdgeResize(e, 'right', widget);
    });

    topHandle.addEventListener('mousedown', (e) => {
      console.log('🔍 TOP handle clicked');
      e.preventDefault();
      e.stopPropagation();
      callbacks.startEdgeResize(e, 'top', widget);
    });

    bottomHandle.addEventListener('mousedown', (e) => {
      console.log('🔍 BOTTOM handle clicked');
      e.preventDefault();
      e.stopPropagation();
      callbacks.startEdgeResize(e, 'bottom', widget);
    });
    
    // === HOVER EFFECTS ===
    const allHandles = [dragHandle, leftHandle, rightHandle, topHandle, bottomHandle, ...cornerHandles];
    allHandles.forEach(handle => {
      handle.addEventListener('mouseenter', () => {
        if (handle.className.includes('drag')) {
          handle.style.transform = 'translateX(-50%) scale(1.2)';
        } else if (handle.className.includes('corner')) {
          handle.style.transform = 'scale(1.3)';
        } else if (handle.className.includes('top') || handle.className.includes('bottom')) {
          handle.style.transform = 'translateX(-50%) scale(1.2)';
        } else {
          handle.style.transform = 'translateY(-50%) scale(1.2)';
        }
        handle.style.transition = 'transform 0.2s ease';
      });
      
      handle.addEventListener('mouseleave', () => {
        if (handle.className.includes('drag')) {
          handle.style.transform = 'translateX(-50%) scale(1)';
        } else if (handle.className.includes('corner')) {
          handle.style.transform = 'scale(1)';
        } else if (handle.className.includes('top') || handle.className.includes('bottom')) {
          handle.style.transform = 'translateX(-50%) scale(1)';
        } else {
          handle.style.transform = 'translateY(-50%) scale(1)';
        }
      });
    });
    
    // === APPEND TO RESIZER WRAPPER (CKEditor-safe) ===
    const handleList = [
      { element: dragHandle, name: 'drag' },
      { element: leftHandle, name: 'left' },
      { element: rightHandle, name: 'right' },
      { element: topHandle, name: 'top' },
      { element: bottomHandle, name: 'bottom' },
      ...cornerHandles.map((handle, index) => ({ element: handle, name: `corner-${index}` }))
    ];
    
    let appendSuccessCount = 0;
    
    handleList.forEach((handleInfo) => {
      try {
        // Append to resizer wrapper
        resizerWrapper.appendChild(handleInfo.element);
        
        // Post-append check
        const postInResizer = resizerWrapper.contains(handleInfo.element);
        const postInDOM = document.contains(handleInfo.element);
        
        if (postInResizer && postInDOM) {
          appendSuccessCount++;
        }
        
      } catch (error) {
        console.error(`❌ Error appending ${handleInfo.name} handle to resizer:`, error);
      }
    });
    
    // Mark widget as having custom handles
    widget.setAttribute('data-custom-handles', 'true');
    (widget as any).hasCustomHandles = true;
    
    // === FORCE HIDE NATIVE CKEDITOR HANDLES IMMEDIATELY ===
    callbacks.hideNativeCKEditorHandles(widget);
    
    // Verify immediately
    const immediateHandles = widget.querySelectorAll('.ck-custom-edge-handle, .ck-corner-handle, .ck-drag-handle');
    const resizerHandles = resizerWrapper.querySelectorAll('.ck-custom-edge-handle, .ck-corner-handle, .ck-drag-handle');
    
    // Success feedback - chỉ log khi thành công
    if (immediateHandles.length === 9 || resizerHandles.length === 9) {
      console.log(`✅ Custom handles created: ${Math.max(immediateHandles.length, resizerHandles.length)}/9`);
    }
    
    // Delayed verification and re-hide native handles
    setTimeout(() => {
      const delayedHandles = widget.querySelectorAll('.ck-custom-edge-handle, .ck-corner-handle, .ck-drag-handle');
      const delayedResizerHandles = resizerWrapper?.querySelectorAll('.ck-custom-edge-handle, .ck-corner-handle, .ck-drag-handle');
      
      // Re-hide native handles after delay
      callbacks.hideNativeCKEditorHandles(widget);
      
      // Chỉ log nếu có vấn đề
      if (delayedHandles.length === 0 && delayedResizerHandles && delayedResizerHandles.length === 0) {
        console.error('🚨 CRITICAL: All handles disappeared from both widget AND resizer!');
      }
    }, 200);
    
  } catch (error) {
    console.error('❌ Error in createEdgeHandles:', error);
    throw error;
  }
}

module.exports = { createEdgeHandles };

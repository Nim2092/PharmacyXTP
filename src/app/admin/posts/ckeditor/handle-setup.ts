// Handle Setup Logic - Quản lý việc setup handles cho tất cả image widgets
export function setupCustomHandles(createEdgeHandles: any, hideNativeCKEditorHandles: any) {
  console.log('🔧 setupCustomHandles called - DETAILED DEBUG');
  
  const imageWidgets = document.querySelectorAll('.ck-widget.image, .ck-widget.image-inline');
  console.log(`Found ${imageWidgets.length} image widgets`);
  
  if (imageWidgets.length === 0) {
    console.log('No image widgets found, checking for other selectors...');
    
    // Try alternative selectors
    const alternativeImages = document.querySelectorAll('.ck-widget[data-widget="image"], figure.image, .ck-widget img');
    console.log(`Alternative selectors found: ${alternativeImages.length} elements`);
    
    if (alternativeImages.length === 0) {
      return;
    }
  }
  
  let newHandlesAdded = 0;
  let errors: string[] = [];
  
  imageWidgets.forEach((widget: Element, index: number) => {
    const htmlWidget = widget as HTMLElement;
    
    console.log(`Processing widget ${index + 1}:`, {
      tagName: htmlWidget.tagName,
      className: htmlWidget.className,
      hasImage: !!htmlWidget.querySelector('img'),
      widgetRect: htmlWidget.getBoundingClientRect(),
      isVisible: htmlWidget.offsetWidth > 0 && htmlWidget.offsetHeight > 0
    });
    
    // Force remove data attribute và recreate handles mỗi lần
    const existingHandles = htmlWidget.querySelectorAll('.ck-custom-edge-handle, .ck-corner-handle, .ck-drag-handle');
    console.log(`Widget ${index + 1}: ${existingHandles.length} existing handles`);
    
    if (existingHandles.length < 9) {
      try {
        // Force remove existing handles
        existingHandles.forEach(handle => handle.remove());
        
        // Remove data attribute
        htmlWidget.removeAttribute('data-custom-handles');
        
        console.log(`Creating handles for widget ${index + 1}...`);
        
        // Force create handles
        htmlWidget.setAttribute('data-custom-handles', 'true');
        createEdgeHandles(htmlWidget, { hideNativeCKEditorHandles });
        newHandlesAdded++;
        
        // Immediate verification
        const newHandles = htmlWidget.querySelectorAll('.ck-custom-edge-handle, .ck-corner-handle, .ck-drag-handle');
        console.log(`Widget ${index + 1}: Created ${newHandles.length}/9 handles`);
        
        if (newHandles.length < 9) {
          errors.push(`Widget ${index + 1}: Only ${newHandles.length}/9 handles created`);
        }
        
      } catch (error) {
        console.error(`Error creating handles for widget ${index + 1}:`, error);
        errors.push(`Widget ${index + 1}: Error - ${error}`);
      }
    } else {
      console.log(`Widget ${index + 1}: Already has ${existingHandles.length} handles`);
    }
  });
  
  // Final verification and reporting
  const totalHandles = document.querySelectorAll('.ck-custom-edge-handle, .ck-corner-handle, .ck-drag-handle').length;
  const expectedHandles = imageWidgets.length * 9;
  
  console.log('=== SETUP COMPLETE ===');
  console.log(`✅ Added handles for ${newHandlesAdded} image(s)`);
  console.log(`📊 Total handles: ${totalHandles}/${expectedHandles} (${imageWidgets.length} images)`);
  
  if (errors.length > 0) {
    console.warn('⚠️ Errors during setup:', errors);
  }
  
  if (imageWidgets.length > 0 && totalHandles === 0) {
    console.error('❌ CRITICAL: No handles created despite images being present!');
    console.log('🔍 Debug info available');
    
    // Try manual handle creation as last resort
    console.log('🔧 Attempting manual handle creation...');
    imageWidgets.forEach((widget, index) => {
      const htmlWidget = widget as HTMLElement;
      console.log(`Manual creation for widget ${index + 1}...`);
      try {
        createEdgeHandles(htmlWidget, { hideNativeCKEditorHandles });
        const manualHandles = htmlWidget.querySelectorAll('.ck-custom-edge-handle, .ck-corner-handle, .ck-drag-handle');
        console.log(`Manual creation result: ${manualHandles.length} handles`);
      } catch (error) {
        console.error(`Manual creation failed for widget ${index + 1}:`, error);
      }
    });
  }
}

module.exports = { setupCustomHandles };

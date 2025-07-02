// CKEditor Modules Index - Client-side safe exports
export { editorConfig } from './config';
export { MyUploadAdapter, MyCustomUploadAdapterPlugin } from './upload-adapter';
export { setupGlobalDebugFunctions } from './debug-utils';

// Dynamic imports cho client-side only
export const loadCustomHandles = () => import('./custom-handles').then(mod => mod.initializeCustomHandles);
export const loadDebugger = () => import('./debug-utils').then(mod => mod.CKEditorDebugger);

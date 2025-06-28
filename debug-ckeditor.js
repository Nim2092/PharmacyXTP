// Debug CKEditor plugins
// Tạo file test để kiểm tra plugins có sẵn trong CKEditor Classic

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

console.log('=== CKEditor Classic Build Analysis ===');

ClassicEditor.create(document.createElement('div'))
    .then(editor => {
        console.log('Available plugins:');

        // Liệt kê tất cả plugins
        for (const pluginName of editor.plugins) {
            console.log(`- ${pluginName.constructor.name}`);
        }

        // Kiểm tra các plugins quan trọng
        const importantPlugins = [
            'Alignment',
            'ImageResize',
            'ImageToolbar',
            'ImageUpload',
            'FontColor',
            'FontSize'
        ];

        console.log('\n=== Checking Important Plugins ===');
        importantPlugins.forEach(pluginName => {
            const hasPlugin = editor.plugins.has(pluginName);
            console.log(`${pluginName}: ${hasPlugin ? '✅' : '❌'}`);
        });

        editor.destroy();
    })
    .catch(err => {
        console.error('Error creating editor:', err);
    });

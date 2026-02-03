// Modern Dark Theme Configuration
const darkTheme = {
    'common.bi.image': '', // No watermark
    'common.bisize.width': '0px',
    'common.bisize.height': '0px',
    'common.backgroundColor': '#020617', // Deep dark matches CSS

    // Header
    'header.display': 'none', // We use our own custom header

    // Icons
    'menu.normalIcon.color': '#94a3b8',
    'menu.activeIcon.color': '#6366f1',
    'menu.disabledIcon.color': '#334155',
    'menu.hoverIcon.color': '#f8fafc',
    'menu.iconSize.width': '24px',
    'menu.iconSize.height': '24px',

    // Submenu / Panels
    'submenu.backgroundColor': '#1e293b',
    'submenu.partition.color': '#334155',
    'submenu.normalIcon.color': '#94a3b8',
    'submenu.activeIcon.color': '#06b6d4',
    'submenu.normalLabel.color': '#f8fafc',
    'submenu.activeLabel.color': '#fff',

    // Range Sliders
    'range.pointer.color': '#6366f1',
    'range.bar.color': '#475569',
    'range.subbar.color': '#6366f1',
    'range.value.color': '#f8fafc',
    'range.value.backgroundColor': '#1e293b',
    'range.title.color': '#f8fafc',
};

// Initialize Editor with Full Features
const imageEditor = new tui.ImageEditor('#tui-image-editor-container', {
    includeUI: {
        loadImage: {
            path: 'https://www.imagecompress.in/wp-content/uploads/2025/12/Gemini_Generated_Image_gh4i44gh4i44gh4i-scaled.png',
            name: 'SampleImage'
        },
        theme: darkTheme,
        menuBarPosition: 'bottom', // Dock to bottom like pro apps
        menu: [
            'crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'
        ],
        initMenu: 'filter',
        uiSize: {
            width: '100%',
            height: '100%' // Full height of container
        },
    },
    cssMaxWidth: 1000,
    cssMaxHeight: 800,
    selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70
    }
});

// Resize Observer to keep it responsive
window.addEventListener('resize', () => {
    imageEditor.ui.resizeEditor();
});

// --- Custom Controls Logic ---

// 1. Upload
document.getElementById('upload-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        imageEditor.loadImageFromFile(file).then(() => {
            imageEditor.clearUndoStack();
            console.log('Image Loaded');
        });
    }
});

// 2. Export / Save
// 2. Export / Save
document.getElementById('btn-save').addEventListener('click', () => {
    const btn = document.getElementById('btn-save');
    const originalText = btn.innerText;

    try {
        btn.innerText = '⏳ Processing...';

        const imageName = imageEditor.getImageName() || 'pixelcraft-pro-edit.png';
        const dataURL = imageEditor.toDataURL(); // Default is PNG

        if (!dataURL || dataURL === 'data:,') {
            throw new Error('Canvas is empty or tainted.');
        }

        // Native download method (No FileSaver dependency needed for DataURLs)
        const link = document.createElement('a');
        link.download = imageName;
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        btn.innerText = '✅ Saved!';
    } catch (err) {
        console.error('Export Failed:', err);
        alert('Export failed. Please check console for details. (Note: External images must support CORS)');
        btn.innerText = '❌ Error';
    }

    setTimeout(() => {
        btn.innerText = originalText;
    }, 2000);
});

// 3. Zoom Controls
let zoomLevel = 1.0;
document.getElementById('btn-zoom-in').addEventListener('click', () => {
    zoomLevel = Math.min(zoomLevel + 0.1, 3.0);
    imageEditor._graphics.getCanvas().setZoom(zoomLevel);
});

document.getElementById('btn-zoom-out').addEventListener('click', () => {
    zoomLevel = Math.max(zoomLevel - 0.1, 0.2);
    imageEditor._graphics.getCanvas().setZoom(zoomLevel);
});

// 4. Undo / Redo / Reset
document.getElementById('btn-undo').addEventListener('click', () => {
    imageEditor.undo();
});

document.getElementById('btn-redo').addEventListener('click', () => {
    imageEditor.redo();
});

document.getElementById('btn-reset').addEventListener('click', () => {
    imageEditor.clearObjects();
    imageEditor.discardSelection();
});
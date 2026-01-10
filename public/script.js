// ১. মডার্ন থিম কনফিগারেশন
const modernTheme = {
    'common.bi.image': '',
    'common.bisize.width': '0px',
    'common.bisize.height': '0px',
    'common.backgroundColor': '#0f172a',
    'header.display': 'none',

    'menu.normalIcon.color': '#94a3b8',
    'menu.activeIcon.color': '#6366f1',
    'menu.disabledIcon.color': '#334155',
    'menu.hoverIcon.color': '#f8fafc',
    'menu.main.backgroundColor': '#0f172a',

    'submenu.backgroundColor': '#1e293b',
    'submenu.partition.color': '#334155',
    'submenu.normalIcon.color': '#94a3b8',
    'submenu.activeIcon.color': '#06b6d4',
    'submenu.normalLabel.color': '#94a3b8',
    'submenu.activeLabel.color': '#f8fafc',

    'range.pointer.color': '#06b6d4',
    'range.bar.color': '#334155',
    'range.subbar.color': '#6366f1',
    'range.value.color': '#f8fafc',
    'range.value.backgroundColor': '#334155',
    'range.title.color': '#f8fafc',
};

// ২. এডিটর ইনিশিয়ালাইজেশন
const imageEditor = new tui.ImageEditor('#tui-image-editor-container', {
    includeUI: {
        loadImage: {
            path: 'https://www.imagecompress.in/wp-content/uploads/2025/12/Gemini_Generated_Image_gh4i44gh4i44gh4i-scaled.png',
            name: 'SampleImage'
        },
        theme: modernTheme,
        menuBarPosition: 'left',
        menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'],
        initMenu: 'filter',
        uiSize: {
            width: '100%',
            // ফুটার (40px) + অ্যাড (90px) = 130px বাদ দেওয়া হলো
            height: 'calc(100% - 130px)' 
        },
    },
    cssMaxWidth: 1200,
    cssMaxHeight: 800,
    selectionStyle: { cornerSize: 15, rotatingPointOffset: 70, borderColor: '#6366f1', cornerColor: '#06b6d4' }
});

// ৩. উইন্ডো রিসাইজ হ্যান্ডলিং
window.onresize = function() {
    imageEditor.ui.resizeEditor();
};

// ৪. জুম লজিক
let currentZoom = 1.0;
const zoomText = document.getElementById('zoom-text');

function updateZoom(newZoom) {
    if (newZoom > 3.0) newZoom = 3.0;
    if (newZoom < 0.2) newZoom = 0.2;
    
    currentZoom = newZoom;
    
    const canvas = imageEditor._graphics.getCanvas();
    canvas.zoomToPoint({ 
        x: canvas.getWidth() / 2, 
        y: canvas.getHeight() / 2 
    }, currentZoom);
    
    zoomText.innerText = Math.round(currentZoom * 100) + '%';
}

document.getElementById('btn-zoom-in').addEventListener('click', () => updateZoom(currentZoom + 0.1));
document.getElementById('btn-zoom-out').addEventListener('click', () => updateZoom(currentZoom - 0.1));

// ৫. অপাসিটি কন্ট্রোল
const opacityContainer = document.getElementById('opacity-container');
const opacitySlider = document.getElementById('opacity-slider');
let activeObjectId = null;

imageEditor.on('objectActivated', function(props) {
    activeObjectId = props.id;
    opacityContainer.style.display = 'flex';
    opacitySlider.value = props.opacity !== undefined ? props.opacity : 1;
});

imageEditor.on('selectionCleared', function() {
    activeObjectId = null;
    opacityContainer.style.display = 'none';
});

opacitySlider.addEventListener('input', function() {
    if (activeObjectId) {
        imageEditor.setObjectProperties(activeObjectId, {
            opacity: parseFloat(this.value)
        });
    }
});

// ৬. মেইন আপলোড
document.getElementById('upload-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        imageEditor.loadImageFromFile(file).then(() => {
            imageEditor.clearUndoStack();
            setTimeout(() => { 
                imageEditor.ui.resizeEditor(); 
                updateZoom(1.0); 
            }, 100);
        });
    }
});

// ৭. অ্যাড লেয়ার (Add Image Overlay)
document.getElementById('add-layer-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        imageEditor.addImageObject(imageUrl).then(() => {
            console.log('Layer added');
        });
    }
});

// ৮. এক্সপোর্ট
document.getElementById('btn-save').addEventListener('click', function() {
    const imageName = imageEditor.getImageName();
    const dataURL = imageEditor.toDataURL();
    const link = document.createElement('a');
    link.download = imageName || 'pixelcraft-edit.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
// ... আগের সব কোড ঠিক থাকবে (Image Editor Init, Zoom, etc.) ...

// --- Accordion Logic (Add this at the end) ---
const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    // Toggle active class
    this.classList.toggle("active");

    // Toggle panel visibility
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}
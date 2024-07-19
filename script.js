document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('imageForm');
    const stage = document.getElementById('stage');
    const sizeSlider = document.getElementById('sizeSlider');
    const sizeValue = document.getElementById('sizeValue');
    const toggleButton = document.getElementById('toggleButton');
    const menuButton = document.getElementById('menuButton');
    const imageMenu = document.getElementById('imageMenu');
    let images = [];

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const imageUrl = document.getElementById('imageUrl').value;

        if (!imageUrl) {
            alert('Please enter a valid image URL.');
            return;
        }

        stage.innerHTML = '';

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const size = Math.min(viewportWidth, viewportHeight) * 0.2;
        const centerX = viewportWidth / 2;
        const centerY = viewportHeight / 2;
        const imageRadius = Math.min(viewportWidth, viewportHeight) * 0.3;

        const positions = [
            { left: centerX, top: centerY - imageRadius, rotation: 0 },
            { left: centerX, top: centerY + imageRadius, rotation: 180 },
            { left: centerX - imageRadius, top: centerY, rotation: -90 },
            { left: centerX + imageRadius, top: centerY, rotation: 90 }
        ];

        images = positions.map(pos => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.className = 'image';
            img.style.left = `${pos.left}px`;
            img.style.top = `${pos.top}px`;
            img.style.transform = `translate(-50%, -50%) rotate(${pos.rotation}deg)`;
            img.onload = () => console.log('Image loaded successfully.');
            img.onerror = () => alert('Failed to load the image. Please check the URL and try again.');
            stage.appendChild(img);
            return img;
        });

        updateImageSizes(size);
    });

    sizeSlider.addEventListener('input', (event) => {
        const size = event.target.value;
        sizeValue.textContent = size;
        updateImageSizes(size);
    });

    function updateImageSizes(size) {
        images.forEach(img => {
            img.style.width = `${size}px`;
            img.style.height = `${size}px`;
        });
    }

    toggleButton.addEventListener('click', () => {
        const elementsToToggle = [form, document.getElementById('controls')];
        elementsToToggle.forEach(el => el.classList.toggle('hidden'));
    });

  
  
  //
  
  
  menuButton.addEventListener('click', () => {
        imageMenu.classList.toggle('hidden');
    
    });

  
  
    imageMenu.addEventListener('click', (event) => {
   const url = event.target.getAttribute('data-url');
        if (url) {
            document.getElementById('imageUrl').value = url;
            form.dispatchEvent(new Event('submit'));
            imageMenu.classList.add('hidden');
        }
    });

    window.addEventListener('resize', () => {
        if (form && document.getElementById('imageUrl').value) {
            form.dispatchEvent(new Event('submit'));
        }
    });
});

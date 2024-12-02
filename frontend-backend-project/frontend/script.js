const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const resultDisplay = document.getElementById('result');

uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        resultDisplay.textContent = data.match === 'Matched' ? 'Image Matched!' : 'No Match Found';
    } catch (error) {
        console.error('Error uploading file:', error);
        resultDisplay.textContent = 'Error processing your request.';
    }
});

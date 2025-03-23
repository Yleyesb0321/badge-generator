const canvas = document.getElementById('badgeCanvas');
const ctx = canvas.getContext('2d');
const form = document.getElementById('badgeForm');
const imageFile = document.getElementById('imageFile');
const textInput = document.getElementById('textInput');
const downloadBtn = document.getElementById('downloadBtn');

const badgeImage = new Image();
badgeImage.src = 'badge.jpg';
badgeImage.onload = () => {
    ctx.drawImage(badgeImage, 0, 0, canvas.width, canvas.height);
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const file = imageFile.files[0];
    const text = textInput.value;

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Redraw the badge background
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(badgeImage, 0, 0, canvas.width, canvas.height);

                // Draw the uploaded image as a circle
                const x = 180;
                const y = 45;
                const radius = 100;
                ctx.save();
                ctx.beginPath();
                ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(img, x, y, radius * 2, radius * 2);
                ctx.restore();

                // Draw the white stroke
                ctx.beginPath();
                ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
                ctx.lineWidth = 5;
                ctx.strokeStyle = 'white';
                ctx.stroke();
                ctx.closePath();

                // Draw the text
                ctx.font = '36px Roboto';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.fillText(text, canvas.width / 2, y + radius * 2 + 50);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = 'badge.jpg';
    link.click();
});
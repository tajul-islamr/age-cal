// Background Canvas Animation (e.g., floating bubbles)
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Create Particle Object
class Particle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 105, 180, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Handle Particles
function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

// Create Particles Effect
function createParticles(e) {
    for (let i = 0; i < 3; i++) {
        let size = Math.random() * 5 + 2;
        let x = e.x;
        let y = e.y;
        let speedX = (Math.random() * 3) - 1.5;
        let speedY = (Math.random() * 3) - 1.5;
        particlesArray.push(new Particle(x, y, size, speedX, speedY));
    }
}

// Animate Canvas
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

// Resize Canvas
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', createParticles);
animate();

// Age Calculation with Emojis and Enhanced Outputs
function calculateAge() {
    const name = document.getElementById('name').value.trim();
    const birthdate = document.getElementById('birthdate').value;

    if (!name || !birthdate) {
        alert("Please enter both your name and birth date!");
        return;
    }

    const birthDateObj = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

    const randomMessages = [
        "You're just getting started! 🎉",
        "Age is just a number, and yours looks great! 🌟",
        "Welcome to the best years of your life! 🎈",
        "You're aging like fine wine! 🍷",
        "Young at heart, always! 💖",
        "Wow, looking good for your age! 😎",
        "Keep shining, you ageless star! ✨"
    ];

    const funnyComments = [
        "Time to adult now... or maybe not! 🤷‍♂️",
        "Still time to fulfill your childhood dreams! 🚀",
        "You can totally still eat cake for breakfast! 🍰",
        "Go on, tell someone you’re too young to care! 😜",
        "Don't let the number stop you, keep having fun! 🥳"
    ];

    const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    const funnyComment = funnyComments[Math.floor(Math.random() * funnyComments.length)];

    const resultHTML = `
        <p>Hi <strong>${name}</strong>! You are <strong>${age}</strong> years old. 🎂</p>
        <p>${randomMessage}</p>
        <p>${funnyComment}</p>
    `;

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = resultHTML;

    // Animation for showing the result
    gsap.to(resultElement, { duration: 1, opacity: 1, y: -20, ease: "bounce" });
}

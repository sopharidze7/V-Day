let noCount = 0;
const noTexts = [
    "Are you sure?",
    "Think again...",
    "Don't break my heart..",
    "Do you want me to write a diss on you?",
    "You asked for it."
];

function sendTelegramNotification() {
    const botToken = "7867720629:AAHIGEgTpBpwnvfcA6jhehM4Uxn4-QYCNeM"; 
    const chatID = "376399784"; 
    const message = encodeURIComponent("🚨 He said yes. He couldn't resist");

    fetch(`https://api.telegram.org/bot7867720629:AAHIGEgTpBpwnvfcA6jhehM4Uxn4-QYCNeM/sendMessage?chat_id=${chatID}&text=${message}`)
        .then(() => console.log("Telegram notification sent!"))
        .catch(err => console.error("Telegram notification failed:", err));
}

function yesClicked() {
    document.getElementById("question").style.display = "none";
    document.getElementById("buttons").style.display = "none";
    document.getElementById("stitchImage").style.display = "none"; 
    document.getElementById("celebration").style.display = "block";

    startConfetti();
    sendTelegramNotification();
}

function noClicked() {
    let noBtn = document.getElementById("noBtn");
    let yesBtn = document.getElementById("yesBtn");

    if (noCount < noTexts.length) {
        noBtn.innerText = noTexts[noCount]; 
        noCount++;
    }

    let newSize = 2 + noCount * 3; 
    yesBtn.style.fontSize = `${newSize}rem`;

    if (noCount === noTexts.length) {
        noBtn.id = "finalNoBtn";
        noBtn.innerText = "You asked for it...";
    }
}

function startConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettiPieces = [];

    for (let i = 0; i < 100; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 10 + 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speed: Math.random() * 5 + 2
        });
    }
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach((p) => {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.w, p.h);
            p.y += p.speed;

            if (p.y > canvas.height) {
                p.y = -p.h;
                p.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
}

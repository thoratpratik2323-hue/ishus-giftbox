// ═══════════════════════════════════════
// ISHU'S GIFTBOX — PREMIUM JAVASCRIPT
// ═══════════════════════════════════════

// KEY DATES
const TOGETHER_SINCE = new Date('2025-08-02');
const ANNIVERSARY_MONTH_DAY = { month: 0, day: 26 }; // Jan 26

// ── 1. GIFT BOX OPENING ANIMATION ───────────────
const intro = document.getElementById('gift-intro');
const lid = document.getElementById('gift-lid');
let opened = false;

function startOpenAnimation() {
    if (opened) return; opened = true;
    lid.classList.add('open');
    const emojis = ['✨', '💖', '🌟', '💜', '🎉', '💛', '🌸'];
    const sp = document.getElementById('sparkles');
    emojis.forEach((e, i) => {
        const s = document.createElement('div');
        s.className = 'sparkle'; s.textContent = e;
        s.style.cssText = `--tx:${(Math.random() - 0.5) * 200}px;--ty:${-(50 + Math.random() * 100)}px;animation-delay:${i * 0.08}s;left:${Math.random() * 100}px;`;
        sp.appendChild(s);
    });
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 }, colors: ['#7c3aed', '#e2b96f', '#f9a8d4', '#a78bfa', '#fff'] });
    setTimeout(() => intro.classList.add('fade-out'), 1200);
    setTimeout(() => intro.style.display = 'none', 2000);
}


// ── 3. MUSIC PLAYER (Single Song) ────────────────
const audio = document.getElementById('bg-music');
const playIcon = document.getElementById('play-icon');
const wave = document.getElementById('music-wave');
let playing = false;

function toggleMusic() {
    if (!playing) {
        audio.play().then(() => { playing = true; playIcon.className = 'fas fa-pause'; wave.classList.remove('paused'); }).catch(() => { });
    } else { audio.pause(); playing = false; playIcon.className = 'fas fa-play'; wave.classList.add('paused'); }
}

// ── 4. SURPRISE QUOTES ────────────────────────────
const surprises = [
    { heart: '🙈', q: '"Tumhe pata hai na ki tumhare saath baith ke chup rehna bhi bohot acha lagta hai mujhe?" 🌙' },
    { heart: '🥺', q: '"Jab tum naraz hoti ho na... dil toot jaata hai yaar. Isliye serious fight nahi karunga kabhi." 💔' },
    { heart: '😤', q: '"Tum meri ho. Kisi aur ki nahi. Point." ❤️' },
    { heart: '😵‍💫', q: '"Tumhe dekhta hoon toh dimag kaam karna band kar deta hai... seriously." 🥰' },
    { heart: '💪', q: '"80/80 laana hai tumhe — kyunki tum deserving ho. Main tumhare pe bet lagata hoon." 🎯' },
    { heart: '🌙', q: '"Phone rakhne ke baad bhi tumhare baare mein sochta rehta hoon... neend nahi aati." 💭' },
    { heart: '😅', q: '"Sach bolun? Tumhare liye ye sab websites banana — ye mera love language hai." 💻❤️' },
    { heart: '📞', q: '"Tumhari awaaz sun ke lagta hai sab theek hai duniya mein." 🥰' },
    { heart: '🤝', q: '"Promise — chahe kuch bhi ho jaaye, main tumhare saath hoon. Period." 💕' },
    { heart: '😂', q: '"Tum pagal ho. Par MERI pagal ho. Toh koi problem nahi." 🫶' },
    { heart: '🏠', q: '"Ek din apna ghar hoga. Tum kitchen mein, main coding mein. Phir saath mein chai." ☕' },
    { heart: '💍', q: '"Shaadi hogi. Hum honge. Bas thoda wait karo. Inshallah." 👑' },
];
function showSurprise() {
    const s = surprises[Math.floor(Math.random() * surprises.length)];
    document.getElementById('modal-heart').textContent = s.heart;
    document.getElementById('modal-quote').textContent = s.q;
    document.getElementById('surprise-modal').classList.add('open');
    document.getElementById('modal-overlay').style.display = 'block';
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: ['#f43f5e', '#ec4899', '#e2b96f', '#a78bfa'] });
}
function closeModal() {
    document.getElementById('surprise-modal').classList.remove('open');
    document.getElementById('modal-overlay').style.display = 'none';
}

// ── 5. RELATIONSHIP STATS ─────────────────────────
function updateStats() {
    const now = new Date();
    const diff = now - TOGETHER_SINCE;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    document.getElementById('daysTogether').textContent = days;
    document.getElementById('hoursLove').textContent = hours.toLocaleString();
    document.getElementById('footerDays').textContent = days;

    // Next anniversary (Jan 26)
    let nextAnniv = new Date(now.getFullYear(), ANNIVERSARY_MONTH_DAY.month, ANNIVERSARY_MONTH_DAY.day);
    if (nextAnniv <= now) nextAnniv = new Date(now.getFullYear() + 1, ANNIVERSARY_MONTH_DAY.month, ANNIVERSARY_MONTH_DAY.day);
    const daysToAnniv = Math.ceil((nextAnniv - now) / (1000 * 60 * 60 * 24));
    document.getElementById('nextAnniversary').textContent = daysToAnniv;
}
updateStats();
setInterval(updateStats, 60000);

// ── 6. COUNTDOWN TIMERS ──────────────────────────
function updateCountdowns() {
    const now = new Date();
    const targets = [
        { id: 'shaadiCountdown', date: new Date('2026-03-01') },
        { id: 'birthdayCountdown', date: new Date('2026-08-19') }
    ];
    targets.forEach(t => {
        const el = document.getElementById(t.id);
        if (!el) return;
        const diff = t.date - now;
        if (diff <= 0) { el.textContent = '🎉 UNLOCKED!'; return; }
        const dd = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hh = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mm = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const ss = Math.floor((diff % (1000 * 60)) / 1000);
        el.textContent = `⏰ ${dd}d ${hh}h ${mm}m ${ss}s`;
    });
}
updateCountdowns();
setInterval(updateCountdowns, 1000);

// ── 7. VISIT COUNTER ─────────────────────────────
let visits = parseInt(localStorage.getItem('ishu-giftbox-visits') || '0') + 1;
localStorage.setItem('ishu-giftbox-visits', visits);
document.getElementById('visitCount').textContent = visits;

// ── 8. THEME SWITCHER ────────────────────────────
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const theme = btn.dataset.theme;
        document.body.className = ''; // reset
        if (theme !== 'royal') document.body.classList.add('theme-' + theme);
        localStorage.setItem('ishu-theme', theme);
    });
});
// Load saved theme
const savedTheme = localStorage.getItem('ishu-theme');
if (savedTheme && savedTheme !== 'royal') {
    document.body.classList.add('theme-' + savedTheme);
    document.querySelectorAll('.theme-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.theme === savedTheme);
    });
}

// ── 9. LOVE WHEEL ────────────────────────────────
const wheelPrizes = [
    '💕 Virtual Hug', '📝 Love Poem', '🎬 Date Idea', '💌 Compliment',
    '🌹 Rose for You', '✨ Wish Granted', '🎵 Song Request', '💍 Promise'
];
const wheelColors = ['#7c3aed', '#e11d48', '#0ea5e9', '#f59e0b', '#a855f7', '#ec4899', '#38bdf8', '#e2b96f'];
let wheelSpinning = false;
const canvas = document.getElementById('wheelCanvas');
let ctx;
if (canvas) {
    ctx = canvas.getContext('2d');
    drawWheel(0);
}
function drawWheel(rotation) {
    if (!ctx) return;
    const cx = 150, cy = 150, r = 140;
    ctx.clearRect(0, 0, 300, 300);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rotation);
    const arc = (2 * Math.PI) / wheelPrizes.length;
    wheelPrizes.forEach((p, i) => {
        ctx.beginPath(); ctx.moveTo(0, 0);
        ctx.arc(0, 0, r, i * arc, (i + 1) * arc);
        ctx.fillStyle = wheelColors[i]; ctx.fill();
        ctx.save(); ctx.rotate(i * arc + arc / 2);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 11px Outfit';
        ctx.textAlign = 'right'; ctx.fillText(p, r - 12, 4);
        ctx.restore();
    });
    ctx.beginPath(); ctx.arc(0, 0, 18, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a0533'; ctx.fill();
    ctx.fillStyle = '#e2b96f'; ctx.font = 'bold 12px Outfit';
    ctx.textAlign = 'center'; ctx.fillText('❤️', 0, 5);
    ctx.restore();
}
function spinWheel() {
    if (wheelSpinning) return;
    wheelSpinning = true;
    document.getElementById('spinBtn').disabled = true;
    document.getElementById('wheelResult').textContent = '';
    const spins = 5 + Math.random() * 5;
    const totalAngle = spins * 2 * Math.PI;
    const duration = 4000;
    const start = performance.now();
    function animate(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const angle = totalAngle * ease;
        drawWheel(angle);
        if (progress < 1) requestAnimationFrame(animate);
        else {
            wheelSpinning = false;
            document.getElementById('spinBtn').disabled = false;
            const idx = Math.floor(((angle % (2 * Math.PI)) / (2 * Math.PI)) * wheelPrizes.length);
            const prize = wheelPrizes[(wheelPrizes.length - idx) % wheelPrizes.length];
            document.getElementById('wheelResult').textContent = `You got: ${prize}!`;
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
        }
    }
    requestAnimationFrame(animate);
}
function openWheel() {
    document.getElementById('wheel-modal').classList.add('open');
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('modal-overlay').onclick = closeWheel;
}
function closeWheel() {
    document.getElementById('wheel-modal').classList.remove('open');
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('modal-overlay').onclick = closeModal;
}

// ── 10. SECRET VAULT ─────────────────────────────
const vaultLetters = [
    'Ishu yaar... kabhi kabhi raat ko sochta hoon ki kitna lucky hoon. Duniya mein kitne log hain jinko koi milta hi nahi — aur mujhe tum mili. Sach mein feel hota hai ki bhagwan ne sun li meri. ❤️',
    'Tum jaanti ho na ki jab tumhara message aata hai toh phone uthane mein 1 second nahi lagta? Haan wo main hoon. Thoda desperate lagta hai. Par kya karoon tumse baat karna hi toh sabse acha kaam hai mera. 😂📱',
    'Ek baat bolu? Mujhe lagta tha pyaar filmon mein hota hai. Phir tum aayi. Ab lagta hai filmon mein kam dikhate hain. 🎬😅',
    'Kabhi kabhi bohot dar lagta hai — ki agar tum chali gayi toh? Phir yaad aata hai ki tum bhi pagal ho mere liye. Aur phir sab theek ho jaata hai. 🥺💕',
    'Tumhe pata hai meri sabse badi dream kya hai? Apna ghar. Tumhare saath. Subah chai banana. Raat ko saath baithna. Bus. Itna chahiye mujhe life se. 🏠☕',
    'Ishu — tum sirf meri gf nahi ho. Tum meri bestfriend ho. Meri partner ho. Meri future wife ho. Sab kuch tum ho. Bas tum. 🫶'
];
let currentLetter = 0;
function openVault() {
    document.getElementById('vault-modal').classList.add('open');
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('modal-overlay').onclick = closeVault;
    document.getElementById('vault-lock-screen').style.display = 'block';
    document.getElementById('vault-content').style.display = 'none';
    document.getElementById('vault-password').value = '';
    document.getElementById('vault-error').style.display = 'none';
}
function checkVault() {
    const pw = document.getElementById('vault-password').value.toLowerCase();
    if (pw === '1918') {
        document.getElementById('vault-lock-screen').style.display = 'none';
        document.getElementById('vault-content').style.display = 'block';
        currentLetter = 0;
        document.getElementById('vault-letter-content').textContent = vaultLetters[0];
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.5 }, colors: ['#e2b96f', '#a78bfa'] });
    } else {
        document.getElementById('vault-error').style.display = 'block';
    }
}
function nextLetter() {
    currentLetter = (currentLetter + 1) % vaultLetters.length;
    document.getElementById('vault-letter-content').textContent = vaultLetters[currentLetter];
}
function closeVault() {
    document.getElementById('vault-modal').classList.remove('open');
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('modal-overlay').onclick = closeModal;
}

// ── 11. FLOATING HEARTS ──────────────────────────
const hc = document.getElementById('hearts');
for (let i = 0; i < 18; i++) {
    const h = document.createElement('i');
    h.className = 'fas fa-heart floating-heart';
    h.style.cssText = `left:${Math.random() * 100}%;font-size:${0.6 + Math.random() * 1.2}rem;animation-delay:${Math.random() * 10}s;animation-duration:${8 + Math.random() * 6}s;`;
    hc.appendChild(h);
}

// ── 12. UNLOCK LOCKED CARDS ──────────────────────
document.querySelectorAll('.gift-card.locked').forEach(card => {
    const unlockDate = card.dataset.unlockDate;
    if (unlockDate && new Date() >= new Date(unlockDate)) {
        card.classList.remove('locked');
        card.classList.add('unlocked');
    } else if (unlockDate) {
        const href = card.getAttribute('href');
        card.setAttribute('data-href', href);
        card.removeAttribute('href');
        card.addEventListener('click', e => {
            e.preventDefault();
            card.classList.add('shake');
            setTimeout(() => card.classList.remove('shake'), 400);
            const ud = new Date(unlockDate);
            const fmt = ud.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
            alert(`✨ Sabar ka phal meetha hota hai! ✨\n\nIshu, ye gift ${fmt} ko unlock hoga.\n\nIntezaar rahega! ❤️`);
        });
    }
});

// ── 13. MEMORY VIDEOS PLAY ON HOVER ──────────────
document.querySelectorAll('.video-memory').forEach(card => {
    const video = card.querySelector('video');
    const playBtn = card.querySelector('.memory-play-btn');
    card.addEventListener('mouseenter', () => { if (video) { video.muted = true; video.play().catch(() => { }); } if (playBtn) playBtn.style.opacity = '0'; });
    card.addEventListener('mouseleave', () => { if (video) { video.pause(); video.currentTime = 0; } if (playBtn) playBtn.style.opacity = '1'; });
    card.addEventListener('click', () => {
        if (video) {
            if (video.muted) { video.muted = false; video.play(); }
            else { video.muted = true; }
        }
    });
});

// ── 14. EASTER EGG (Konami Code) ─────────────────
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
document.addEventListener('keydown', e => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            konamiIndex = 0;
            document.getElementById('easter-egg-modal').classList.add('open');
            document.getElementById('modal-overlay').style.display = 'block';
            confetti({ particleCount: 200, spread: 120, origin: { y: 0.4 }, colors: ['#7c3aed', '#e2b96f', '#f9a8d4', '#ec4899', '#fff', '#fbbf24'] });
        }
    } else { konamiIndex = 0; }
});

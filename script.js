document.addEventListener('DOMContentLoaded', () => {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartIcons = ['fa-heart', 'fa-sparkles', 'fa-star', 'fa-cloud'];

    function createHeart() {
        const heart = document.createElement('i');
        const icon = heartIcons[Math.floor(Math.random() * heartIcons.length)];

        heart.classList.add('fas', icon, 'floating-heart');

        // Random properties
        const size = Math.random() * 20 + 10 + 'px';
        const left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 5 + 5 + 's';
        const delay = Math.random() * 5 + 's';

        heart.style.fontSize = size;
        heart.style.left = left;
        heart.style.animationDuration = duration;
        heart.style.animationDelay = delay;
        heart.style.opacity = Math.random() * 0.5 + 0.2;

        heartsContainer.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, (parseFloat(duration) + parseFloat(delay)) * 1000);
    }

    // Create hearts periodically
    setInterval(createHeart, 300);

    // Initial burst
    for (let i = 0; i < 20; i++) {
        createHeart();
    }

    // Date Locking Logic
    const cards = document.querySelectorAll('.gift-card');

    cards.forEach(card => {
        const unlockDateStr = card.getAttribute('data-unlock-date');
        if (unlockDateStr) {
            const unlockDate = new Date(unlockDateStr);

            // Set time to midnight for comparison
            unlockDate.setHours(0, 0, 0, 0);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (today >= unlockDate) {
                card.classList.remove('locked');
                card.classList.add('unlocked');
                const p = card.querySelector('p');
                if (unlockDateStr === '2026-03-01') p.innerText = 'Dreams of our future together.';
                if (unlockDateStr === '2026-08-19') p.innerText = 'Happy Birthday My Princess!';
            } else {
                // Remove href to be absolutely sure it doesn't open
                const originalHref = card.getAttribute('href');
                card.setAttribute('data-href', originalHref);
                card.removeAttribute('href');

                card.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Shake effect
                    card.classList.add('shake');
                    setTimeout(() => card.classList.remove('shake'), 400);

                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    const formattedDate = unlockDate.toLocaleDateString('en-IN', options);

                    alert(`✨ Sabar ka phal meetha hota hai! ✨\n\nIshu, it's not time yet. This special gift will reveal itself on ${formattedDate}. \n\nIntezaar rahega! ❤️`);
                });
            }
        }

        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.card-icon');
            if (icon) icon.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
});

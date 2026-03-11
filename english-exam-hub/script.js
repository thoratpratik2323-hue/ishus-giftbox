document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    // Dynamic Countdown (Simple version)
    const countdownEl = document.getElementById('countdown');
    const examDate = new Date();
    examDate.setDate(examDate.getDate() + 1); // Assuming exam is tomorrow
    examDate.setHours(10, 30, 0, 0); // Typical CBSC exam start time

    function updateCountdown() {
        const now = new Date();
        const diff = examDate - now;

        if (diff <= 0) {
            countdownEl.innerHTML = "Good Luck! You'll Crush It! 🚀";
            return;
        }

        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        countdownEl.innerHTML = `Starts in: ${hrs}h ${mins}m ⏳`;
    }

    setInterval(updateCountdown, 60000);
    updateCountdown();
});

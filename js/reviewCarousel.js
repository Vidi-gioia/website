/* =========================
   ACTIVE MENU
========================= */

(() => {
    const menuLinks = document.querySelectorAll('.menu a');
    const currentPage = location.pathname.split('/').pop();

    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
})();

/* =========================
   REVIEW CAROUSEL
========================= */

(() => {
    const reviewBox = document.querySelector('.review');
    if (!reviewBox) return;

    const starsEl = reviewBox.querySelector('.review-stars');
    const textEl = reviewBox.querySelector('.review-text');
    const authorEl = reviewBox.querySelector('.review-author');
    const contentEl = reviewBox.querySelector('.review-content');

    const prevBtn = reviewBox.querySelector('.review-prev');
    const nextBtn = reviewBox.querySelector('.review-next');

    let reviewsData = [];
    let reviewIndex = 0;
    let autoTimer = null;

    fetch('../assets/reviews.json')
        .then(res => res.json())
        .then(data => {
            reviewsData = data;
            renderReview();
            startAutoRotate();
        })
        .catch(err => console.error('Review load error:', err));

    function renderReview() {
        const r = reviewsData[reviewIndex];
        if (!r) return;

        contentEl.style.opacity = 0;

        requestAnimationFrame(() => {
            starsEl.textContent = '⭐'.repeat(r.rating);
            textEl.textContent = r.text;
            authorEl.textContent = r.author;
            contentEl.style.opacity = 1;
        });
    }

    function nextReview() {
        reviewIndex = (reviewIndex + 1) % reviewsData.length;
        renderReview();
    }

    function prevReview() {
        reviewIndex =
            (reviewIndex - 1 + reviewsData.length) % reviewsData.length;
        renderReview();
    }

    function startAutoRotate() {
        autoTimer = setInterval(nextReview, 5000);
    }

    function resetAutoRotate() {
        clearInterval(autoTimer);
        startAutoRotate();
    }

    nextBtn.addEventListener('click', () => {
        nextReview();
        resetAutoRotate();
    });

    prevBtn.addEventListener('click', () => {
        prevReview();
        resetAutoRotate();
    });
})();

const links = document.querySelectorAll('.menu a');
const current = location.pathname.split('/').pop() || '/index.html';

links.forEach(link => {
    if (link.getAttribute('href') === current) {
        link.classList.add('active');
    }
});
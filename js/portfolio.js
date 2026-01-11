/* =========================
   PORTFOLIO (FOLDER VIEW)
========================= */

(() => {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    fetch('../data/photos.json')
        .then(res => res.json())
        .then(files => {
            const groups = {};

            files.forEach(file => {
                if (!file.includes('-')) return;

                const base = file.replace(/\.[^/.]+$/, '');
                const [groupRaw] = base.split('-');
                const groupName = groupRaw.trim();

                if (!groupName) return;

                if (!groups[groupName]) {
                    groups[groupName] = [];
                }

                groups[groupName].push(file);
            });

            renderFolders(groups);
        });

    /* ---------- FOLDER VIEW ---------- */

    function renderFolders(groups) {
        grid.classList.remove('expanded');
        grid.innerHTML = '';

        Object.entries(groups).forEach(([groupName, files]) => {
            const folder = document.createElement('div');
            folder.className = 'portfolio-folder';

            const stack = document.createElement('div');
            stack.className = 'stack';

            files.slice(0, 3).forEach(file => {
                const thumb = document.createElement('div');
                thumb.className = 'thumb';

                const loader = document.createElement('div');
                loader.className = 'loader';
                thumb.appendChild(loader);

                const img = new Image();
                img.src = `../photos/${file}`;
                img.onload = () => {
                    thumb.style.backgroundImage = `url(${img.src})`;
                    loader.remove();
                };

                stack.appendChild(thumb);
            });

            const label = document.createElement('div');
            label.className = 'folder-label';
            label.textContent = groupName;

            folder.append(stack, label);
            grid.appendChild(folder);

            folder.addEventListener('click', () => {
                renderGroup(groupName, files);
            });
        });
    }

    /* ---------- EXPANDED GROUP ---------- */

    function renderGroup(groupName, files) {
        grid.classList.add('expanded');
        grid.innerHTML = '';

        const title = document.createElement('h2');
        title.textContent = groupName;
        title.style.marginBottom = '20px';

        const groupGrid = document.createElement('div');
        groupGrid.className = 'portfolio-grid-inner';

        files.forEach(file => {
            const card = document.createElement('div');
            card.className = 'card';

            const thumb = document.createElement('div');
            thumb.className = 'thumb';

            const loader = document.createElement('div');
            loader.className = 'loader';
            thumb.appendChild(loader);

            const src = `../photos/${file}`; // ✅ DEFINE FIRST

            const img = new Image();
            img.src = src;
            img.onload = () => {
                thumb.style.backgroundImage = `url(${img.src})`;
                loader.remove();
            };

            const btn = document.createElement('div');
            btn.className = 'view-btn';
            btn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
                        stroke="white" stroke-width="2"/>
                    <circle cx="12" cy="12" r="3"
                        stroke="white" stroke-width="2"/>
                </svg>
            `;

            btn.addEventListener('click', e => {
                e.stopPropagation();
                openPopup(src);
            });

            thumb.addEventListener('click', () => openPopup(src));

            card.append(thumb, btn);
            groupGrid.appendChild(card);
        });

        const back = document.createElement('a');
        back.href = '/portfolio/';
        back.className = 'back-link';
        back.textContent = '← Back';

        grid.append(back, title, groupGrid);
    }

    /* ---------- POPUP ---------- */

    function openPopup(src) {
        const popup = document.createElement('div');
        popup.className = 'image-popup';

        const img = document.createElement('img');
        img.src = src;

        popup.appendChild(img);
        document.body.appendChild(popup);

        popup.addEventListener('click', () => popup.remove());
        document.addEventListener('keydown', function esc(e) {
            if (e.key === 'Escape') {
                popup.remove();
                document.removeEventListener('keydown', esc);
            }
        });
    }
})();

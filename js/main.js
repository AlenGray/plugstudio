/* ═══════════════════════════════════════════════════════════
   PlugStudio — Main JS
   Search, filter, dynamic year
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // Dynamic copyright year
    const yearEls = document.querySelectorAll('.current-year');
    const startYear = 2026;
    const now = new Date().getFullYear();
    const yearStr = now > startYear ? `${startYear}–${now}` : `${startYear}`;
    yearEls.forEach(el => { el.textContent = yearStr; });

    // Search & Filter (only on main page)
    const searchInput = document.querySelector('.search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const pluginCards = document.querySelectorAll('.plugin-card');
    const grid = document.querySelector('.plugins-grid');

    if (!searchInput || !grid) return;

    let activeFilter = 'all';

    function filterPlugins() {
        const query = searchInput.value.toLowerCase().trim();
        let visible = 0;

        pluginCards.forEach(card => {
            const name = (card.dataset.name || '').toLowerCase();
            const tags = (card.dataset.tags || '').toLowerCase();
            const matchSearch = !query || name.includes(query) || tags.includes(query);
            const matchFilter = activeFilter === 'all' || tags.includes(activeFilter);
            const show = matchSearch && matchFilter;
            card.style.display = show ? '' : 'none';
            if (show) visible++;
        });

        // No results message
        let noRes = grid.querySelector('.no-results');
        if (visible === 0) {
            if (!noRes) {
                noRes = document.createElement('div');
                noRes.className = 'no-results';
                noRes.textContent = 'No plugins found.';
                grid.appendChild(noRes);
            }
        } else if (noRes) {
            noRes.remove();
        }
    }

    searchInput.addEventListener('input', filterPlugins);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter || 'all';
            filterPlugins();
        });
    });
});

(function () {
    'use strict';
    document.documentElement.classList.add('js');

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Imprimir ---------- */
    var printBtn = document.querySelector('[data-print]');
    if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

    /* ---------- Filtro de proyectos ---------- */
    var grid = document.getElementById('grid-proyectos');
    var filterBtns = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
    var cards = grid ? Array.prototype.slice.call(grid.querySelectorAll('.card')) : [];
    var empty = document.querySelector('[data-empty]');
    var live = document.querySelector('[data-live]');
    var counter = document.querySelector('[data-visible-count]');

    function applyFilter(cat) {
        var shown = 0;
        cards.forEach(function (card) {
            var match = cat === 'all' || card.getAttribute('data-cat') === cat;
            card.classList.toggle('is-hidden', !match);
            if (match) {
                shown++;
                // Re-escalonar el revelado de las tarjetas visibles
                card.style.setProperty('--reveal-delay', Math.min(shown - 1, 8) * 45 + 'ms');
            }
        });
        filterBtns.forEach(function (b) {
            b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === cat));
        });
        if (empty) empty.hidden = shown > 0;
        if (counter) counter.textContent = shown + (shown === 1 ? ' proyecto' : ' proyectos');
        if (live) live.textContent = 'Mostrando ' + shown + ' de ' + cards.length + ' proyectos.';
    }

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            applyFilter(btn.getAttribute('data-filter'));
        });
    });

    /* ---------- Revelado escalonado al hacer scroll ---------- */
    var revealables = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealables.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

        // Escalonado inicial por posición dentro de su grupo
        var groups = {};
        revealables.forEach(function (el) {
            var key = el.parentElement ? el.parentElement.className : 'x';
            groups[key] = (groups[key] || 0);
            el.style.setProperty('--reveal-delay', Math.min(groups[key], 8) * 45 + 'ms');
            groups[key]++;
            io.observe(el);
        });

        // Red de seguridad: ningún contenido puede quedar invisible si el
        // observer falla o se retrasa. Lo que aún no se reveló está fuera
        // de pantalla, así que mostrarlo aquí no interrumpe la animación.
        window.setTimeout(function () {
            revealables.forEach(function (el) { el.classList.add('is-visible'); });
            io.disconnect();
        }, 4000);
    }

    /* ---------- Scrollspy en la navegación ---------- */
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
    var sections = navLinks
        .map(function (l) { return document.querySelector(l.getAttribute('href')); })
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function (l) {
                    l.setAttribute('aria-current',
                        String(l.getAttribute('href') === '#' + entry.target.id));
                });
            });
        }, { rootMargin: '-20% 0px -70% 0px' });
        sections.forEach(function (s) { spy.observe(s); });
    }
})();

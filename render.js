/* ============================================================
   Furkid Rescue — renderer
   Loads content.json and fills each page with text/images.
   Nontechnical owners do NOT need to edit this file — only content.json.
   ============================================================ */

/* ---------- Shared SVG icon library ---------- */
const ICONS = {
  heart: (c = 'currentColor', size = 22) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${c}" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-7.5-4.5-10-9.5C.5 7 3 3 7 3c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 5 8.5-2.5 5-10 9.5-10 9.5z"/></svg>`,
  heartOutline: (c = 'currentColor', size = 22) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  paw: (c = 'currentColor', size = 28) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${c}" xmlns="http://www.w3.org/2000/svg"><circle cx="5.5" cy="9" r="1.8"/><circle cx="9" cy="5" r="1.8"/><circle cx="15" cy="5" r="1.8"/><circle cx="18.5" cy="9" r="1.8"/><path d="M12 11c-3.5 0-5.5 2.6-5.5 5a3 3 0 0 0 3 3c1 0 1.8-.3 2.5-.8.7.5 1.5.8 2.5.8a3 3 0 0 0 3-3c0-2.4-2-5-5.5-5z"/></svg>`,
  home: (c = 'currentColor', size = 28) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>`,
  users: (c = 'currentColor', size = 28) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  shield: (c = 'currentColor', size = 28) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  dollar: (c = 'currentColor', size = 28) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  'hand-heart': (c = 'currentColor', size = 28) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="M4.5 9.5A2.5 2.5 0 0 1 7 7c1 0 1.8.5 2.5 1.5C10.2 7.5 11 7 12 7a2.5 2.5 0 0 1 0 5"/></svg>`,
  share: (c = 'currentColor', size = 28) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  bag: (c = 'currentColor', size = 28) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  stethoscope: (c = 'currentColor', size = 26) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`,
  utensils: (c = 'currentColor', size = 26) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M3 2v7a2 2 0 0 0 2 2h1v11"/><path d="M9 2v20"/><path d="M5 2v7"/><path d="M19 2c-2 0-4 3-4 8 0 3 1 4 2 4h2v8"/></svg>`,
  truck: (c = 'currentColor', size = 26) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  instagram: (c = 'currentColor', size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  facebook: (c = 'currentColor', size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${c}" xmlns="http://www.w3.org/2000/svg"><path d="M22 12a10 10 0 1 0-11.5 9.95v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.4 3.3-3.4.95 0 2 .17 2 .17V8.9h-1.2c-1.1 0-1.45.7-1.45 1.42V12h2.5l-.4 2.95h-2.1v7A10 10 0 0 0 22 12z"/></svg>`,
  mail: (c = 'currentColor', size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  arrowRight: (c = 'currentColor', size = 16) => `<svg class="arrow" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  externalLink: (c = 'currentColor', size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  check: (c = 'currentColor', size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${c}" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1.5 14.5-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4z"/></svg>`,
  search: (c = 'currentColor', size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  menu: (c = 'currentColor', size = 24) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  heartSmall: (c = 'currentColor', size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
};

const COLOR_MAP = {
  coral: '#f58a77',
  teal: '#4ec5b6',
  yellow: '#e5b744',
  pink: '#e896c0',
};

/* ---------- Helpers ---------- */
function $(s, root = document) { return root.querySelector(s); }
function el(html) { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; }
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

/* ---------- Load content.json ---------- */
async function loadContent() {
  const res = await fetch('content.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not load content.json');
  return res.json();
}

/* ---------- Render Header & Footer ---------- */
function renderHeader(site, activePage) {
  const links = [
    { id: 'home', label: 'Home', url: 'index.html' },
    { id: 'adopt', label: 'Adopt', url: 'adopt.html' },
    { id: 'help', label: 'How to Help', url: 'help.html' },
    { id: 'about', label: 'About', url: 'about.html' },
    { id: 'happy-tails', label: 'Happy Tails', url: 'happy-tails.html' },
  ];
  const header = $('#site-header');
  if (!header) return;
  header.innerHTML = `
    <header class="site-header">
      <div class="container nav-inner">
        <a href="index.html" class="logo">${ICONS.heart('#f58a77', 26)}<span>${escapeHtml(site.brand_name)}</span></a>
        <button class="nav-toggle" aria-label="Open menu">${ICONS.menu('#2a3f4f')}</button>
        <nav class="nav-links">
          ${links.map(l => `<a href="${l.url}" class="nav-link${l.id === activePage ? ' active' : ''}">${l.label}</a>`).join('')}
          <a href="donate.html" class="btn btn-coral nav-donate">Donate</a>
        </nav>
      </div>
    </header>
  `;
  // mobile toggle
  const toggle = header.querySelector('.nav-toggle');
  const links_ = header.querySelector('.nav-links');
  toggle?.addEventListener('click', () => links_.classList.toggle('open'));
}

function renderFooter(site) {
  const footer = $('#site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="logo" style="margin-bottom:14px">${ICONS.heart('#f58a77', 22)}<span>${escapeHtml(site.brand_name)}</span></div>
            <p>${escapeHtml(site.tagline)}</p>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="adopt.html">Adopt</a></li>
              <li><a href="help.html">How to Help</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="happy-tails.html">Happy Tails</a></li>
              <li><a href="donate.html">Donate</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contact</h4>
            <p>${escapeHtml(site.city_state)}</p>
            <p>${escapeHtml(site.email)}</p>
            <p>${escapeHtml(site.nonprofit_status)}</p>
          </div>
          <div class="footer-col">
            <h4>Follow Us</h4>
            <div class="footer-social">
              <a href="${escapeHtml(site.instagram_url)}" aria-label="Instagram" target="_blank" rel="noopener">${ICONS.instagram('#fff', 18)}</a>
              <a href="${escapeHtml(site.facebook_url)}" aria-label="Facebook" target="_blank" rel="noopener">${ICONS.facebook('#fff', 18)}</a>
              <a href="mailto:${escapeHtml(site.email)}" aria-label="Email">${ICONS.mail('#fff', 18)}</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          © ${escapeHtml(site.copyright_year)} ${escapeHtml(site.brand_name)}. All rights reserved. EIN: ${escapeHtml(site.ein)}
        </div>
      </div>
    </footer>
  `;
}

/* ---------- Pet Card (used on home + adopt) ---------- */
function petCard(pet, showActions) {
  const tagClass = (pet.type || '').toLowerCase() === 'cat' ? 'cat' : 'dog';
  const img = pet.image ? `<img src="${escapeHtml(pet.image)}" alt="${escapeHtml(pet.name)}" onerror="this.style.display='none'">` : '';
  return `
    <article class="pet-card" data-type="${escapeHtml((pet.type || '').toLowerCase())}" data-name="${escapeHtml((pet.name || '').toLowerCase())}" data-breed="${escapeHtml((pet.breed || '').toLowerCase())}">
      <div class="pet-photo">
        ${img}
        ${pet.status ? `<span class="pet-tag ${tagClass}">${escapeHtml(pet.status)}</span>` : ''}
        ${showActions ? `<button class="pet-fav" aria-label="Favorite">${ICONS.heartOutline('#f58a77', 18)}</button>` : ''}
      </div>
      <div class="pet-body">
        <h3 class="pet-name">${escapeHtml(pet.name)}</h3>
        <div class="pet-meta">${[pet.breed, pet.age, pet.sex].filter(Boolean).map(escapeHtml).join(' · ')}</div>
        ${showActions
          ? `<p class="pet-desc">${escapeHtml(pet.description || '')}</p>
             <div class="pet-actions">
               <a class="btn btn-coral" href="${escapeHtml(pet.sponsor_url || '#')}" target="_blank" rel="noopener">Sponsor ${escapeHtml(pet.name)} ${ICONS.externalLink('#fff', 12)}</a>
               <a class="btn btn-ghost" href="${escapeHtml(pet.adopt_info_url || '#')}">Adopt Info ${ICONS.arrowRight('#2a3f4f', 14)}</a>
             </div>`
          : `<a class="pet-learn" href="${escapeHtml(pet.adopt_info_url || '#')}">Learn More →</a>`
        }
      </div>
    </article>
  `;
}

/* ---------- Banners (reusable) ---------- */
function coralBanner(c) {
  return `
    <section class="banner">
      <div class="container">
        <h2>${escapeHtml(c.cta_title)}</h2>
        <p>${escapeHtml(c.cta_description)}</p>
        <div class="banner-actions">
          <a href="help.html" class="btn btn-white">${escapeHtml(c.cta_button_secondary)}</a>
          <a href="donate.html" class="btn" style="background:#e5685a;color:#fff">${escapeHtml(c.cta_button_primary)}</a>
        </div>
      </div>
    </section>
  `;
}

/* ============================================================
   PAGE: HOME
   ============================================================ */
function renderHome(c) {
  const h = c.home;
  const main = $('#main');
  main.innerHTML = `
    <section class="home-hero">
      <div class="container" style="display:grid;gap:40px">
        <div>
          <span class="badge">${ICONS.paw('#f58a77', 14)} ${escapeHtml(h.hero_badge)}</span>
          <h1>${escapeHtml(h.hero_title_part1)} <span class="highlight">${escapeHtml(h.hero_title_highlight)}</span></h1>
          <p class="lead">${escapeHtml(h.hero_description)}</p>
          <div class="hero-cta">
            <a href="adopt.html" class="btn btn-coral btn-lg">${escapeHtml(h.hero_button_primary)} ${ICONS.arrowRight('#fff')}</a>
            <a href="donate.html" class="btn btn-ghost btn-lg">${escapeHtml(h.hero_button_secondary)}</a>
          </div>
        </div>
        <div class="hero-image-wrap">
          <img src="${escapeHtml(h.hero_image)}" alt="${escapeHtml(h.hero_image_alt)}" onerror="this.style.background='#3a4d5e';this.removeAttribute('src')">
          <div class="hero-stat-chip">
            <div class="num">${escapeHtml(h.hero_stat_number)}</div>
            <div class="lbl">${escapeHtml(h.hero_stat_label)}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-white">
      <div class="container">
        <div class="stats-grid">
          ${h.stats.map(s => `
            <div class="stat-card">
              <div class="stat-icon">${(ICONS[s.icon] || ICONS.heart)(COLOR_MAP[s.icon === 'home' ? 'teal' : s.icon === 'users' ? 'yellow' : s.icon === 'heart' ? 'pink' : 'coral'], 30)}</div>
              <div class="num">${escapeHtml(s.number)}</div>
              <div class="lbl">${escapeHtml(s.label)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section section-cream">
      <div class="container">
        <div class="section-head">
          <h2>${escapeHtml(h.featured_title)}</h2>
          <p>${escapeHtml(h.featured_subtitle)}</p>
        </div>
        <div class="pets-grid">
          ${(c.adopt.pets || []).slice(0, 2).map(p => petCard(p, false)).join('')}
        </div>
        <div class="view-all-wrap">
          <a href="adopt.html" class="btn btn-navy">${escapeHtml(h.featured_view_all)} ${ICONS.arrowRight('#fff')}</a>
        </div>
      </div>
    </section>

    <section class="section section-white">
      <div class="container">
        <div class="mission-block">
          <img src="${escapeHtml(h.mission_image)}" alt="${escapeHtml(h.mission_image_alt)}" onerror="this.style.background='#e4f6f3';this.removeAttribute('src')">
          <h2>${escapeHtml(h.mission_title)}</h2>
          ${h.mission_paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
          <div class="tag-pills">
            ${h.mission_tags.map(t => `<span class="tag-pill">${escapeHtml(t)}</span>`).join('')}
          </div>
        </div>
      </div>
    </section>

    ${coralBanner(h)}

    <section class="section section-white">
      <div class="container">
        <div class="section-head">
          <h2>${escapeHtml(h.instagram_title)}</h2>
          <p>${escapeHtml(h.instagram_subtitle)}</p>
        </div>
        <div class="ig-grid">
          ${h.instagram_images.map(src => `<img src="${escapeHtml(src)}" alt="Instagram photo" onerror="this.style.background='#e8ebee';this.removeAttribute('src')">`).join('')}
        </div>
        <div class="ig-handle-wrap">
          <a class="ig-handle" href="${escapeHtml(c.site.instagram_url)}" target="_blank" rel="noopener">${escapeHtml(c.site.instagram_handle)}</a>
        </div>
      </div>
    </section>
  `;
}

/* ============================================================
   PAGE: ADOPT
   ============================================================ */
function renderAdopt(c) {
  const a = c.adopt;
  const main = $('#main');
  main.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <h1>${escapeHtml(a.hero_title)}</h1>
        <p>${escapeHtml(a.hero_subtitle)}</p>
      </div>
    </section>

    <section class="filter-bar">
      <div class="container filter-bar-inner">
        <div class="filter-chips">
          <button class="chip active" data-filter="all">All Pets</button>
          <button class="chip" data-filter="dog">Dogs</button>
          <button class="chip" data-filter="cat">Cats</button>
        </div>
        <div class="filter-search">
          ${ICONS.search('#aab4bd', 16)}
          <input type="text" id="pet-search" placeholder="Search by name or breed...">
        </div>
      </div>
    </section>

    <section class="section section-cream">
      <div class="container">
        <div class="pets-grid" id="pets-grid">
          ${a.pets.map(p => petCard(p, true)).join('')}
        </div>
        <p class="adopt-note">
          <strong>${escapeHtml(a.note_title)}</strong> ${escapeHtml(a.note_text)}
          <a href="${escapeHtml(a.note_link_url)}" target="_blank" rel="noopener">${escapeHtml(a.note_link_text)}</a>
          ${escapeHtml(a.note_text_tail)}
          <a href="mailto:${escapeHtml(c.site.email)}">${escapeHtml(c.site.email)}</a>.
        </p>
      </div>
    </section>
  `;

  // Filter + search
  const chips = document.querySelectorAll('.chip');
  const search = $('#pet-search');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(x => x.classList.remove('active'));
    chip.classList.add('active');
    applyFilter();
  }));
  search.addEventListener('input', applyFilter);
  function applyFilter() {
    const active = document.querySelector('.chip.active').dataset.filter;
    const q = (search.value || '').trim().toLowerCase();
    document.querySelectorAll('.pet-card').forEach(card => {
      const type = card.dataset.type;
      const text = (card.dataset.name + ' ' + card.dataset.breed);
      const typeMatch = active === 'all' || type === active;
      const qMatch = !q || text.includes(q);
      card.style.display = (typeMatch && qMatch) ? '' : 'none';
    });
  }
}

/* ============================================================
   PAGE: HELP
   ============================================================ */
function renderHelp(c) {
  const h = c.help;
  const main = $('#main');
  main.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <h1>${escapeHtml(h.hero_title)}</h1>
        <p>${escapeHtml(h.hero_subtitle)}</p>
      </div>
    </section>

    <section class="section section-cream">
      <div class="container">
        <div class="help-grid">
          ${h.ways_to_help.map(card => `
            <div class="help-card color-${escapeHtml(card.color || 'coral')}">
              <div class="ico">${(ICONS[card.icon] || ICONS.heart)(COLOR_MAP[card.color] || COLOR_MAP.coral, 30)}</div>
              <h3>${escapeHtml(card.title)}</h3>
              <p>${escapeHtml(card.description)}</p>
              <a class="card-link" href="${escapeHtml(card.link_url)}">${escapeHtml(card.link_text)} ${ICONS.arrowRight(COLOR_MAP[card.color] || COLOR_MAP.coral, 14)}</a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section section-white">
      <div class="container foster-block">
        <h2>${escapeHtml(h.foster_section_title)}</h2>
        ${h.foster_section_paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
        <ul class="bullets">
          ${h.foster_benefits.map(b => `<li>${ICONS.check('#4ec5b6', 20)} <span>${escapeHtml(b)}</span></li>`).join('')}
        </ul>
        <a href="${escapeHtml(h.foster_button_url)}" class="btn btn-teal">${escapeHtml(h.foster_button_text)}</a>
        <img src="${escapeHtml(h.foster_image)}" alt="${escapeHtml(h.foster_image_alt)}" onerror="this.style.background='#e4f6f3';this.removeAttribute('src')">
      </div>
    </section>

    <section class="banner banner-teal">
      <div class="container">
        <h2>${escapeHtml(h.contact_banner_title)}</h2>
        <p>${escapeHtml(h.contact_banner_subtitle)}</p>
        <a href="${escapeHtml(h.contact_banner_url)}" class="btn btn-white">${escapeHtml(h.contact_banner_button)} ${ICONS.arrowRight('#3fb4a4', 14)}</a>
      </div>
    </section>
  `;
}

/* ============================================================
   PAGE: ABOUT
   ============================================================ */
function renderAbout(c) {
  const a = c.about;
  const main = $('#main');
  main.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <h1>${escapeHtml(a.hero_title)}</h1>
        <p>${escapeHtml(a.hero_subtitle)}</p>
      </div>
    </section>

    <section class="section section-cream">
      <div class="container story-wrap">
        <img src="${escapeHtml(a.story_image)}" alt="${escapeHtml(a.story_image_alt)}" onerror="this.style.background='#e8ebee';this.removeAttribute('src')">
        <h2>${escapeHtml(a.story_title)}</h2>
        ${a.story_paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
      </div>
    </section>

    <section class="section section-white">
      <div class="container">
        <div class="section-head">
          <h2>${escapeHtml(a.values_title)}</h2>
          <p>${escapeHtml(a.values_subtitle)}</p>
        </div>
        <div class="values-grid">
          ${a.values.map(v => `
            <div class="value-card">
              <div class="ico">${(ICONS[v.icon] || ICONS.heart)(COLOR_MAP[v.color] || COLOR_MAP.coral, 26)}</div>
              <h3>${escapeHtml(v.title)}</h3>
              <p>${escapeHtml(v.description)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section section-cream">
      <div class="container">
        <div class="section-head"><h2>${escapeHtml(a.process_title)}</h2></div>
        <div class="process-grid">
          ${a.process_steps.map(step => `
            <div class="process-card">
              <div class="process-num">${escapeHtml(step.number)}</div>
              <h3>${escapeHtml(step.title)}</h3>
              <p>${escapeHtml(step.description)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="banner banner-navy">
      <div class="container">
        <h2>${escapeHtml(a.mission_cta_title)}</h2>
        <p>${escapeHtml(a.mission_cta_description)}</p>
        <a href="${escapeHtml(a.mission_cta_url)}" class="btn btn-coral">${escapeHtml(a.mission_cta_button)} ${ICONS.arrowRight('#fff')}</a>
      </div>
    </section>
  `;
}

/* ============================================================
   PAGE: HAPPY TAILS
   ============================================================ */
function renderHappyTails(c) {
  const t = c.happy_tails;
  const main = $('#main');
  main.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <h1>${escapeHtml(t.hero_title)}</h1>
        <p>${escapeHtml(t.hero_subtitle)}</p>
      </div>
    </section>

    <section class="section section-cream">
      <div class="container">
        <div class="tails-grid">
          ${t.stories.map(s => `
            <article class="tail-card">
              <img class="tail-img" src="${escapeHtml(s.image)}" alt="${escapeHtml(s.pet_name)}" onerror="this.style.background='#e8ebee';this.removeAttribute('src')">
              <div class="tail-body">
                <div class="quote-mark">&#8220;&#8220;</div>
                <blockquote>${escapeHtml(s.quote)}</blockquote>
                <div class="tail-foot">
                  <div>
                    <div class="pet">${escapeHtml(s.pet_name)}</div>
                    <div class="adopter">Adopted by ${escapeHtml(s.adopter)}</div>
                    <div class="date">${escapeHtml(s.date)}</div>
                  </div>
                  ${ICONS.heart('#f58a77', 18)}
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="banner banner-pink">
      <div class="container">
        <h2>${escapeHtml(t.share_title)}</h2>
        <p>${escapeHtml(t.share_subtitle)}</p>
        <a href="${escapeHtml(t.share_url)}" class="btn btn-navy">${escapeHtml(t.share_button)} ${ICONS.arrowRight('#fff')}</a>
      </div>
    </section>
  `;
}

/* ============================================================
   PAGE: DONATE
   ============================================================ */
function renderDonate(c) {
  const d = c.donate;
  const main = $('#main');
  main.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <h1>${escapeHtml(d.hero_title)}</h1>
        <p>${escapeHtml(d.hero_subtitle)}</p>
      </div>
    </section>

    <section class="section section-cream">
      <div class="container">
        <div class="donate-card">
          <h2>${escapeHtml(d.donation_card_title)}</h2>
          <p class="sub">${escapeHtml(d.donation_card_subtitle)}</p>
          <div class="amount-grid">
            ${d.donation_amounts.map((amt, i) => `<button class="amount-btn${i === 1 ? '' : ''}" data-amount="${escapeHtml(amt)}">${escapeHtml(amt)}</button>`).join('')}
          </div>
          <a class="donate-paypal" href="${escapeHtml(c.site.paypal_donate_url)}" target="_blank" rel="noopener">
            ${ICONS.dollar('#fff', 18)}<span>${escapeHtml(d.paypal_button_text)} ${ICONS.externalLink('#fff', 12)}</span>
          </a>
          <p class="paypal-note">${escapeHtml(d.paypal_note)}</p>

          <div class="other-ways">
            <h4>${escapeHtml(d.other_ways_title)}</h4>
            <ul>
              ${d.other_ways.map(w => `
                <li>${w.label ? `<strong>${escapeHtml(w.label)}</strong> ` : ''}${
                  w.url ? `<a href="${escapeHtml(w.url)}" target="_blank" rel="noopener">${escapeHtml(w.value)}</a>` : escapeHtml(w.value)
                }</li>
              `).join('')}
            </ul>
          </div>
        </div>

        <div class="container-narrow" style="padding-top:12px">
          <h2 style="margin-bottom:20px">${escapeHtml(d.impact_title)}</h2>
          <div class="impact-list">
            ${d.impact_items.map(i => `
              <div class="impact-card c-${escapeHtml(i.color || 'coral')}">
                <div class="ico">${(ICONS[i.icon] || ICONS.heart)(COLOR_MAP[i.color] || COLOR_MAP.coral, 26)}</div>
                <div class="impact-body">
                  <h4>${escapeHtml(i.title)} <span class="price">${escapeHtml(i.price)}</span></h4>
                  <p>${escapeHtml(i.description)}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="sponsor-block" style="padding-top:56px">
          <img src="${escapeHtml(d.sponsor_image)}" alt="${escapeHtml(d.sponsor_image_alt)}" onerror="this.style.background='#e4f6f3';this.removeAttribute('src')">
          <h2>${escapeHtml(d.sponsor_title)}</h2>
          <p>${escapeHtml(d.sponsor_description)}</p>
          <a href="${escapeHtml(d.sponsor_url)}" class="btn btn-teal">${escapeHtml(d.sponsor_button)} ${ICONS.arrowRight('#fff')}</a>
        </div>

        <p class="tax-notice"><strong>${escapeHtml(d.tax_notice_bold)}</strong> ${escapeHtml(d.tax_notice_text)}</p>
      </div>
    </section>
  `;

  // Simple amount highlighting
  const buttons = document.querySelectorAll('.amount-btn');
  buttons.forEach(b => b.addEventListener('click', () => {
    buttons.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  }));
}

/* ============================================================
   Boot
   ============================================================ */
const RENDERERS = {
  home: renderHome,
  adopt: renderAdopt,
  help: renderHelp,
  about: renderAbout,
  'happy-tails': renderHappyTails,
  donate: renderDonate,
};

async function boot() {
  const page = document.body.dataset.page;
  try {
    const content = await loadContent();
    renderHeader(content.site, page);
    (RENDERERS[page] || renderHome)(content);
    renderFooter(content.site);
  } catch (err) {
    console.error(err);
    const main = $('#main');
    if (main) {
      main.innerHTML = `
        <div style="padding:60px 24px;text-align:center;max-width:700px;margin:0 auto">
          <h1>Content couldn't load</h1>
          <p style="color:#6b7784">If you're viewing this file directly from your computer, open it through a local web server instead (GitHub Pages will work fine). The site needs to fetch <code>content.json</code>.</p>
          <p style="color:#6b7784;font-size:13px">Error: ${escapeHtml(err.message)}</p>
        </div>`;
    }
  }
}

if (document.readyState !== 'loading') boot();
else document.addEventListener('DOMContentLoaded', boot);

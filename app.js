// CyberGuide App Logic

const STORAGE_KEY = 'cyberguide_learned';

// ── State ──────────────────────────────────────────────────────────────────
let learnedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
let currentSection = null;
let searchQuery = '';

// ── DOM refs ───────────────────────────────────────────────────────────────
const mainEl = document.getElementById('main');
const sidebarEl = document.getElementById('sidebar');
const searchInput = document.getElementById('search');
const progressPill = document.getElementById('progressPill');
const menuBtn = document.getElementById('menuBtn');

// ── Init ───────────────────────────────────────────────────────────────────
function init() {
  buildSidebar();
  renderHome();
  updateProgressPill();

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (q.length > 1) {
      searchQuery = q;
      renderSearch(q);
    } else if (q.length === 0) {
      searchQuery = '';
      if (currentSection) renderSection(currentSection);
      else renderHome();
    }
  });

  menuBtn.addEventListener('click', () => {
    sidebarEl.classList.toggle('open');
  });

  mainEl.addEventListener('click', (e) => {
    if (sidebarEl.classList.contains('open') && !sidebarEl.contains(e.target) && e.target !== menuBtn) {
      sidebarEl.classList.remove('open');
    }
  });
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function buildSidebar() {
  sidebarEl.innerHTML = '';

  // Home link
  const homeLink = el('div', { class: 'sidebar-item active' }, '🏠 Home');
  homeLink.dataset.section = 'home';
  homeLink.addEventListener('click', () => {
    currentSection = null;
    searchInput.value = '';
    renderHome();
    setSidebarActive('home');
    sidebarEl.classList.remove('open');
  });
  const homeSection = el('div', { class: 'sidebar-section open' });
  const homeItems = el('div', { class: 'sidebar-items' });
  homeItems.appendChild(homeLink);
  homeSection.appendChild(homeItems);
  sidebarEl.appendChild(homeSection);

  SECTIONS.forEach(section => {
    const sec = el('div', { class: 'sidebar-section open' });

    const header = el('div', { class: 'sidebar-section-header' });
    header.innerHTML = `${section.icon} ${section.title} <span class="sidebar-chevron">▶</span>`;
    header.addEventListener('click', () => sec.classList.toggle('open'));

    const items = el('div', { class: 'sidebar-items' });

    section.concepts.forEach(concept => {
      const item = el('div', { class: 'sidebar-item' });
      item.dataset.conceptId = concept.id;
      item.dataset.section = section.id;
      item.innerHTML = `
        <span>${concept.title}</span>
        <span class="cert-badge tag tag-${concept.tags[0]}">${tagLabel(concept.tags[0])}</span>
      `;
      if (learnedIds.has(concept.id)) {
        item.style.opacity = '0.6';
        item.innerHTML = `<span>✓ ${concept.title}</span><span class="cert-badge tag tag-${concept.tags[0]}">${tagLabel(concept.tags[0])}</span>`;
      }
      item.addEventListener('click', () => {
        currentSection = section.id;
        searchInput.value = '';
        renderSection(section.id, concept.id);
        setSidebarActive(section.id);
        sidebarEl.classList.remove('open');
      });
      items.appendChild(item);
    });

    sec.appendChild(header);
    sec.appendChild(items);
    sidebarEl.appendChild(sec);
  });
}

function setSidebarActive(sectionId) {
  sidebarEl.querySelectorAll('.sidebar-item').forEach(item => {
    item.classList.toggle('active', item.dataset.section === sectionId);
  });
}

// ── Home ───────────────────────────────────────────────────────────────────
function renderHome() {
  const total = ALL_CONCEPTS.length;
  const learned = learnedIds.size;

  mainEl.innerHTML = '';
  const hero = el('div', { class: 'hero' });

  hero.innerHTML = `
    <h1>Your path to <span>Security Architect</span></h1>
    <p class="hero-sub">One concept at a time. Each idea connects to the next — like links in a chain. Short, real, no fluff. Built for your brain.</p>
    <div class="path-cards" id="pathCards"></div>
    <div style="margin-bottom:20px;animation:fadeUp .5s .18s ease both">
      <div class="detail-label">Overall progress</div>
      <div class="section-progress-bar" style="margin-bottom:8px">
        <div class="section-progress-fill" style="width:${total ? Math.round(learned/total*100) : 0}%"></div>
      </div>
      <div style="font-size:13px;color:var(--text-muted)">${learned} of ${total} concepts marked as learned</div>
    </div>
    <div style="padding:22px 24px;background:rgba(7,12,24,.72);backdrop-filter:blur(14px);border:1px solid rgba(0,200,255,.12);border-radius:14px;max-width:600px;position:relative;overflow:hidden;animation:fadeUp .5s .22s ease both">
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,200,255,.4),rgba(168,85,247,.3),transparent)"></div>
      <div class="detail-label">The Certification Path</div>
      <div style="font-size:13px;color:var(--text-muted);line-height:2">
        <strong style="color:var(--text)">1. CompTIA Network+</strong> → Foundations + networking<br>
        <strong style="color:var(--text)">2. CompTIA Security+</strong> → Core security concepts<br>
        <strong style="color:var(--text)">3. CASP+ or CISSP</strong> → Advanced/architect level<br>
        <strong style="color:var(--text)">4. Cloud cert</strong> (AWS Security / Azure AZ-500)<br>
        <strong style="color:var(--text)">5. CISSP</strong> → Senior Security Architect / CISO level
      </div>
    </div>
  `;

  const cards = hero.querySelector('#pathCards');
  SECTIONS.forEach(section => {
    const total = section.concepts.length;
    const done = section.concepts.filter(c => learnedIds.has(c.id)).length;
    const pct = total ? Math.round(done / total * 100) : 0;

    const card = el('div', { class: 'path-card' });
    card.innerHTML = `
      <span class="path-card-icon">${section.icon}</span>
      <h3>${section.title}</h3>
      <p>${section.subtitle}</p>
      <div class="path-card-progress">
        <div class="path-card-bar" style="width:${pct}%"></div>
      </div>
      <div class="path-card-count">${done}/${total} concepts · ${pct}%</div>
    `;
    card.addEventListener('click', () => {
      currentSection = section.id;
      renderSection(section.id);
      setSidebarActive(section.id);
    });
    cards.appendChild(card);
  });

  mainEl.appendChild(hero);
}

// ── Section View ───────────────────────────────────────────────────────────
function renderSection(sectionId, scrollToId = null) {
  const section = SECTIONS.find(s => s.id === sectionId);
  if (!section) return;

  const total = section.concepts.length;
  const done = section.concepts.filter(c => learnedIds.has(c.id)).length;
  const pct = total ? Math.round(done / total * 100) : 0;

  mainEl.innerHTML = '';
  const view = el('div', { class: 'section-view' });

  view.innerHTML = `
    <div class="section-view-header">
      <span class="section-view-icon">${section.icon}</span>
      <h2>${section.title}</h2>
    </div>
    <p class="section-view-meta">${section.subtitle}</p>
    <div class="section-progress-bar">
      <div class="section-progress-fill" id="secProgressFill" style="width:${pct}%"></div>
    </div>
    <div class="section-progress-label" id="secProgressLabel">${done}/${total} concepts learned (${pct}%)</div>
    <div id="conceptList"></div>
  `;

  mainEl.appendChild(view);

  const list = view.querySelector('#conceptList');
  section.concepts.forEach((concept, i) => {
    const card = buildConceptCard(concept, i);
    list.appendChild(card);
  });

  if (scrollToId) {
    requestAnimationFrame(() => {
      const target = document.getElementById('card-' + scrollToId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('expanded');
      }
    });
  }
}

// ── Search ─────────────────────────────────────────────────────────────────
function renderSearch(query) {
  const q = query.toLowerCase();
  const results = ALL_CONCEPTS.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.blurb.toLowerCase().includes(q) ||
    c.chain.some(step => step.toLowerCase().includes(q)) ||
    (c.facts || []).some(f => f.toLowerCase().includes(q)) ||
    c.detail.toLowerCase().includes(q)
  );

  mainEl.innerHTML = '';
  const view = el('div', { class: 'search-view' });
  view.innerHTML = `<h2>Search: "${query}" — ${results.length} result${results.length !== 1 ? 's' : ''}</h2>`;

  if (results.length === 0) {
    view.innerHTML += `<div class="search-empty">No concepts found for "${query}". Try a shorter or different term.</div>`;
  } else {
    const list = el('div');
    results.forEach((concept, i) => {
      list.appendChild(buildConceptCard(concept, i));
    });
    view.appendChild(list);
  }

  mainEl.appendChild(view);
}

// ── Concept Card ───────────────────────────────────────────────────────────
function buildConceptCard(concept, index) {
  const isLearned = learnedIds.has(concept.id);
  const card = el('div', { class: `concept-card${isLearned ? ' learned' : ''}`, id: `card-${concept.id}` });
  card.style.animationDelay = `${Math.min(index * 0.04, 0.3)}s`;

  const tagsHtml = concept.tags.map(t => `<span class="tag tag-${t}">${tagLabel(t)}</span>`).join('');

  const chainHtml = concept.chain.map((step, i) =>
    `<span class="chain-node" title="${step}">${step}</span>${i < concept.chain.length - 1 ? '<span class="chain-arrow">→</span>' : ''}`
  ).join('');

  const factsHtml = concept.facts && concept.facts.length
    ? concept.facts.map(f => `<span class="fact-pill">${f}</span>`).join('')
    : '';

  const detailHtml = concept.detail
    .split('\n')
    .map(line => {
      if (line.startsWith('•')) return `<div style="margin:3px 0 3px 12px;font-size:14px;color:var(--text)">${line}</div>`;
      if (line.trim() === '') return '<div style="height:8px"></div>';
      return `<div style="font-size:14px;margin:2px 0">${line}</div>`;
    })
    .join('');

  card.innerHTML = `
    <div class="concept-card-top">
      <div class="concept-check" title="Mark as learned">✓</div>
      <div class="concept-card-header">
        <div class="concept-title-row">
          <span class="concept-title">${concept.title}</span>
          ${tagsHtml}
        </div>
        <div class="chain">${chainHtml}</div>
        <div class="concept-blurb">${concept.blurb}</div>
      </div>
      <span class="concept-card-expand-icon">▼</span>
    </div>
    <div class="concept-card-body">
      <div class="detail-section">
        <div class="detail-label">How it works</div>
        <div class="detail-text">${detailHtml}</div>
      </div>
      ${concept.memory ? `
      <div class="detail-section">
        <div class="detail-label">Remember it as</div>
        <div class="memory-tip"><span class="memory-tip-icon">💡</span>${concept.memory.replace(/\n/g, '<br>')}</div>
      </div>` : ''}
      ${concept.examTip ? `
      <div class="detail-section">
        <div class="detail-label">Exam focus</div>
        <div class="exam-tip">🎯 ${concept.examTip}</div>
      </div>` : ''}
      ${factsHtml ? `
      <div class="detail-section">
        <div class="detail-label">Quick facts</div>
        <div class="key-facts">${factsHtml}</div>
      </div>` : ''}
      <button class="learn-btn" data-id="${concept.id}">
        ${isLearned ? '✓ Marked as learned' : '○ Mark as learned'}
      </button>
    </div>
  `;

  // Toggle expand
  card.querySelector('.concept-card-top').addEventListener('click', (e) => {
    if (e.target.classList.contains('concept-check')) return;
    card.classList.toggle('expanded');
  });

  // Check button in top
  card.querySelector('.concept-check').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLearned(concept.id, card);
  });

  // Learn button in body
  card.querySelector('.learn-btn').addEventListener('click', () => {
    toggleLearned(concept.id, card);
  });

  return card;
}

// ── Learned toggle ─────────────────────────────────────────────────────────
function toggleLearned(conceptId, cardEl) {
  if (learnedIds.has(conceptId)) {
    learnedIds.delete(conceptId);
    cardEl.classList.remove('learned');
    const btn = cardEl.querySelector('.learn-btn');
    if (btn) btn.textContent = '○ Mark as learned';
  } else {
    learnedIds.add(conceptId);
    cardEl.classList.add('learned');
    const btn = cardEl.querySelector('.learn-btn');
    if (btn) btn.textContent = '✓ Marked as learned';
  }
  saveLearned();
  updateProgressPill();
  updateSectionProgress();
  rebuildSidebarItems();
}

function saveLearned() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...learnedIds]));
}

function updateProgressPill() {
  const total = ALL_CONCEPTS.length;
  const done = learnedIds.size;
  progressPill.innerHTML = `<strong>${done}</strong>/${total} learned`;
}

function updateSectionProgress() {
  const fillEl = document.getElementById('secProgressFill');
  const labelEl = document.getElementById('secProgressLabel');
  if (!fillEl || !currentSection) return;
  const section = SECTIONS.find(s => s.id === currentSection);
  if (!section) return;
  const total = section.concepts.length;
  const done = section.concepts.filter(c => learnedIds.has(c.id)).length;
  const pct = total ? Math.round(done / total * 100) : 0;
  fillEl.style.width = pct + '%';
  if (labelEl) labelEl.textContent = `${done}/${total} concepts learned (${pct}%)`;
}

function rebuildSidebarItems() {
  sidebarEl.querySelectorAll('.sidebar-item[data-concept-id]').forEach(item => {
    const id = item.dataset.conceptId;
    const concept = ALL_CONCEPTS.find(c => c.id === id);
    if (!concept) return;
    if (learnedIds.has(id)) {
      item.style.opacity = '0.6';
      item.innerHTML = `<span>✓ ${concept.title}</span><span class="cert-badge tag tag-${concept.tags[0]}">${tagLabel(concept.tags[0])}</span>`;
    } else {
      item.style.opacity = '';
      item.innerHTML = `<span>${concept.title}</span><span class="cert-badge tag tag-${concept.tags[0]}">${tagLabel(concept.tags[0])}</span>`;
    }
  });
}

// ── Helpers ────────────────────────────────────────────────────────────────
function el(tag, attrs = {}, text = '') {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') e.className = v;
    else e.setAttribute(k, v);
  });
  if (text) e.textContent = text;
  return e;
}

function tagLabel(tag) {
  return { net: 'Net+', sec: 'Sec+', both: 'Both', arch: 'Architect' }[tag] || tag;
}

// ── Particle network background ────────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, mouse = { x: -9999, y: -9999 };
  const COUNT = 55;
  const MAX_DIST = 130;
  const CYAN = '0,200,255';
  const PURPLE = '168,85,247';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - .5) * .45,
      vy: (Math.random() - .5) * .45,
      r: Math.random() * 1.8 + .6,
      color: Math.random() > .35 ? CYAN : PURPLE,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, mkParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update + draw nodes
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      // Mouse repel
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 90) { p.x += dx/d * 1.2; p.y += dy/d * 1.2; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},.7)`;
      ctx.fill();
    });

    // Draw edges
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * .28;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${a.color},${alpha})`;
          ctx.lineWidth = .8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  init();
  draw();
}

// ── Boot ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => { init(); initParticles(); });

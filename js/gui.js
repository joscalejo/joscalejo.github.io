/**
 * GUI Renderer — Visual CV Mode v20.0
 * Features:
 * - Symmetrical 3-Column Skills Matrix
 * - Consistent Monospace Badge/Pill System for Core Tooling & Skills
 * - Semantic 3-Color Taxonomy for Project Tags (Tech=Teal, Domain=Cyan, Target=Violet)
 * - Sticky In-Page Sub-Navigation (01-04 TOC)
 * - Enhanced Action-Oriented Footer
 * - Floating Scroll-to-Top Button
 * - Perfect Vertical Alignment on CWES Certification Card
 */
import { cvData } from './data.js';
import { i18n }   from './i18n.js';
import { showToast } from './terminal.js';

/* ─── Tag Taxonomy Classification ─────────────────────────────── */
function getProjectTagClass(tag) {
  if (/Python|PowerShell|LaTeX|TeX|Bash|JSON|C\+\+/i.test(tag)) return 'tag-tech';
  if (/Living off|LotL|LOLBins|AV Evasion|PTES|OWASP|CVSS|CWE|MITRE|Cryptography|Decod|Password Cracking|Exfiltration/i.test(tag)) return 'tag-domain';
  return 'tag-target';
}

/* ─── Modular Component Renderers ─────────────────────────────── */

function renderTopNavbar(isEs) {
  return `
    <header class="gui-top-navbar" role="banner" aria-label="Navigation">
      <div class="nav-brand-group">
        <span class="nav-user-handle">@o1101ol</span>
        <span class="nav-sep">&bull;</span>
        <span class="nav-status-tag">
          <span class="status-indicator-dot" aria-hidden="true"></span>
          <span>${isEs ? 'Disponible para Roles en Ciberseguridad' : 'Available for Cybersecurity Roles'}</span>
        </span>
      </div>

      <nav class="nav-actions-group" role="navigation" aria-label="Quick Actions">
        <button class="nav-btn-terminal" id="dock-btn-term" title="${isEs ? 'Cambiar a modo terminal interactiva' : 'Switch to interactive terminal mode'}">
          <span class="term-prompt-sym">&gt;_</span>
          <span>${isEs ? 'Terminal' : 'Terminal Mode'}</span>
        </button>

        <div class="nav-divider" aria-hidden="true"></div>

        <button class="nav-btn-action" id="dock-btn-lang" title="${isEs ? 'Cambiar idioma' : 'Toggle language'}">
          <span class="nav-btn-label">LANG</span>
          <span class="nav-btn-val">${isEs ? 'ES' : 'EN'}</span>
        </button>

        <button class="nav-btn-action" id="dock-btn-theme" title="${isEs ? 'Cambiar tema de color' : 'Toggle theme'}">
          <span class="nav-btn-label">THEME</span>
          <span class="nav-btn-val">🎨</span>
        </button>
      </nav>
    </header>
  `;
}

function renderHero(personal, isEs) {
  const toolingList = ["Burp Suite Pro", "WPScan", "interactsh", "subfinder", "httpx", "Python 3"];

  return `
    <header class="dossier-hero-split">
      <div class="hero-main-col">
        <h1 class="hero-name">${personal.name}</h1>
        <div class="hero-role-meta">
          <span class="hero-role-title">${personal.degree}</span>
          <span class="hero-sep">&bull;</span>
          <span class="hero-loc">📍 ${personal.location}</span>
        </div>

        <p class="hero-bio">${personal.bio}</p>

        <div class="hero-actions-bar">
          <a href="mailto:${personal.email}" class="btn-primary-action">
            <span>${isEs ? 'Contactar por Email' : 'Contact via Email'}</span>
            <span class="btn-arrow" aria-hidden="true">&rarr;</span>
          </a>
          <a href="${personal.github}" target="_blank" rel="noopener" class="btn-ghost">
            <span>GitHub</span>
            <span class="ext-icon" aria-hidden="true">&#x2197;</span>
          </a>
          <a href="${personal.linkedin}" target="_blank" rel="noopener" class="btn-ghost">
            <span>LinkedIn</span>
            <span class="ext-icon" aria-hidden="true">&#x2197;</span>
          </a>
          <a href="${personal.htb}" target="_blank" rel="noopener" class="btn-ghost">
            <span>HackTheBox</span>
            <span class="ext-icon" aria-hidden="true">&#x2197;</span>
          </a>
        </div>
      </div>

      <div class="hero-side-card">
        <div class="side-card-header">
          <span class="side-card-icon">⚡</span>
          <span class="side-card-title">${isEs ? 'Perfil & Especialidad' : 'Profile & Specialization'}</span>
        </div>
        <div class="side-card-body">
          <div class="side-item">
            <span class="side-label">${isEs ? 'Enfoque Principal' : 'Primary Focus'}</span>
            <span class="side-val acc1">${isEs ? 'Seguridad Ofensiva & Pentesting Web' : 'Offensive Security & Web Pentesting'}</span>
          </div>
          <div class="side-item">
            <span class="side-label">${isEs ? 'Certificación' : 'Certification'}</span>
            <span class="side-val acc2">HTB CWES Certified (100% Score)</span>
          </div>
          <div class="side-item">
            <span class="side-label">${isEs ? 'Entorno Operativo' : 'Operating Environment'}</span>
            <span class="side-val">${personal.os} / ${personal.wm}</span>
          </div>
          <div class="side-item">
            <span class="side-label">${isEs ? 'Herramientas Clave' : 'Core Tooling'}</span>
            <div class="side-pills-wrap">
              ${toolingList.map(t => `<span class="side-pill">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

function renderSubnav(isEs) {
  return `
    <nav class="dossier-subnav" aria-label="Table of Contents">
      <a href="#sec-certs" class="subnav-link"><span class="subnav-num">01</span> <span>${isEs ? 'Certificaciones' : 'Certifications'}</span></a>
      <a href="#sec-skills" class="subnav-link"><span class="subnav-num">02</span> <span>${isEs ? 'Competencias' : 'Skills'}</span></a>
      <a href="#sec-exp" class="subnav-link"><span class="subnav-num">03</span> <span>${isEs ? 'Trayectoria' : 'Experience'}</span></a>
      <a href="#sec-projects" class="subnav-link"><span class="subnav-num">04</span> <span>${isEs ? 'Proyectos' : 'Projects'}</span></a>
    </nav>
  `;
}

function renderCertifications(certifications, isEs) {
  const cwes = certifications[0] ?? {
    name: "CWES — Certified Web Exploitation Specialist",
    issuer: "Hack The Box",
    year: "Certified",
    url: "https://profile.hackthebox.com/profile/019d50f0-c9c7-7062-bc47-624b5398df67/certificate/HTBCERT-1C4ECB401C?utm_medium=copy_url"
  };

  return `
    <section class="dossier-section" id="sec-certs" aria-labelledby="sec-certs-title">
      <div class="section-heading">
        <span class="sec-num">01 //</span>
        <h2 id="sec-certs-title" class="sec-title">${isEs ? 'Certificaciones & Acreditación Profesional' : 'Official Certifications & Verification'}</h2>
      </div>

      <div class="certifications-dossier-list">
        <!-- CWES Full-Width Breakdown Card -->
        <article class="cert-breakdown-card">
          <div class="cert-badge-column">
            <div class="cert-img-container">
              <img src="assets/cwes_badge.png" alt="Official Hack The Box CWES Certification Badge" class="cert-badge-img" />
            </div>
            <a href="${cwes.url}" target="_blank" rel="noopener" class="btn-verify-cert">
              <span>${isEs ? 'Verificar Credencial' : 'Verify Credential'}</span>
              <span class="ext-icon">&#x2197;</span>
            </a>
          </div>

          <div class="cert-content-column">
            <div class="cert-status-row">
              <span class="cert-verified-pill">
                <span class="status-indicator-dot"></span>
                <span>${isEs ? 'Certificación Oficial Activa' : 'Official Active Credential'}</span>
              </span>
              <span class="cert-id-tag">ID: HTBCERT-1C4ECB401C</span>
              <span class="cert-issuer-tag">Hack The Box</span>
            </div>

            <h3 class="cert-heading-title">${cwes.name}</h3>

            <p class="cert-summary-desc">
              ${isEs 
                ? 'Acreditación profesional avanzada de seguridad ofensiva otorgada por <strong>Hack The Box</strong> tras resolver el <strong>100% de las preguntas y desafíos prácticos</strong> en entornos web reales bajo tiempo límite estricto.' 
                : 'Advanced hands-on offensive security certification awarded by <strong>Hack The Box</strong>, achieved by solving <strong>100% of all practical examination questions</strong> under rigorous, timed real-world web exploitation environments.'}
            </p>

            <div class="cert-competencies-block">
              <div class="comp-label">${isEs ? 'Dominios & Habilidades Evaluadas:' : 'Assessed Domains & Key Capabilities:'}</div>
              <ul class="comp-list-grid">
                <li><span>&bull;</span> ${isEs ? 'Explotación avanzada de vulnerabilidades (SQLi, Blind SQLi, XSS, SSRF, SSTI, XXE, CSRF)' : 'Advanced vulnerability exploitation (SQLi, Blind SQLi, XSS, SSRF, SSTI, XXE, CSRF)'}</li>
                <li><span>&bull;</span> ${isEs ? 'Bypass y evasión de filtros de sanitización e input validation (WAF / Filter Evasion)' : 'Sanitization and input validation bypass techniques (WAF / Filter Evasion)'}</li>
                <li><span>&bull;</span> ${isEs ? 'Explotación de fallas de autenticación, sesiones y autorización (Broken Auth / IDOR)' : 'Authentication, session management and authorization exploitation (Broken Auth / IDOR)'}</li>
                <li><span>&bull;</span> ${isEs ? 'Ejecución Remota de Código (RCE), File Inclusion (LFI/RFI) y escalada de privilegios' : 'Remote Code Execution (RCE), File Inclusion (LFI/RFI) and privilege escalation'}</li>
                <li><span>&bull;</span> ${isEs ? 'Análisis de código fuente y auditorías de seguridad en aplicaciones web' : 'Source code review and comprehensive web application security assessments'}</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderSkills(skills, isEs) {
  return `
    <section class="dossier-section" id="sec-skills" aria-labelledby="sec-skills-title">
      <div class="section-heading">
        <span class="sec-num">02 //</span>
        <h2 id="sec-skills-title" class="sec-title">${isEs ? 'Competencias Técnicas' : 'Technical Competencies'}</h2>
      </div>

      <div class="skills-columns-grid">
        ${skills.map(g => `
          <div class="skill-category-box">
            <div class="skill-box-head">
              <span class="skill-prompt-sym">&gt;</span>
              <h3 class="skill-box-title">${g.category}</h3>
            </div>
            <div class="skill-tags-group">
              ${g.items.map(item => `<span class="skill-chip-tag">${item}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderExperience(experience, education, isEs) {
  const combined = [...experience, ...education];
  return `
    <section class="dossier-section" id="sec-exp" aria-labelledby="sec-exp-title">
      <div class="section-heading">
        <span class="sec-num">03 //</span>
        <h2 id="sec-exp-title" class="sec-title">${isEs ? 'Trayectoria & Formación Académica' : 'Experience & Academic Training'}</h2>
      </div>

      <div class="timeline-dossier">
        ${combined.map(e => `
          <article class="timeline-row-item">
            <div class="timeline-time-col">
              <span class="timeline-period-badge">${e.period}</span>
            </div>
            <div class="timeline-detail-col">
              <h3 class="timeline-entry-title">${e.role ?? e.degree}</h3>
              <div class="timeline-institution">${e.company ?? e.institution}</div>
              <div class="timeline-entry-desc">${e.description.split('\n').map(line => `<p style="margin: .35rem 0;">${line}</p>`).join('')}</div>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function renderProjects(projects, isEs) {
  return `
    <section class="dossier-section" id="sec-projects" aria-labelledby="sec-projects-title">
      <div class="section-heading">
        <span class="sec-num">04 //</span>
        <h2 id="sec-projects-title" class="sec-title">${isEs ? 'Proyectos & Repositorios de Seguridad' : 'Projects & Security Repositories'}</h2>
      </div>

      <div class="projects-dossier-grid">
        ${projects.map(p => `
          <article class="project-dossier-card">
            <div class="project-dossier-top">
              <h3 class="project-heading">${p.title}</h3>
              ${p.github !== '#' ? `
                <a href="${p.github}" target="_blank" rel="noopener" class="project-repo-btn">
                  <span>GitHub</span>
                  <span class="ext-icon">&#x2197;</span>
                </a>` : ''}
            </div>
            <div class="project-summary">${p.description.split('\n').map(line => `<p style="margin: .3rem 0;">${line}</p>`).join('')}</div>
            <div class="project-pills-row">
              ${p.tags.map(t => `<span class="project-pill ${getProjectTagClass(t)}">${t}</span>`).join('')}
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function renderFooter(personal, isEs) {
  return `
    <footer class="dossier-footer">
      <div class="footer-cta-card">
        <h3 class="footer-cta-title">${isEs ? '¿Interesado en mi perfil para prácticas o proyectos?' : 'Interested in my profile for internships or security projects?'}</h3>
        <p class="footer-cta-desc">${isEs ? 'Disponible para prácticas preprofesionales en Pentesting Web, AppSec y consultoría ofensiva.' : 'Available for pre-professional internships in Web Pentesting, AppSec, and offensive security consulting.'}</p>
        <div class="hero-actions-bar" style="justify-content: center; margin-top: 1.25rem;">
          <a href="mailto:${personal.email}" class="btn-primary-action">
            <span>${isEs ? 'Contactar por Email' : 'Contact via Email'}</span>
            <span class="btn-arrow" aria-hidden="true">&rarr;</span>
          </a>
          <a href="${personal.github}" target="_blank" rel="noopener" class="btn-ghost">
            <span>GitHub</span>
            <span class="ext-icon" aria-hidden="true">&#x2197;</span>
          </a>
          <a href="${personal.linkedin}" target="_blank" rel="noopener" class="btn-ghost">
            <span>LinkedIn</span>
            <span class="ext-icon" aria-hidden="true">&#x2197;</span>
          </a>
          <a href="${personal.htb}" target="_blank" rel="noopener" class="btn-ghost">
            <span>HackTheBox</span>
            <span class="ext-icon" aria-hidden="true">&#x2197;</span>
          </a>
        </div>
      </div>

      <div class="dossier-footer-content">
        <span class="foot-author">${personal.name} (@o1101ol)</span>
        <span class="foot-sep">&bull;</span>
        <span class="foot-spec">${isEs ? 'Ingeniería de Ciberseguridad' : 'Cybersecurity Engineering'}</span>
        <span class="foot-sep">&bull;</span>
        <span class="foot-year">© 2026</span>
      </div>
    </footer>

    <!-- Floating Scroll-To-Top Button -->
    <button id="btn-scroll-top" class="btn-scroll-top" title="${isEs ? 'Volver al inicio' : 'Scroll to top'}" aria-label="Scroll to top">
      ▲
    </button>
  `;
}

/* ─── Main GUI Orchestrator ───────────────────────────────────── */
export function renderGUI(container, app) {
  const d    = cvData[i18n.currentLang];
  const isEs = i18n.currentLang === 'es';

  container.innerHTML = `
    ${renderTopNavbar(isEs)}
    <main class="gui-master-dossier" role="main">
      ${renderHero(d.personal, isEs)}
      ${renderSubnav(isEs)}
      ${renderCertifications(d.certifications, isEs)}
      ${renderSkills(d.skills, isEs)}
      ${renderExperience(d.experience, d.education, isEs)}
      ${renderProjects(d.projects, isEs)}
      ${renderFooter(d.personal, isEs)}
    </main>
  `;

  // Event binding for Top Navbar & Footer controls
  if (app) {
    document.getElementById('dock-btn-term')?.addEventListener('click', () => app.setView('cli'));

    document.getElementById('dock-btn-lang')?.addEventListener('click', () => {
      app.setLang(i18n.currentLang === 'es' ? 'en' : 'es');
    });

    document.getElementById('dock-btn-theme')?.addEventListener('click', () => {
      const THEMES = ['obsidian','matrix','cyberpunk','dracula','nord','light'];
      const idx = THEMES.indexOf(app.currentTheme);
      app.setTheme(THEMES[(idx + 1) % THEMES.length]);
    });

    container.querySelectorAll('.btn-copy-email-gui').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.copy;
        if (text) {
          navigator.clipboard?.writeText(text).catch(() => {});
          showToast(i18n.t('copiedEmail'));
        }
      });
    });

    // Scroll to Top logic
    const scrollBtn = document.getElementById('btn-scroll-top');
    if (scrollBtn) {
      const handleScroll = () => {
        if (window.scrollY > 320) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
}

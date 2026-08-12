/**
 * Main Application Coordinator
 * Links UI views, themes, i18n, and user interactions.
 */

import { cvData } from './data.js';
import { i18n } from './i18n.js';
import { TerminalEngine } from './terminal.js';

class Application {
  constructor() {
    this.currentView = 'cli'; // 'cli' or 'gui'
    this.currentTheme = 'obsidian';

    this.initDOMReferences();
    this.terminal = new TerminalEngine(this.dom.terminalOutput, this.dom.cliInput, this);
    this.initEventListeners();
    
    // Initial Render
    this.terminal.printWelcomeBanner();
    this.renderGUI();
  }

  initDOMReferences() {
    this.dom = {
      terminalView: document.getElementById('terminal-view'),
      guiView: document.getElementById('gui-view'),
      terminalOutput: document.getElementById('terminal-output'),
      cliInput: document.getElementById('cli-input'),
      
      btnToggleView: document.getElementById('btn-toggle-view'),
      btnLang: document.getElementById('btn-lang'),
      btnTheme: document.getElementById('btn-theme'),
      btnPdf: document.getElementById('btn-pdf'),
      
      quickTagsContainer: document.getElementById('quick-tags-container'),
      guiContainer: document.getElementById('gui-content')
    };
  }

  initEventListeners() {
    // Toggle CLI / GUI
    this.dom.btnToggleView.addEventListener('click', () => {
      this.toggleView(this.currentView === 'cli' ? 'gui' : 'cli');
    });

    // Language Toggle
    this.dom.btnLang.addEventListener('click', () => {
      const nextLang = i18n.currentLang === 'es' ? 'en' : 'es';
      this.setLanguage(nextLang);
    });

    // Theme Toggle
    this.dom.btnTheme.addEventListener('click', () => {
      const themes = ['obsidian', 'matrix', 'dracula', 'light'];
      const idx = themes.indexOf(this.currentTheme);
      const nextTheme = themes[(idx + 1) % themes.length];
      this.setTheme(nextTheme);
    });

    // Print PDF
    this.dom.btnPdf.addEventListener('click', () => {
      window.print();
    });

    // Quick tag command buttons click
    this.dom.quickTagsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-tag')) {
        const cmd = e.target.getAttribute('data-cmd');
        if (cmd) {
          this.terminal.executeCommand(cmd);
        }
      }
    });
  }

  toggleView(view) {
    this.currentView = view;
    if (view === 'gui') {
      this.dom.terminalView.style.display = 'none';
      this.dom.guiView.style.display = 'flex';
      this.dom.btnToggleView.textContent = i18n.t('btnTerminal');
      this.dom.btnToggleView.classList.add('active');
      this.renderGUI();
    } else {
      this.dom.guiView.style.display = 'none';
      this.dom.terminalView.style.display = 'flex';
      this.dom.btnToggleView.textContent = i18n.t('btnGui');
      this.dom.btnToggleView.classList.remove('active');
      this.dom.cliInput.focus();
    }
  }

  setLanguage(lang) {
    i18n.setLanguage(lang);
    this.dom.btnLang.textContent = i18n.t('btnLang');
    if (this.currentView === 'gui') {
      this.dom.btnToggleView.textContent = i18n.t('btnTerminal');
      this.renderGUI();
    } else {
      this.dom.btnToggleView.textContent = i18n.t('btnGui');
    }
    this.terminal.printLine(`<span style="color: var(--accent-primary);">${i18n.t('langSwitched')}</span>`);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  renderGUI() {
    const data = cvData[i18n.currentLang];
    const isEs = i18n.currentLang === 'es';

    const html = `
      <!-- Hero Section -->
      <section class="gui-hero">
        <div>
          <h1 class="hero-title">${data.personal.name}</h1>
          <div class="hero-role">⚡ ${data.personal.title}</div>
          <p class="hero-bio">${data.personal.bio}</p>
          <div class="hero-actions">
            <a href="mailto:${data.personal.email}" class="btn-primary">✉️ ${isEs ? 'Contactar' : 'Contact Me'}</a>
            <a href="${data.personal.github}" target="_blank" rel="noopener" class="btn-outline">GitHub ↗</a>
            <a href="${data.personal.linkedin}" target="_blank" rel="noopener" class="btn-outline">LinkedIn ↗</a>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="gui-section">
        <h2 class="section-header">
          <span class="section-icon">🛠️</span> ${isEs ? 'Habilidades & Tecnologías' : 'Skills & Tech Stack'}
        </h2>
        <div class="skills-container">
          ${data.skills.map(group => `
            <div>
              <div class="skill-group-title"># ${group.category}</div>
              <div class="badge-grid">
                ${group.items.map(item => `<span class="cli-badge cli-badge-accent">${item}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Experience Section -->
      <section class="gui-section">
        <h2 class="section-header">
          <span class="section-icon">💼</span> ${isEs ? 'Experiencia Laboral' : 'Work Experience'}
        </h2>
        <div class="timeline">
          ${data.experience.map(exp => `
            <div class="timeline-item">
              <div class="timeline-date">${exp.period}</div>
              <div class="timeline-role">${exp.role}</div>
              <div class="timeline-company">${exp.company}</div>
              <div class="timeline-desc">${exp.description}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Projects Section -->
      <section class="gui-section">
        <h2 class="section-header">
          <span class="section-icon">🚀</span> ${isEs ? 'Proyectos Destacados' : 'Featured Projects'}
        </h2>
        <div class="projects-grid">
          ${data.projects.map(p => `
            <div class="project-card">
              <div>
                <div class="project-title">📦 ${p.title}</div>
                <div class="project-desc">${p.description}</div>
              </div>
              <div>
                <div class="project-tags">
                  ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <div class="project-links">
                  ${p.github !== '#' ? `<a href="${p.github}" target="_blank" rel="noopener" class="project-link-btn">GitHub ↗</a>` : ''}
                  ${p.demo !== '#' ? `<a href="${p.demo}" target="_blank" rel="noopener" class="project-link-btn">Live Demo ↗</a>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Education Section -->
      <section class="gui-section">
        <h2 class="section-header">
          <span class="section-icon">🎓</span> ${isEs ? 'Educación' : 'Education'}
        </h2>
        <div class="timeline">
          ${data.education.map(edu => `
            <div class="timeline-item">
              <div class="timeline-date">${edu.period}</div>
              <div class="timeline-role">${edu.degree}</div>
              <div class="timeline-company">${edu.institution}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <footer class="app-footer">
        <p>© ${new Date().getFullYear()} ${data.personal.name} | joscalejo.github.io</p>
      </footer>
    `;

    this.dom.guiContainer.innerHTML = html;
  }
}

// Bootstrap Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new Application();
});

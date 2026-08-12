/**
 * Terminal Core Engine
 * Handles CLI command execution, history, tab autocompletion, and output formatting.
 */

import { cvData } from './data.js';
import { i18n } from './i18n.js';

export class TerminalEngine {
  constructor(outputEl, inputEl, appInstance) {
    this.outputEl = outputEl;
    this.inputEl = inputEl;
    this.app = appInstance;
    
    this.history = [];
    this.historyIndex = -1;
    this.availableCommands = [
      'whoami', 'cat bio.txt', 'skills', 'projects', 
      'experience', 'contact', 'gui', 'theme', 
      'lang', 'pdf', 'clear', 'help'
    ];
    
    this.themes = ['obsidian', 'matrix', 'dracula', 'light'];
    this.currentThemeIndex = 0;

    this.initEvents();
  }

  initEvents() {
    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = this.inputEl.value.trim();
        this.executeCommand(command);
        this.inputEl.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.navigateHistory('up');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.navigateHistory('down');
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.autoComplete();
      }
    });

    // Keep terminal focused when clicking anywhere in terminal body
    this.outputEl.parentElement.addEventListener('click', (e) => {
      if (!window.getSelection().toString()) {
        this.inputEl.focus();
      }
    });
  }

  navigateHistory(direction) {
    if (this.history.length === 0) return;

    if (direction === 'up') {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
      }
    } else if (direction === 'down') {
      if (this.historyIndex > 0) {
        this.historyIndex--;
      } else if (this.historyIndex === 0) {
        this.historyIndex = -1;
        this.inputEl.value = '';
        return;
      }
    }

    if (this.historyIndex >= 0) {
      this.inputEl.value = this.history[this.history.length - 1 - this.historyIndex];
    }
  }

  autoComplete() {
    const val = this.inputEl.value.toLowerCase().trim();
    if (!val) return;

    const matches = this.availableCommands.filter(c => c.startsWith(val));
    if (matches.length === 1) {
      this.inputEl.value = matches[0];
    } else if (matches.length > 1) {
      this.printLine(`<div class="cli-badge-grid">${matches.map(m => `<span class="cli-badge">${m}</span>`).join(' ')}</div>`);
    }
  }

  executeCommand(cmdStr) {
    if (!cmdStr) {
      this.printPromptLine('');
      return;
    }

    // Save to history
    this.history.push(cmdStr);
    this.historyIndex = -1;

    // Print command line
    this.printPromptLine(cmdStr);

    const parts = cmdStr.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const data = cvData[i18n.currentLang];

    switch (cmd) {
      case 'whoami':
      case 'bio':
        this.printWhoami(data);
        break;

      case 'cat':
        if (args[0] === 'bio.txt' || args[0] === 'bio') {
          this.printWhoami(data);
        } else {
          this.printLine(`cat: ${args.join(' ')}: No such file or directory. Try 'cat bio.txt'`);
        }
        break;

      case 'skills':
        this.printSkills(data);
        break;

      case 'projects':
        this.printProjects(data);
        break;

      case 'experience':
      case 'history':
        this.printExperience(data);
        break;

      case 'contact':
        this.printContact(data);
        break;

      case 'gui':
        this.app.toggleView('gui');
        break;

      case 'theme':
        if (args.length > 0 && this.themes.includes(args[0].toLowerCase())) {
          this.app.setTheme(args[0].toLowerCase());
          this.printLine(`${i18n.t('themeSwitched')} [${args[0]}].`);
        } else {
          // Cycle to next theme
          this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
          const nextTheme = this.themes[this.currentThemeIndex];
          this.app.setTheme(nextTheme);
          this.printLine(`${i18n.t('themeSwitched')} [${nextTheme}].`);
        }
        break;

      case 'lang':
        if (args[0]) {
          const l = args[0].toLowerCase();
          if (l === 'es' || l === 'en') {
            this.app.setLanguage(l);
            this.printLine(i18n.t('langSwitched'));
          } else {
            this.printLine("Uso / Usage: lang [es|en]");
          }
        } else {
          const nextLang = i18n.currentLang === 'es' ? 'en' : 'es';
          this.app.setLanguage(nextLang);
          this.printLine(i18n.t('langSwitched'));
        }
        break;

      case 'pdf':
      case 'download':
        this.printLine(i18n.t('pdfNotice'));
        setTimeout(() => window.print(), 500);
        break;

      case 'clear':
        this.outputEl.innerHTML = '';
        break;

      case 'help':
        this.printHelp();
        break;

      default:
        this.printLine(`<span style="color: var(--status-error);">${i18n.t('cmdNotFound')} '${cmdStr}'</span>`);
        this.printLine(i18n.t('typeHelp'));
        break;
    }

    this.scrollToBottom();
  }

  printPromptLine(cmdText) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `
      <span class="prompt-container">
        <span class="prompt-user">joscalejo</span><span class="prompt-at">@</span><span class="prompt-host">github</span>:<span class="prompt-path">~</span><span class="prompt-char">$</span>
      </span>
      <span>${this.escapeHTML(cmdText)}</span>
    `;
    this.outputEl.appendChild(line);
  }

  printLine(htmlContent) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = htmlContent;
    this.outputEl.appendChild(line);
  }

  printWelcomeBanner() {
    const ascii = `
     _                     _     _         
    (_)                   | |   (_)        
     _  ___  ___  __ _ ___| | ___  ___     
    | |/ _ \\/ __|/ _\` / __| |/ / |/ _ \\    
    | | (_) \\__ \\ (_| \\__ \\   <| | (_) |   
    | |\\___/|___/\\__,_|___/_|\\_\\_|\\___/    
   _/ |                                    
  |__/  - Linux Terminal CV v2.0
`;
    this.printLine(`<pre class="ascii-banner">${ascii}</pre>`);
    this.printLine(`
      <div class="welcome-box">
        <div style="font-weight: 700; color: var(--accent-primary); font-size: 1.05rem; margin-bottom: 0.2rem;">
          ${i18n.t('welcomeBannerTitle')}
        </div>
        <div style="color: var(--text-secondary); font-size: 0.88rem;">
          ${i18n.t('welcomeHint')}
        </div>
      </div>
    `);
    this.printHelp();
  }

  printWhoami(data) {
    this.printLine(`
      <div style="margin: 0.5rem 0;">
        <div class="output-title">⚡ ${data.personal.name} (${data.personal.handle})</div>
        <div class="output-subtitle">${data.personal.title}</div>
        <p style="color: var(--text-secondary); max-width: 65ch; margin: 0.5rem 0;">${data.personal.bio}</p>
        <div class="badge-grid" style="margin-top: 0.8rem;">
          <span class="cli-badge cli-badge-accent">📍 ${data.personal.location}</span>
          <span class="cli-badge">✉️ ${data.personal.email}</span>
        </div>
      </div>
    `);
  }

  printSkills(data) {
    let html = `<div class="output-title">🛠️ ${i18n.currentLang === 'es' ? 'Habilidades Técnicas' : 'Technical Skills'}</div>`;
    data.skills.forEach(group => {
      html += `
        <div style="margin-top: 0.6rem;">
          <div class="output-subtitle"># ${group.category}</div>
          <div class="badge-grid">
            ${group.items.map(skill => `<span class="cli-badge cli-badge-accent">${skill}</span>`).join('')}
          </div>
        </div>
      `;
    });
    this.printLine(html);
  }

  printProjects(data) {
    let html = `<div class="output-title">🚀 ${i18n.currentLang === 'es' ? 'Proyectos Destacados' : 'Featured Projects'}</div>`;
    data.projects.forEach(p => {
      html += `
        <div class="cli-project-card">
          <div class="cli-project-title">
            <span>📦 ${p.title}</span>
            ${p.github !== '#' ? `<a href="${p.github}" target="_blank" rel="noopener" class="cli-project-link">GitHub ↗</a>` : ''}
          </div>
          <div style="color: var(--text-secondary); font-size: 0.88rem; margin: 0.4rem 0;">${p.description}</div>
          <div class="badge-grid">
            ${p.tags.map(t => `<span class="cli-badge">${t}</span>`).join('')}
          </div>
        </div>
      `;
    });
    this.printLine(html);
  }

  printExperience(data) {
    let html = `<div class="output-title">💼 ${i18n.currentLang === 'es' ? 'Experiencia & Educación' : 'Experience & Education'}</div>`;
    data.experience.forEach(exp => {
      html += `
        <div style="margin-top: 0.8rem; border-left: 2px solid var(--accent-primary); padding-left: 0.8rem;">
          <div style="font-weight: 700; color: var(--text-primary);">${exp.role}</div>
          <div style="color: var(--accent-secondary); font-size: 0.85rem;">${exp.company} | ${exp.period}</div>
          <div style="color: var(--text-secondary); font-size: 0.88rem; margin-top: 0.3rem;">${exp.description}</div>
        </div>
      `;
    });
    data.education.forEach(edu => {
      html += `
        <div style="margin-top: 0.8rem; border-left: 2px solid var(--accent-tertiary); padding-left: 0.8rem;">
          <div style="font-weight: 700; color: var(--text-primary);">${edu.degree}</div>
          <div style="color: var(--text-muted); font-size: 0.85rem;">${edu.institution} | ${edu.period}</div>
        </div>
      `;
    });
    this.printLine(html);
  }

  printContact(data) {
    this.printLine(`
      <div class="output-title">📬 ${i18n.currentLang === 'es' ? 'Información de Contacto' : 'Contact Information'}</div>
      <table class="cli-table">
        <tr><th>Channel</th><th>Link / Detail</th></tr>
        <tr><td>Email</td><td><a href="mailto:${data.personal.email}" style="color: var(--accent-secondary);">${data.personal.email}</a></td></tr>
        <tr><td>GitHub</td><td><a href="${data.personal.github}" target="_blank" style="color: var(--accent-secondary);">${data.personal.github}</a></td></tr>
        <tr><td>LinkedIn</td><td><a href="${data.personal.linkedin}" target="_blank" style="color: var(--accent-secondary);">${data.personal.linkedin}</a></td></tr>
      </table>
    `);
  }

  printHelp() {
    const isEs = i18n.currentLang === 'es';
    const commandsList = [
      { cmd: 'whoami', desc: isEs ? 'Ver biografía y descripción del perfil' : 'View personal profile bio' },
      { cmd: 'skills', desc: isEs ? 'Ver habilidades técnicas y tecnologías' : 'View tech stack & skills' },
      { cmd: 'projects', desc: isEs ? 'Explorar el portafolio de proyectos' : 'Explore portfolio projects' },
      { cmd: 'experience', desc: isEs ? 'Ver trayectoria laboral y formación' : 'View work experience & education' },
      { cmd: 'contact', desc: isEs ? 'Obtener enlaces de contacto y redes' : 'Get contact info & links' },
      { cmd: 'gui', desc: isEs ? 'Cambiar a la vista visual clásica (CV GUI)' : 'Switch to classic GUI visual view' },
      { cmd: 'theme', desc: isEs ? 'Cambiar tema (obsidian, matrix, dracula, light)' : 'Toggle theme palette' },
      { cmd: 'lang [es|en]', desc: isEs ? 'Cambiar el idioma del sitio' : 'Switch site language' },
      { cmd: 'pdf', desc: isEs ? 'Generar / Imprimir versión PDF del CV' : 'Print or download PDF CV' },
      { cmd: 'clear', desc: isEs ? 'Limpiar pantalla de la consola' : 'Clear console screen' },
      { cmd: 'help', desc: isEs ? 'Mostrar esta guía de comandos' : 'Display help menu' }
    ];

    let html = `<div class="output-subtitle">⚡ ${i18n.t('availableCommands')}:</div><table class="cli-table">`;
    commandsList.forEach(c => {
      html += `<tr><td style="color: var(--accent-primary); font-weight: 700; width: 140px;">${c.cmd}</td><td style="color: var(--text-secondary);">${c.desc}</td></tr>`;
    });
    html += `</table>`;
    this.printLine(html);
  }

  scrollToBottom() {
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

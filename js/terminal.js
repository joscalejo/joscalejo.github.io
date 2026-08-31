/**
 * Terminal Engine — Pure Terminal CLI Experience v22.0
 * Responsive TUI Layouts, Real-time Zsh Autosuggestions & Fuzzy Correction.
 */
import { cvData } from './data.js';
import { i18n }   from './i18n.js';

const THEMES = ['obsidian', 'matrix', 'cyberpunk', 'dracula', 'nord', 'light'];
const CMDS   = ['fastfetch', 'neofetch', 'whoami', 'skills', 'certifications', 'projects', 'experience', 'contact', 'cv', 'gui', 'theme', 'lang', 'pdf', 'clear', 'help'];

/* ─── Levenshtein & Fuzzy Match Utility ──────────────────────── */
function levenshtein(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function getBestMatch(input, list) {
  const target = input.toLowerCase().trim();
  if (!target) return null;
  let best = null;
  let minScore = Infinity;

  for (const item of list) {
    if (item.startsWith(target)) return item;
    if (target.startsWith(item)) return item;
    const dist = levenshtein(target, item);
    if (dist < minScore && dist <= 3) {
      minScore = dist;
      best = item;
    }
  }
  return best;
}

/* ─── Global Toast Notification Helper ──────────────────────── */
export function showToast(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = 'toast-msg';
  el.innerHTML = `<span>✓</span> <span>${msg}</span>`;
  container.appendChild(el);

  setTimeout(() => {
    el.classList.add('toast-hiding');
    setTimeout(() => el.remove(), 260);
  }, 3000);
}

export class TerminalEngine {
  constructor(outputEl, inputEl, promptEl, app) {
    this.outputEl  = outputEl;
    this.inputEl   = inputEl;
    this.promptEl  = promptEl;
    this.ghostEl   = document.getElementById('cli-ghost-text');
    this.bodyEl    = document.getElementById('term-body') || document.getElementById('terminal-body');
    this.app       = app;
    this.history   = [];
    this.histIdx   = -1;
    this.activeCmd = null; // Currently rendered command in full view mode
    this.state     = 'menu'; // 'menu' | 'view'

    if (this.inputEl) {
      this._bindEvents();
    }
  }

  _bindEvents() {
    // Real-time input for Zsh-style Ghost Autosuggestion
    this.inputEl.addEventListener('input', () => {
      this._updateGhost();
    });

    // Command input handling
    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const raw = this.inputEl.value.trim();
        this.inputEl.value = '';
        this._updateGhost();
        if (raw) {
          this.history.unshift(raw);
          this.histIdx = -1;
          this.run(raw);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.histIdx < this.history.length - 1) {
          this.histIdx++;
          this.inputEl.value = this.history[this.histIdx];
          this._updateGhost();
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.histIdx > 0) {
          this.histIdx--;
          this.inputEl.value = this.history[this.histIdx];
          this._updateGhost();
        } else {
          this.histIdx = -1;
          this.inputEl.value = '';
          this._updateGhost();
        }
      } else if (e.key === 'ArrowRight') {
        // Accept ghost suggestion if cursor is at the end
        if (this.inputEl.selectionStart === this.inputEl.value.length) {
          const suggestion = this._getGhostMatch();
          if (suggestion && suggestion !== this.inputEl.value.trim().toLowerCase()) {
            e.preventDefault();
            this.inputEl.value = suggestion;
            this._updateGhost();
          }
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const suggestion = this._getGhostMatch();
        if (suggestion && suggestion !== this.inputEl.value.trim().toLowerCase()) {
          this.inputEl.value = suggestion;
          this._updateGhost();
        } else {
          this._autoComplete();
        }
      } else if (e.key === 'Escape') {
        // Pressing Escape exits dedicated view or clears input
        if (this.state === 'view') {
          this.showMenu();
        } else {
          this.inputEl.value = '';
          this._updateGhost();
        }
      }
    });

    // Delegate clicks on interactive buttons & suggestions
    this.outputEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.cmd-link, .did-you-mean-link');
      if (btn) {
        const cmd = btn.dataset.cmd;
        if (cmd) this.run(cmd);
        return;
      }

      const copyBtn = e.target.closest('.btn-copy-email');
      if (copyBtn) {
        const text = copyBtn.dataset.copy;
        if (text) {
          navigator.clipboard?.writeText(text).catch(() => {});
          showToast(i18n.t('copiedEmail'));
        }
        return;
      }

      const backBtn = e.target.closest('.btn-legacy-exit, .btn-back');
      if (backBtn) {
        this.showMenu();
        return;
      }
    });

    // Auto-focus input when clicking inside terminal body
    this.bodyEl.addEventListener('click', (e) => {
      if (!e.target.closest('a, button, input')) {
        this.inputEl.focus();
      }
    });
  }

  _getGhostMatch() {
    const val = this.inputEl.value.trim().toLowerCase();
    if (!val) return null;
    return CMDS.find(c => c.startsWith(val)) ?? null;
  }

  _updateGhost() {
    if (!this.ghostEl) return;
    const val = this.inputEl.value;
    const match = this._getGhostMatch();

    if (val && match && match.startsWith(val.toLowerCase()) && match !== val.toLowerCase()) {
      const invisible = this._esc(val);
      const remainder = this._esc(match.slice(val.length));
      this.ghostEl.innerHTML = `<span style="visibility:hidden">${invisible}</span><span>${remainder}</span>`;
    } else {
      this.ghostEl.innerHTML = '';
    }
  }

  _autoComplete() {
    const val = this.inputEl.value.trim().toLowerCase();
    if (!val) return;
    const match = CMDS.find(c => c.startsWith(val));
    if (match) {
      this.inputEl.value = match;
      this._updateGhost();
    }
  }

  /* ─── Command Router ─────────────────────────────────────────── */
  run(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    this.inputEl.value = '';
    this._updateGhost();

    // Check for exit commands (:q, q, back, menu, menú, exit)
    if (trimmed === ':q' || trimmed === 'q' || trimmed === 'back' || trimmed === 'menu' || trimmed === 'menú' || trimmed === 'exit') {
      this.showMenu();
      return;
    }

    const parts = trimmed.split(/\s+/);
    const cmd   = parts[0].toLowerCase();
    const args  = parts.slice(1);
    const d     = cvData[i18n.currentLang];

    switch (cmd) {
      case 'fastfetch':
      case 'neofetch':       this.showView('fastfetch', () => this._fastfetch(d)); break;
      case 'whoami':         this.showView('whoami', () => this._whoami(d)); break;
      case 'skills':         this.showView('skills', () => this._skills(d)); break;
      case 'certifications': this.showView('certifications', () => this._certifications(d)); break;
      case 'projects':       this.showView('projects', () => this._projects(d)); break;
      case 'experience':     this.showView('experience', () => this._experience(d)); break;
      case 'contact':        this.showView('contact', () => this._contact(d)); break;
      case 'cv':
      case 'resume':
      case 'curriculum':
      case 'dossier':
      case 'gui':            this.app.setView('gui'); break;
      case 'theme':          this._theme(args[0]); break;
      case 'lang':           this._lang(args[0]); break;
      case 'pdf':            this._pdf(); break;
      case 'clear':          this.showMenu(); break;
      case 'help':           this.showMenu(); break;
      default: {
        const bestMatch = getBestMatch(cmd, CMDS);
        let didYouMeanHtml = '';
        if (bestMatch && bestMatch !== cmd) {
          didYouMeanHtml = `
            <div class="did-you-mean-box">
              <span>${i18n.t('didYouMean')}</span>
              <button class="did-you-mean-link" data-cmd="${bestMatch}">&gt; ${bestMatch}</button>
              <span class="dim">(${i18n.t('clickToRun')})</span>
            </div>`;
        }
        this._printRaw(`
          <div style="margin:.4rem 0;">
            <span class="err">bash: ${this._esc(cmd)}: ${i18n.t('cmdNotFound')}</span>
            ${didYouMeanHtml}
            <div class="dim" style="margin-top:.25rem;">${this.state === 'view' ? i18n.t('viewInvalidCmdHelp') : i18n.t('typeHelp')}</div>
          </div>`);
        this._scroll();
        break;
      }
    }
  }

  /* ─── Show Main Menu (Clear screen & render banner + help) ──── */
  showMenu() {
    this.state = 'menu';
    this.activeCmd = null;
    this.outputEl.innerHTML = '';
    this.inputEl.placeholder = i18n.t('placeholderMenu');
    this._updateGhost();
    this._printBanner();
    this._help();
    this.inputEl.focus({ preventScroll: true });
    this.bodyEl.scrollTop = 0;
  }

  /* ─── Show Dedicated View (Clear screen & render ONLY section) ── */
  showView(cmdName, renderFn) {
    this.state = 'view';
    this.activeCmd = cmdName;
    this.outputEl.innerHTML = '';
    this.inputEl.placeholder = i18n.t('placeholderView');

    const isEs = i18n.currentLang === 'es';

    // Top Navigation Header inside dedicated view (Single clean breadcrumb bar)
    const headerHtml = `
      <div class="view-status-bar top">
        <button class="btn-legacy-exit" title="${i18n.t('backToMenuTip')}">
          <span class="acc1">◄</span> <span>${i18n.t('backToMenu')}</span> <span class="acc2">[:q]</span>
        </button>
        <span class="status-bar-tag"><span class="dim">${isEs ? 'MENÚ' : 'MENU'} ›</span> <span class="acc1">${cmdName.toUpperCase()}</span></span>
      </div>
    `;

    this._printRaw(headerHtml);
    renderFn();
    this.inputEl.focus({ preventScroll: true });
    this.bodyEl.scrollTop = 0;
  }

  /* ─── Boot Sequence ─────────────────────────────────────────── */
  boot() {
    this.showMenu();
  }

  _printBanner() {
    const d = cvData[i18n.currentLang];
    const ascii = `<span class="acc1"> ██████╗   ██╗  ██╗  ██████╗   ██╗  ██████╗  ██╗     </span>
<span class="acc1">██╔═══██╗ ███║ ███║ ██╔═══██╗ ███║ ██╔═══██╗ ██║     </span>
<span class="acc2">██║   ██║ ╚██║ ╚██║ ██║   ██║ ╚██║ ██║   ██║ ██║     </span>
<span class="acc2">██║   ██║  ██║  ██║ ██║   ██║  ██║ ██║   ██║ ██║     </span>
<span class="acc3">╚██████╔╝  ██║  ██║ ╚██████╔╝  ██║ ╚██████╔╝ ██████╗ </span>
<span class="acc3"> ╚═════╝   ╚═╝  ╚═╝  ╚═════╝   ╚═╝  ╚═════╝  ╚═════╝ </span>`;

    this._printRaw(`<pre class="ascii-banner">${ascii}</pre>`);
    this._printRaw(`
      <div class="cli-terminal-header">
        <div class="cli-header-prompt">
          <span class="acc1">┌──(</span><strong>${d.personal.name}</strong> <span class="acc2">@o1101ol</span><span class="acc1">)─[</span><span class="dim">UPC ${d.personal.degree}</span><span class="acc1">]</span>
          <br><span class="acc1">└─$</span> <span class="dim">${i18n.t('termSubheader')}</span>
        </div>
        <div class="cli-hero-cta-row">
          <button class="btn-terminal-cv-cta cmd-link" data-cmd="cv" title="${i18n.t('tipQuickVisualCv')}">
            <span class="acc1">📄</span> <strong>${i18n.t('btnQuickVisualCv')}</strong> <span class="acc2">➔</span>
          </button>
        </div>
      </div>`);
  }

  /* ─── Help (Widescreen 3-Column TUI Dashboard) ───────────────── */
  _help() {
    const isEs = i18n.currentLang === 'es';

    const coreCmds = [
      { cmd: 'fastfetch',      desc: isEs ? 'Información del sistema y workstation' : 'System info & workstation specs' },
      { cmd: 'whoami',         desc: isEs ? 'Sobre mí y perfil profesional'         : 'About me & professional profile' },
      { cmd: 'skills',         desc: isEs ? 'Mis habilidades técnicas'              : 'My technical skills' },
      { cmd: 'certifications', desc: isEs ? 'Mis certificaciones'                   : 'My certifications' },
      { cmd: 'projects',       desc: isEs ? 'Mis proyectos y herramientas'          : 'My projects & tools' },
      { cmd: 'experience',     desc: isEs ? 'Mi experiencia práctica'               : 'My practical experience' },
      { cmd: 'contact',        desc: isEs ? 'Información de contacto y redes'       : 'Contact info & social links' }
    ];

    const sysCmds = [
      { cmd: 'cv',             desc: isEs ? 'Ver currículum en formato visual completo (RRHH)' : 'View full visual dossier format (for HR / Recruiters)' },
      { cmd: 'theme',          desc: isEs ? 'Cambiar tema de color'                 : 'Change color theme' },
      { cmd: 'lang',           desc: isEs ? 'Cambiar idioma [es/en]'                : 'Switch language [es/en]' },
      { cmd: 'clear',          desc: isEs ? 'Limpiar pantalla de la terminal'       : 'Clear terminal screen' }
    ];

    const d = cvData[i18n.currentLang];

    let html = `
      <div class="legacy-cli-menu-vertical">
        <!-- Bloque 1: Módulos de Perfil -->
        <div class="cli-section-block">
          <div class="cli-table-hdr"><span class="acc1">┌── [</span> <span class="acc2">${isEs ? 'MÓDULOS DE PERFIL' : 'CORE MODULES'}</span> <span class="acc1">]</span></div>
          <div class="cli-table-body">
            ${coreCmds.map(c => `
              <div class="cli-table-row">
                <div class="cli-cmd-cell">
                  <span class="cli-prompt-prefix">&gt;</span>
                  <button class="cmd-link" data-cmd="${c.cmd}" title="${isEs ? 'Ejecutar comando' : 'Run command'}: ${c.cmd}">${c.cmd}</button>
                </div>
                <div class="cli-leader-dots">::</div>
                <div class="cli-desc-cell">${c.desc}</div>
              </div>
            `).join('')}
          </div>
          <div class="cli-table-ftr"><span class="acc1">└──</span></div>
        </div>

        <!-- Bloque 2: Utilidades del Sistema -->
        <div class="cli-section-block">
          <div class="cli-table-hdr"><span class="acc1">┌── [</span> <span class="acc2">${isEs ? 'UTILIDADES & SISTEMA' : 'SYSTEM UTILITIES'}</span> <span class="acc1">]</span></div>
          <div class="cli-table-body">
            ${sysCmds.map(c => `
              <div class="cli-table-row">
                <div class="cli-cmd-cell">
                  <span class="cli-prompt-prefix">&gt;</span>
                  <button class="cmd-link" data-cmd="${c.cmd}" title="${isEs ? 'Ejecutar comando' : 'Run command'}: ${c.cmd}">${c.cmd}</button>
                </div>
                <div class="cli-leader-dots">::</div>
                <div class="cli-desc-cell">${c.desc}</div>
              </div>
            `).join('')}
          </div>
          <div class="cli-table-ftr"><span class="acc1">└──</span></div>
        </div>
      </div>
    `;

    this._printRaw(html);
  }

  /* ─── fastfetch (Fedora Linux 44 Workstation Setup) ────────── */
  _fastfetch(d) {
    const isEs = i18n.currentLang === 'es';
    const p = d.personal;

    const ascii = `             <span class="fedora-blue">.',;::::;,'.</span>                 <span class="fedora-blue" style="font-weight:700;">${p.handle}</span><span class="dim">@</span><span class="fedora-blue" style="font-weight:700;">fedora</span>
         <span class="fedora-blue">.';:cccccccccccc:;,.</span>             <span class="dim">--------------</span>
      <span class="fedora-blue">.;cccccccccccccccccccccc;.</span>          <span class="fedora-key">User:</span> ${p.name} (${p.handle})
    <span class="fedora-blue">.:cccccccccccccccccccccccccc:.</span>        <span class="fedora-key">Role:</span> ${p.title}
  <span class="fedora-blue">.;ccccccccccccc;</span><span class="fedora-white">.:dddl:.</span><span class="fedora-blue">;ccccccc;.</span>      <span class="fedora-key">OS:</span> ${p.os}
 <span class="fedora-blue">.:ccccccccccccc;</span><span class="fedora-white">OWMKOOXMWd</span><span class="fedora-blue">;ccccccc:.</span>     <span class="fedora-key">Host:</span> ${p.host}
<span class="fedora-blue">.:ccccccccccccc;</span><span class="fedora-white">KMMc</span><span class="fedora-blue">;cc;</span><span class="fedora-white">xMMc</span><span class="fedora-blue">;ccccccc:.</span>    <span class="fedora-key">Kernel:</span> ${p.kernel}
<span class="fedora-blue">,cccccccccccccc;</span><span class="fedora-white">MMM.</span><span class="fedora-blue">;cc;;</span><span class="fedora-white">WW:</span><span class="fedora-blue">;cccccccc,</span>    <span class="fedora-key">Uptime:</span> ${p.uptime}
<span class="fedora-blue">:cccccccccccccc;</span><span class="fedora-white">MMM.</span><span class="fedora-blue">;cccccccccccccccc:</span>    <span class="fedora-key">Processes:</span> ${p.processes}
<span class="fedora-blue">:ccccccc;</span><span class="fedora-white">oxOOOo;MMM000k.</span><span class="fedora-blue">;cccccccccccc:</span>    <span class="fedora-key">Packages:</span> ${p.packages}
<span class="fedora-blue">cccccc;</span><span class="fedora-white">0MMKxdd:;MMMkddc.</span><span class="fedora-blue">;cccccccccccc;</span>    <span class="fedora-key">SELinux:</span> ${p.selinux}
<span class="fedora-blue">ccccc;</span><span class="fedora-white">XMO'</span><span class="fedora-blue">;cccc;</span><span class="fedora-white">MMM.</span><span class="fedora-blue">;cccccccccccccccc'</span>    <span class="fedora-key">Memory:</span> ${p.memory}
<span class="fedora-blue">ccccc;</span><span class="fedora-white">MMo</span><span class="fedora-blue">;ccccc;</span><span class="fedora-white">MMW.</span><span class="fedora-blue">;ccccccccccccccc;</span>     <span class="fedora-key">Shell:</span> ${p.shell}
<span class="fedora-blue">ccccc;</span><span class="fedora-white">0MNc</span><span class="fedora-blue">.ccc.</span><span class="fedora-white">xMMd</span><span class="fedora-blue">;ccccccccccccccc;</span>      <span class="fedora-key">WM:</span> ${p.wm}
<span class="fedora-blue">cccccc;</span><span class="fedora-white">dNMWXXXWM0:</span><span class="fedora-blue">;cccccccccccccc:,</span>       <span class="fedora-key">Locale:</span> ${p.locale}
<span class="fedora-blue">cccccccc;</span><span class="fedora-white">.:odl:.</span><span class="fedora-blue">;cccccccccccccc:,.</span>        
<span class="fedora-blue">ccccccccccccccccccccccccccccc:'.</span>          <span class="color-dots"><span style="color:#10b981">●</span> <span style="color:#06b6d4">●</span> <span style="color:#8b5cf6">●</span> <span style="color:#ec4899">●</span> <span style="color:#f59e0b">●</span> <span style="color:#ef4444">●</span> <span style="color:#3b82f6">●</span> <span style="color:#e2e8f0">●</span></span>
<span class="fedora-blue">:ccccccccccccccccccc:;,..</span>                 
 <span class="fedora-blue">':cccccccccccccccc::;,.</span>`;

    this._printRaw(`
      <div class="output-block">
        <div class="output-title">&#x1F5A5;&#xFE0F; ${isEs ? 'Información del Sistema & Workstation' : 'System Information & Workstation'}</div>
        <pre class="fastfetch-term-output">${ascii}</pre>
      </div>`);
  }

  /* ─── whoami (Widescreen 2-Column Split) ────────────────────── */
  _whoami(d) {
    const isEs = i18n.currentLang === 'es';

    this._printRaw(`
      <div class="tui-whoami-split">
        <!-- Columna Izquierda: Identidad & Biografía -->
        <div class="tui-whoami-main">
          <div class="output-title">&#x26A1; ${d.personal.name} <span class="acc2">(@o1101ol)</span></div>
          <div class="acc1 mono" style="font-size:.9rem;margin-bottom:.6rem;font-weight:700;">${d.personal.title}</div>
          <div class="tui-bio-text">${d.personal.bio}</div>
          <div class="badge-row" style="margin-top:1rem;">
            <span class="cli-badge acc1">&#x1F4CD; ${d.personal.location}</span>
            <a href="mailto:${d.personal.email}" class="cli-badge acc2">&#x2709;&#xFE0F; ${d.personal.email}</a>
          </div>
        </div>

        <!-- Columna Derecha: Matriz de Especificación -->
        <div class="tui-spec-card">
          <div class="cli-table-hdr"><span class="acc1">┌── [</span> <span class="acc2">${isEs ? 'MATRIZ DE PERFIL & SISTEMA' : 'PROFILE & SYSTEM MATRIX'}</span> <span class="acc1">]</span></div>
          <div class="cli-table-body">
            <div class="tui-spec-item"><span class="tui-spec-k">${isEs ? 'ESPECIALIZACIÓN' : 'PRIMARY FOCUS'}</span><span class="tui-spec-v acc1">${isEs ? 'Seguridad Ofensiva & Pentesting Web' : 'Offensive Security & Web Pentesting'}</span></div>
            <div class="tui-spec-item"><span class="tui-spec-k">${isEs ? 'CERTIFICACIÓN' : 'CERTIFICATION'}</span><span class="tui-spec-v acc2">HTB CWES Certified (100% Score)</span></div>
            <div class="tui-spec-item"><span class="tui-spec-k">${isEs ? 'FORMACIÓN UPC' : 'ACADEMIC'}</span><span class="tui-spec-v">${isEs ? '2024 – Presente' : '2024 – Present'}</span></div>
            <div class="tui-spec-item"><span class="tui-spec-k">${isEs ? 'ENTORNO DE TRABAJO' : 'ENVIRONMENT'}</span><span class="tui-spec-v">Fedora 44 / Hyprland (Wayland)</span></div>
            <div class="tui-spec-item"><span class="tui-spec-k">${isEs ? 'ARSENAL CLAVE' : 'CORE TOOLING'}</span><span class="tui-spec-v">Burp Suite, WPScan, interactsh, subfinder, httpx, Python</span></div>
            <div class="tui-spec-item"><span class="tui-spec-k">${isEs ? 'SEGURIDAD PARSER' : 'PARSER SECURITY'}</span><span class="tui-spec-v acc1">Zero-eval &bull; Allowlist AST &bull; XSS sanitized</span></div>
          </div>
          <div class="cli-table-ftr"><span class="acc1">└──</span></div>
        </div>
      </div>`);
  }

  /* ─── skills (Widescreen 3-Column Grid) ──────────────────────── */
  _skills(d) {
    const isEs = i18n.currentLang === 'es';
    let html = `<div class="output-block"><div class="output-title">&#x1F6E1;&#xFE0F; ${isEs ? 'Habilidades Técnicas' : 'Technical Skills'}</div>
      <div class="tui-skills-grid">`;
    d.skills.forEach(g => {
      html += `
        <div class="tui-skill-panel">
          <div class="cli-table-hdr"><span class="acc1">┌── [</span> <span class="acc2">${g.category}</span> <span class="acc1">]</span></div>
          <div class="cli-table-body">
            <div class="badge-row" style="padding:.4rem 0;">${g.items.map(i => `<span class="cli-badge acc1">${i}</span>`).join('')}</div>
          </div>
          <div class="cli-table-ftr"><span class="acc1">└──</span></div>
        </div>`;
    });
    html += `</div></div>`;
    this._printRaw(html);
  }

  /* ─── certifications (Wide Breakdown) ────────────────────────── */
  _certifications(d) {
    const isEs = i18n.currentLang === 'es';

    let html = `<div class="output-block">
      <div class="output-title">&#x1F3C6; ${isEs ? 'Certificaciones Oficiales' : 'Official Certifications'}</div>
      <div class="cli-list-grid">`;

    d.certifications.forEach(c => {
      html += `
        <div class="cli-cert-card-row">
          <div class="cli-cwes-box">
            <img src="assets/cwes_badge.png" alt="HTB Certified Web Exploitation Specialist (CWES)" class="cli-cwes-img" />
          </div>
          <div class="cli-cert-info-box">
            <div class="cli-col-title acc1">🛡️ ${c.name}</div>
            <div class="cli-col-meta dim">${isEs ? 'Emisor' : 'Issuer'}: ${c.issuer} &bull; <span class="acc2">${c.year}</span> &bull; <span class="acc1" style="font-weight:700;">100% Practical Score</span></div>
            <div class="tui-cert-desc" style="color:var(--text-2);font-size:.85rem;margin:.3rem 0;">
              ${isEs ? 'Evaluación técnica práctica de explotación web de alto nivel resolviendo el 100% de los desafíos del examen bajo entorno cronometrado.' : 'Advanced hands-on offensive web exploitation certification, achieving 100% score on practical challenges under timed conditions.'}
            </div>
            <div style="margin-top:.4rem;">
              <a href="${c.url ?? d.personal.htb}" target="_blank" rel="noopener" class="cmd-link">🔗 ${isEs ? 'Verificar Credencial en HTB ↗' : 'Verify Credential on HTB ↗'}</a>
            </div>
          </div>
        </div>`;
    });
    this._printRaw(html + '</div></div>');
  }

  /* ─── projects (Widescreen 2-Column Grid) ────────────────────── */
  _projects(d) {
    const isEs = i18n.currentLang === 'es';
    let html = `<div class="output-block"><div class="output-title">&#x1F4E6; ${isEs ? 'Proyectos & Repositorios' : 'Projects & Repositories'}</div>
      <div class="tui-projects-grid">`;
    d.projects.forEach(p => {
      const descHtml = p.description.split('\n').map(l => `<div>${l}</div>`).join('');
      html += `<div class="proj-card">
        <div class="proj-title">
          &#x1F512; ${p.title}
          ${p.github !== '#' ? `<a href="${p.github}" target="_blank" rel="noopener" class="proj-link">GitHub &#x2197;</a>` : ''}
        </div>
        <div class="dim" style="font-size:.88rem;margin:.4rem 0;line-height:1.45;">${descHtml}</div>
        <div class="badge-row">${p.tags.map(t => `<span class="cli-badge">${t}</span>`).join('')}</div>
      </div>`;
    });
    html += `</div></div>`;
    this._printRaw(html);
  }

  /* ─── experience (Widescreen 2-Column Grid) ─────────────────── */
  _experience(d) {
    const isEs = i18n.currentLang === 'es';
    let html = `<div class="output-block"><div class="output-title">&#x1F4BC; ${isEs ? 'Experiencia & Trayectoria Académica' : 'Experience & Academic Background'}</div>
      <div class="tui-experience-grid">`;
    [...d.experience, ...d.education].forEach(e => {
      const descHtml = e.description.split('\n').map(l => `<div>${l}</div>`).join('');
      html += `<div class="tui-exp-card">
        <div class="acc2 mono" style="font-size:.82rem;font-weight:700;">${e.period}</div>
        <div style="font-weight:700;font-size:.95rem;margin:.15rem 0;">${e.role ?? e.degree}</div>
        <div class="acc1" style="font-size:.85rem;">${e.company ?? e.institution}</div>
        <div style="color:var(--text-secondary);font-size:.86rem;margin-top:.35rem;line-height:1.5;">${descHtml}</div>
      </div>`;
    });
    html += `</div></div>`;
    this._printRaw(html);
  }

  /* ─── contact (Anti-Wrap Row Layout) ───────────────────────── */
  _contact(d) {
    const isEs = i18n.currentLang === 'es';
    const rows = [
      ['GitHub',     d.personal.github],
      ['LinkedIn',   d.personal.linkedin],
      ['HackTheBox', d.personal.htb],
      ['Email',      d.personal.email]
    ].filter(([_, val]) => !!val);
    let html = `<div class="output-block"><div class="output-title">&#x1F4EC; ${isEs ? 'Contacto' : 'Contact'}</div>
      <div class="cli-list-grid">`;
    rows.forEach(([label, value]) => {
      const isUrl = value.startsWith('http');
      const isMail = value.includes('@');
      const displayVal = isUrl ? `<a href="${value}" target="_blank" rel="noopener" class="acc2">${value}</a>` : isMail ? `<a href="mailto:${value}" class="acc2">${value}</a> <button class="btn-copy-email" data-copy="${value}" title="${isEs ? 'Copiar correo' : 'Copy email'}"><span>📋</span> <span>${i18n.t('copyEmailBtn')}</span></button>` : `<span class="acc2">${value}</span>`;
      html += `
        <div class="cli-row-item">
          <div class="cli-col-label">${label}</div>
          <div class="cli-col-val">${displayVal}</div>
        </div>`;
    });
    this._printRaw(html + '</div></div>');
  }

  /* ─── theme ─────────────────────────────────────────────────── */
  _theme(arg) {
    const name = arg?.toLowerCase();
    const target = THEMES.includes(name) ? name : THEMES[(THEMES.indexOf(this.app.currentTheme) + 1) % THEMES.length];
    this.app.setTheme(target);
    if (this.state === 'view' && this.activeCmd) {
      this.run(this.activeCmd);
    } else {
      this.showMenu();
    }
  }

  /* ─── lang ──────────────────────────────────────────────────── */
  _lang(arg) {
    const l = arg?.toLowerCase();
    const next = (l === 'es' || l === 'en') ? l : (i18n.currentLang === 'es' ? 'en' : 'es');
    this.app.setLang(next);
    if (this.state === 'view' && this.activeCmd) {
      this.run(this.activeCmd);
    } else {
      this.showMenu();
    }
  }

  /* ─── pdf ───────────────────────────────────────────────────── */
  _pdf() {
    this.app.setView('gui');
    setTimeout(() => window.print(), 200);
  }

  /* ─── Low-level helpers ─────────────────────────────────────── */
  _printRaw(html) {
    const wrap = document.createElement('div');
    wrap.className = 'term-line output-line';
    wrap.innerHTML = html;
    this.outputEl.appendChild(wrap);
  }

  _esc(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  _scroll() {
    setTimeout(() => {
      this.bodyEl.scrollTop = this.bodyEl.scrollHeight;
    }, 10);
  }
}

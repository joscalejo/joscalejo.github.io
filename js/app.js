/**
 * Application Entry Point v9.0
 * Pure Terminal Focus — Clean Vim/Pager TUI Navigation.
 */
import { TerminalEngine } from './terminal.js';
import { renderGUI }      from './gui.js';
import { i18n }           from './i18n.js';

const THEMES = ['obsidian','matrix','cyberpunk','dracula','nord','light'];

class App {
  constructor() {
    this.currentView  = 'cli';
    this.currentTheme = 'obsidian';

    this._refs();
    this.terminal = new TerminalEngine(
      this.dom.output,
      this.dom.input,
      this.dom.prompt,
      this
    );
    this.terminal.boot();
  }

  _refs() {
    this.dom = {
      termView  : document.getElementById('terminal-view'),
      guiView   : document.getElementById('gui-view'),
      guiContent: document.getElementById('gui-content'),
      output    : document.getElementById('terminal-output'),
      inputLine : document.getElementById('input-line'),
      input     : document.getElementById('cli-input'),
      prompt    : document.getElementById('cli-prompt'),
    };
    this._bindTitlebar();
    this.updateTitlebarI18n();
  }

  _bindTitlebar() {
    const btnClose = document.getElementById('btn-win-close');
    const btnMin   = document.getElementById('btn-win-min');
    const btnMax   = document.getElementById('btn-win-max');

    if (btnClose) btnClose.addEventListener('click', () => this.terminal.showMenu());
    if (btnMin)   btnMin.addEventListener('click', () => this.terminal.showMenu());
    if (btnMax)   btnMax.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    });
  }

  updateTitlebarI18n() {
    const get = (k) => i18n.t(k);

    const btnClose = document.getElementById('btn-win-close');
    const btnMin   = document.getElementById('btn-win-min');
    const btnMax   = document.getElementById('btn-win-max');
    const input    = document.getElementById('cli-input');

    if (btnClose) btnClose.title = get('tipWinClose');
    if (btnMin)   btnMin.title   = get('tipWinMin');
    if (btnMax)   btnMax.title   = get('tipWinMax');

    if (input) input.setAttribute('aria-label', get('inputAriaLabel'));
  }

  setView(view) {
    this.currentView = view;
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (view === 'gui') {
      this.dom.termView.classList.add('view-hidden');
      this.dom.guiView.classList.remove('view-hidden');
      renderGUI(this.dom.guiContent, this);
    } else {
      this.dom.guiView.classList.add('view-hidden');
      this.dom.termView.classList.remove('view-hidden');
      this.dom.input.focus();
    }
  }

  setTheme(name) {
    this.currentTheme = name;
    document.documentElement.setAttribute('data-theme', name);
  }

  setLang(lang) {
    i18n.setLanguage(lang);
    this.updateTitlebarI18n();
    if (this.currentView === 'gui') {
      renderGUI(this.dom.guiContent, this);
    } else if (this.terminal) {
      if (this.terminal.state === 'view' && this.terminal.activeCmd) {
        this.terminal.run(this.terminal.activeCmd);
      } else {
        this.terminal.showMenu();
      }
    }
  }
}

function initApp() {
  if (!window.app) {
    window.app = window._app = new App();
    window.i18n = i18n;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

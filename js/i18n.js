export const i18n = {
  currentLang: 'en',

  translations: {
    es: {
      // Views & Navigation
      btnTerminal: "Terminal",
      btnVisualCv: "Vista CV",
      btnLang: "EN",
      btnTheme: "TEMA",
      btnPdf: "PDF",

      // Titlebar Tooltips & Labels
      tipWinClose: "Cerrar vista actual / Volver al menú",
      tipWinMin: "Limpiar pantalla",
      tipWinMax: "Alternar pantalla completa",
      tipWinCv: "Cambiar a Vista CV (formato visual completo)",
      tipWinTheme: "Alternar paleta de colores",
      tipWinLang: "Switch to English (EN)",
      tipWinPdf: "Descargar / Imprimir CV en PDF",

      // Terminal Banner & Quick Actions
      termTitle: "kitty — joscalejo@hyprland:~ (zsh)",
      termSubheader: "Haz clic en cualquier opción o escribe un comando.",
      btnQuickVisualCv: "Ver CV Completo (Dossier Visual para RRHH)",
      tipQuickVisualCv: "Abrir currículum visual estructurado para reclutadores y RRHH",

      // Messages & Helpers
      availableCommands: "Comandos disponibles",
      cmdNotFound: "comando no encontrado",
      typeHelp: "Escribe 'help' para ver la lista de comandos disponibles.",
      langSwitched: "Idioma cambiado a español.",
      themeSwitched: "Tema cambiado a",
      pdfNotice: "Preparando PDF... abriendo diálogo de impresión.",
      clearDone: "Pantalla limpiada.",
      backToMenu: "VOLVER AL MENÚ",
      backToMenuTip: "Presiona :q, ESC o haz clic para volver al menú principal",
      inputAriaLabel: "Línea de entrada de comandos de terminal",
      placeholderMenu: "Escribe un comando o haz clic arriba... (ej. whoami, skills)",
      placeholderView: "Escribe :q o menú para volver, o escribe otro comando...",
      viewInvalidCmdHelp: "Escribe ':q' o 'menú' para volver al menú principal.",
      
      // UX Additions
      copiedEmail: "¡Correo copiado al portapapeles! 📋",
      copyEmailBtn: "Copiar",
      didYouMean: "¿Quizás quisiste decir?",
      clickToRun: "haz clic para ejecutar"
    },
    en: {
      // Views & Navigation
      btnTerminal: "Terminal",
      btnVisualCv: "Visual CV",
      btnLang: "ES",
      btnTheme: "THEME",
      btnPdf: "PDF",

      // Titlebar Tooltips & Labels
      tipWinClose: "Close current view / Return to menu",
      tipWinMin: "Clear screen buffer",
      tipWinMax: "Toggle fullscreen",
      tipWinCv: "Switch to Visual CV (full document format)",
      tipWinTheme: "Cycle color palette",
      tipWinLang: "Cambiar a Español (ES)",
      tipWinPdf: "Download / Print CV as PDF",

      // Terminal Banner & Quick Actions
      termTitle: "kitty — joscalejo@hyprland:~ (zsh)",
      termSubheader: "Click any option or type a command below.",
      btnQuickVisualCv: "View Full CV (Visual Dossier for Recruiters)",
      tipQuickVisualCv: "Open structured visual resume for recruiters and HR",

      // Messages & Helpers
      availableCommands: "Available commands",
      cmdNotFound: "command not found",
      typeHelp: "Type 'help' to see the list of available commands.",
      langSwitched: "Language switched to English.",
      themeSwitched: "Theme changed to",
      pdfNotice: "Preparing PDF... opening print dialog.",
      clearDone: "Screen cleared.",
      backToMenu: "RETURN TO MENU",
      backToMenuTip: "Press :q, ESC or click to return to main menu",
      inputAriaLabel: "Terminal command input line",
      placeholderMenu: "Type a command or click above... (e.g. whoami, skills)",
      placeholderView: "Type :q or menu to return, or type another command...",
      viewInvalidCmdHelp: "Type ':q' or 'menu' to return to main menu.",

      // UX Additions
      copiedEmail: "Email copied to clipboard! 📋",
      copyEmailBtn: "Copy",
      didYouMean: "Did you mean?",
      clickToRun: "click to run"
    }
  },

  setLanguage(lang) {
    if (lang === 'es' || lang === 'en') {
      this.currentLang = lang;
      document.documentElement.setAttribute('lang', lang);
      return true;
    }
    return false;
  },

  t(key) {
    return this.translations[this.currentLang]?.[key] ?? key;
  }
};

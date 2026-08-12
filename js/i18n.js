/**
 * i18n Translation & Language State Manager
 */

export const i18n = {
  currentLang: 'es',

  translations: {
    es: {
      btnTerminal: "Terminal",
      btnGui: "Vista CV",
      btnLang: "EN",
      btnTheme: "Tema",
      btnPdf: "Imprimir PDF",
      welcomeBannerTitle: "Bienvenido al Portafolio Interactivo de José Callejo",
      welcomeHint: "Escribe 'help' o haz clic en los comandos de la barra superior para explorar.",
      availableCommands: "Comandos disponibles",
      cmdNotFound: "Comando no encontrado: ",
      typeHelp: "Escribe 'help' para ver la lista de comandos.",
      langSwitched: "Idioma cambiado a Español.",
      themeSwitched: "Tema cambiado a ",
      pdfNotice: "Abriendo diálogo de impresión / descarga a PDF...",
      clearNotice: "Consola limpiada."
    },
    en: {
      btnTerminal: "Terminal",
      btnGui: "Visual CV",
      btnLang: "ES",
      btnTheme: "Theme",
      btnPdf: "Print PDF",
      welcomeBannerTitle: "Welcome to José Callejo's Interactive Portfolio",
      welcomeHint: "Type 'help' or click any command tag above to explore.",
      availableCommands: "Available commands",
      cmdNotFound: "Command not found: ",
      typeHelp: "Type 'help' to view the list of available commands.",
      langSwitched: "Language switched to English.",
      themeSwitched: "Theme changed to ",
      pdfNotice: "Opening print / PDF download dialog...",
      clearNotice: "Console cleared."
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
    return this.translations[this.currentLang][key] || key;
  }
};

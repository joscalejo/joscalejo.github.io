/**
 * CV Data Store — Real Profile: Josue Castro Alejos (@o1101ol / @joscalejo)
 * Sourced directly from updated CV:
 * - UPC Cybersecurity Engineering (2024 - Presente)
 * - Certified Web Exploitation Specialist (CWES) — Hack The Box (Agosto 2026)
 */

export const cvData = {
  es: {
    personal: {
      name: "Josue Castro Alejos",
      handle: "o1101ol",
      degree: "Ingeniería de Ciberseguridad",
      title: "Estudiante de Ingeniería de Ciberseguridad",
      tagline: "Buscando prácticas preprofesionales en Pentesting Web / AppSec.",
      location: "Lima, Perú",
      email: "josuecastro5599@gmail.com",
      github: "https://github.com/joscalejo",
      linkedin: "https://www.linkedin.com/in/joscalejo/",
      htb: "https://profile.hackthebox.com/profile/019d50f0-c9c7-7062-bc47-624b5398df67",
      os: "Fedora Linux 44 (Workstation Edition) x86_64",
      host: "83A1 (Lenovo V15 G4 IRU)",
      kernel: "Linux 7.1.5-201.fc44.x86_64",
      uptime: "27 years (running stable without crashes)",
      processes: "1 (studying @ UPC), 1 (pentesting), 0 (zombies)",
      packages: "3197 (rpm), 1 (certs), 4 (repos)",
      selinux: "Enforcing (Zero-Trust Mindset)",
      memory: "Continuous Learning (Buffer-Overflow Resistant)",
      shell: "zsh 5.9 (Powerlevel10k)",
      display: "1920x1080 [60Hz]",
      wm: "Hyprland 0.56.1 (Wayland) • kitty",
      theme: "Tokyonight-Dark-Storm [GTK2/3/4]",
      icons: "Papirus-Dark [GTK2/3/4]",
      terminal: "kitty",
      font: "FiraCodeNF-Reg (14pt)",
      cpu: "13th Gen Intel(R) Core(TM) i3-1315U (8) @ 4.50 GHz",
      gpu: "UHD Graphics",
      locale: "Lima, Perú (es_PE.UTF-8)",
      editor: "nano / Neovim",
      bio: `Experiencia práctica en auditorías de seguridad web blackbox bajo OWASP Top 10, con redacción de informes técnicos y ejecutivos en LaTeX. Desarrollo de una PoC ofensiva con técnicas Living off the Land para evaluar los límites de detección de Windows Defender. Busco prácticas preprofesionales en Pentesting Web / AppSec.`
    },
    skills: [
      {
        category: "Vulnerabilidades Web & AppSec",
        items: [
          "XSS (DOM, Stored, Reflected)",
          "SQLi (Blind, In-Band)",
          "IDOR / Broken Auth",
          "SSRF",
          "SSTI",
          "CSRF",
          "XXE",
          "LFI / RFI & Path Traversal",
          "WAF / Filter Bypass"
        ]
      },
      {
        category: "Arsenal de Pentesting & Sistemas",
        items: [
          "Burp Suite Pro",
          "WPScan",
          "interactsh & subfinder",
          "httpx & nuclei",
          "Nmap & Wireshark",
          "ffuf",
          "Fedora Linux / Wayland",
          "Git & Bash Scripting"
        ]
      },
      {
        category: "Metodologías, Scripting & Idiomas",
        items: [
          "OWASP Top 10 & WSTG",
          "PTES & CVSS v3.1",
          "MITRE ATT&CK",
          "Python 3 (SecOps Automation)",
          "PowerShell (LotL)",
          "LaTeX (Technical Reports)",
          "Español (Nativo)",
          "Inglés (B2)"
        ]
      }
    ],
    certifications: [
      {
        name: "Certified Web Exploitation Specialist (CWES)",
        issuer: "Hack The Box",
        year: "Agosto 2026",
        url: "https://profile.hackthebox.com/profile/019d50f0-c9c7-7062-bc47-624b5398df67/certificate/HTBCERT-1C4ECB401C"
      }
    ],
    experience: [
      {
        role: "Auditoría de Seguridad Web",
        company: "E-commerce Local, Lima, Perú",
        period: "Agosto 2026",
        description: "Ejecución de una auditoría de seguridad web de tipo blackbox sobre una plataforma WordPress/WooCommerce, durante una ventana de 48 horas coordinada con el cliente, bajo consentimiento explícito.\n• Reconocimiento y escaneo automatizado con WPScan, subfinder, httpx e interactsh, complementado con validación manual de cada hallazgo para confirmar explotabilidad y descartar falsos positivos.\n• Triaje y clasificación de 5 hallazgos de seguridad (3 de severidad Media, 1 Baja y 1 Informativa), entregando un reporte técnico con vectores de remediación para mitigar riesgos."
      }
    ],
    education: [
      {
        degree: "Ingeniería de Ciberseguridad",
        institution: "Universidad Peruana de Ciencias Aplicadas (UPC)",
        period: "2024 – Presente",
        description: "Formación universitaria combinando una sólida base teórica con entrenamiento práctico intensivo en seguridad ofensiva, análisis de vulnerabilidades y desarrollo de herramientas de seguridad."
      }
    ],
    projects: [
      {
        title: "PoC: Bypass de Windows Defender mediante técnicas LotL",
        description: "Desarrollo de una prueba de concepto ofensiva en PowerShell con técnicas Living off the Land para auditar la efectividad de Windows Defender.\n• Análisis de evasión de red mediante staging de payloads y exfiltración de datos a través de servicios de alta reputación como GitHub Gist y Telegram.\n• Propuesta de recomendaciones de hardening enfocadas en auditar binarios nativos y filtrar tráfico saliente sin depender únicamente de la reputación del dominio.",
        tags: ["PowerShell", "BadUSB / Digispark", "LotL / LOLBins", "AV Evasion", "Telegram C2"],
        github: "https://github.com/joscalejo/keylogger-lotl-poc",
        demo: "#"
      },
      {
        title: "Plantilla para Reportes de Pentesting en LaTeX",
        description: "Diseño de una plantilla técnica y ejecutiva modular en LaTeX para informes de auditoría de seguridad, alineada con las metodologías PTES y OWASP.\n• Estandarización de hallazgos técnicos integrando vectores CVSS v3.1, clasificación CWE, mapeo a tácticas de MITRE ATT&CK y evidencias de explotación reproducibles.\n• Incorporación de secciones críticas para consultoría profesional: delimitación estricta del scope, protocolos de limpieza postauditoría y hojas de ruta de remediación.",
        tags: ["LaTeX / TeX", "PTES / OWASP", "CVSS v3.1", "CWE", "MITRE ATT&CK"],
        github: "https://github.com/joscalejo/htb-latex-template-es",
        demo: "#"
      },
      {
        title: "redecod — Decodificador Recursivo Multicapa CLI",
        description: "Herramienta CLI en Python para decodificar automáticamente cadenas ofuscadas o con múltiples capas de codificación y cifrado (30+ métodos: Base64, Hex, URL, HTML Entities, JWT, ROT13/César, Morse, escapes Unicode/Hex). Soporta pipes stdin, análisis de entropía y salida en JSON para pipelines y CTFs.",
        tags: ["Python", "Cryptography", "CLI Tool", "CTF / Pentesting", "Automation"],
        github: "https://github.com/joscalejo/redecod",
        demo: "#"
      },
      {
        title: "GPWG — Generative Password Wordlist Generator",
        description: "Generador inteligente de diccionarios de contraseñas para auditorías de seguridad y pentesting. Combina permutaciones locales priorizadas con enriquecimiento de perfiles mediante Gemini AI (scoring de tokens 1–10, fechas inteligentes, normalización y formatos para Hashcat y John the Ripper).",
        tags: ["Python", "AI / Gemini API", "Password Cracking", "Wordlist Generator", "Security Tool"],
        github: "https://github.com/joscalejo/GPWG",
        demo: "#"
      }
    ]
  },
  en: {
    personal: {
      name: "Josue Castro Alejos",
      handle: "o1101ol",
      degree: "Cybersecurity Engineering",
      title: "Cybersecurity Engineering Student",
      tagline: "Seeking a pre-professional internship in Web Pentesting / AppSec.",
      location: "Lima, Peru",
      email: "josuecastro5599@gmail.com",
      github: "https://github.com/joscalejo",
      linkedin: "https://www.linkedin.com/in/joscalejo/",
      htb: "https://profile.hackthebox.com/profile/019d50f0-c9c7-7062-bc47-624b5398df67",
      os: "Fedora Linux 44 (Workstation Edition) x86_64",
      host: "83A1 (Lenovo V15 G4 IRU)",
      kernel: "Linux 7.1.5-201.fc44.x86_64",
      uptime: "27 years (running stable without crashes)",
      processes: "1 (studying @ UPC), 1 (pentesting), 0 (zombies)",
      packages: "3197 (rpm), 1 (certs), 4 (repos)",
      selinux: "Enforcing (Zero-Trust Mindset)",
      memory: "Continuous Learning (Buffer-Overflow Resistant)",
      shell: "zsh 5.9 (Powerlevel10k)",
      display: "1920x1080 [60Hz]",
      wm: "Hyprland 0.56.1 (Wayland) • kitty",
      theme: "Tokyonight-Dark-Storm [GTK2/3/4]",
      icons: "Papirus-Dark [GTK2/3/4]",
      terminal: "kitty",
      font: "FiraCodeNF-Reg (14pt)",
      cpu: "13th Gen Intel(R) Core(TM) i3-1315U (8) @ 4.50 GHz",
      gpu: "UHD Graphics",
      locale: "Lima, Peru (en_US.UTF-8)",
      editor: "nano / Neovim",
      bio: `Hands-on experience in black-box web security audits under OWASP Top 10, accompanied by technical and executive report writing in LaTeX. Development of an offensive PoC utilizing Living off the Land techniques to assess Windows Defender detection boundaries. Seeking a pre-professional internship in Web Pentesting / AppSec.`
    },
    skills: [
      {
        category: "Web Vulnerabilities & AppSec",
        items: [
          "XSS (DOM, Stored, Reflected)",
          "SQLi (Blind, In-Band)",
          "IDOR / Broken Auth",
          "SSRF",
          "SSTI",
          "CSRF",
          "XXE",
          "LFI / RFI & Path Traversal",
          "WAF / Filter Bypass"
        ]
      },
      {
        category: "Security Tooling & Systems",
        items: [
          "Burp Suite Pro",
          "WPScan",
          "interactsh & subfinder",
          "httpx & nuclei",
          "Nmap & Wireshark",
          "ffuf",
          "Fedora Linux / Wayland",
          "Git & Bash Scripting"
        ]
      },
      {
        category: "Methodologies, Scripting & Languages",
        items: [
          "OWASP Top 10 & WSTG",
          "PTES & CVSS v3.1",
          "MITRE ATT&CK",
          "Python 3 (SecOps Automation)",
          "PowerShell (LotL)",
          "LaTeX (Technical Reports)",
          "Spanish (Native)",
          "English (B2)"
        ]
      }
    ],
    certifications: [
      {
        name: "Certified Web Exploitation Specialist (CWES)",
        issuer: "Hack The Box",
        year: "August 2026",
        url: "https://profile.hackthebox.com/profile/019d50f0-c9c7-7062-bc47-624b5398df67/certificate/HTBCERT-1C4ECB401C"
      }
    ],
    experience: [
      {
        role: "Web Security Auditor",
        company: "Local E-Commerce, Lima, Peru",
        period: "August 2026",
        description: "Execution of a black-box web security audit on a WordPress/WooCommerce platform during a 48-hour coordinated window with explicit client consent.\n• Reconnaissance and automated scanning using WPScan, subfinder, httpx, and interactsh, complemented by manual validation to confirm exploitability and eliminate false positives.\n• Triage and classification of 5 security findings (3 Medium, 1 Low, and 1 Informational), delivering a comprehensive technical report with prioritized remediation vectors."
      }
    ],
    education: [
      {
        degree: "Cybersecurity Engineering",
        institution: "Universidad Peruana de Ciencias Aplicadas (UPC)",
        period: "2024 – Present",
        description: "Undergraduate education combining rigorous academic foundations with intensive practical training in offensive security, vulnerability assessment, and custom security tooling development."
      }
    ],
    projects: [
      {
        title: "PoC: Windows Defender Bypass using LotL Techniques",
        description: "Development of an offensive proof-of-concept in PowerShell utilizing Living off the Land techniques to audit Windows Defender detection effectiveness.\n• Network evasion analysis using payload staging and data exfiltration through high-reputation services such as GitHub Gist and Telegram.\n• Hardening proposals focused on auditing native LOLBins and filtering outbound traffic independently of domain reputation.",
        tags: ["PowerShell", "BadUSB / Digispark", "LotL / LOLBins", "AV Evasion", "Telegram C2"],
        github: "https://github.com/joscalejo/keylogger-lotl-poc",
        demo: "#"
      },
      {
        title: "LaTeX Template for Professional Pentesting Reports",
        description: "Design of a modular technical and executive LaTeX template for security audit reports, aligned with PTES and OWASP methodologies.\n• Standardization of technical findings integrating CVSS v3.1 vectors, CWE classification, MITRE ATT&CK mapping, and reproducible exploitation evidence.\n• Inclusion of consulting-critical sections: strict scope demarcation, post-audit cleanup protocols, and time-horizon remediation roadmaps.",
        tags: ["LaTeX / TeX", "PTES / OWASP", "CVSS v3.1", "CWE", "MITRE ATT&CK"],
        github: "https://github.com/joscalejo/htb-latex-template-es",
        demo: "#"
      },
      {
        title: "redecod — Recursive Multi-layer Decoding CLI",
        description: "Python CLI tool designed to automatically analyze and recursively decode deeply nested, multi-layer obfuscated strings (30+ algorithms: Base64, Hex, URL, HTML Entities, JWT payloads, ROT13/Caesar, Morse, Unicode escapes). Features pipe stdin support, entropy analysis, and JSON output for CTFs and security automation.",
        tags: ["Python", "Cryptography", "CLI Tool", "CTF / Pentesting", "Automation"],
        github: "https://github.com/joscalejo/redecod",
        demo: "#"
      },
      {
        title: "GPWG — Generative Password Wordlist Generator",
        description: "Intelligent password wordlist generator for authorized penetration testing. Combines local prioritized permutations with Gemini AI target profiling (1–10 token scoring, smart dates, normalization, and export formats for Hashcat and John the Ripper).",
        tags: ["Python", "AI / Gemini API", "Password Cracking", "Wordlist Generator", "Security Tool"],
        github: "https://github.com/joscalejo/GPWG",
        demo: "#"
      }
    ]
  }
};

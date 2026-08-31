# 🛡️ Josue Castro Alejos (@joscalejo) — Interactive Portfolio & CV

[![Live Demo](https://img.shields.io/badge/Live-joscalejo.github.io-10b981?style=for-the-badge&logo=googlechrome&logoColor=white)](https://joscalejo.github.io)
[![HTB CWES](https://img.shields.io/badge/HTB-CWES%20Certified-9fef00?style=for-the-badge&logo=hackthebox&logoColor=black)](https://profile.hackthebox.com/profile/019d50f0-c9c7-7062-bc47-624b5398df67/certificate/HTBCERT-1C4ECB401C)
[![Fedora Linux](https://img.shields.io/badge/Fedora%2044-Hyprland-51a2da?style=for-the-badge&logo=fedora&logoColor=white)](https://fedoraproject.org)

> **Estudiante de Ingeniería de Ciberseguridad (UPC) | Especialista en Seguridad Ofensiva & Pentesting Web.**

---

## 🧰 Proyectos y Experiencia Práctica

| Proyecto / Experiencia | Descripción | Periodo | Enlace |
|---|---|---|---|
| **`Auditoría de Seguridad Web`** | Auditoría blackbox sobre WordPress/WooCommerce (48h coordinadas). Escaneo con WPScan, subfinder, httpx e interactsh + validación manual. 5 hallazgos (3 de severidad Media, 1 Baja y 1 Informativa). | Agosto 2026 | E-commerce Local |
| **`PoC: Bypass Windows Defender (LotL)`** | PoC en PowerShell con técnicas Living off the Land, inyección BadUSB (Digispark ATtiny85), staging en GitHub Gist y exfiltración C2 vía Telegram. | Julio 2026 | [GitHub ➔](https://github.com/joscalejo/keylogger-lotl-poc) |
| **`Plantilla LaTeX para Pentesting`** | Plantilla modular para reportes de pentesting profesional alineada con PTES y OWASP con matriz CVSS v3.1, CWE y MITRE ATT&CK. | Enero 2026 | [GitHub ➔](https://github.com/joscalejo/htb-latex-template-es) |
| **`redecod`** | CLI en Python para decodificación recursiva multicapa (30+ métodos: Base64, Hex, URL, JWT, Morse, ROT13/César). | 2026 | [GitHub ➔](https://github.com/joscalejo/redecod) |
| **`GPWG`** | Generador inteligente de diccionarios de contraseñas con permutaciones priorizadas y enriquecimiento de perfiles con Gemini AI. | 2026 | [GitHub ➔](https://github.com/joscalejo/GPWG) |

---

## 🌟 Características del Portafolio

1. **Terminal Linux Interactiva (CLI Mode)**:
   - Inspirada en **Kitty / Hyprland (Fedora 44)** con controles de ventana de escritorio (`✕`, `—`, `+`), título, animación de apertura de ventana y banner ASCII `011010L`.
   - Comandos navegables por teclado o clic directo: `fastfetch`, `whoami`, `skills`, `certifications`, `projects`, `experience`, `contact`, `cv`, `neofetch`, `theme`, `lang`, `clear`.
   - Historial de comandos (`↑` / `↓`), autocompletado con `Tab` y placeholders contextuales en el prompt.

2. **Dossier Gráfico Ejecutivo (Visual CV Mode)**:
   - Vista de currículum tradicional para lectura rápida y evaluación de reclutadores / RRHH.
   - Verificación directa del badge oficial de **HTB Certified Web Exploitation Specialist (CWES)**.
   - Enlaces de un solo clic a GitHub, LinkedIn, HackTheBox y correo electrónico.
   - Exportación nativa e impresión de CV profesional a PDF.

3. **Soporte Multilingüe Completo (ES / EN)**:
   - Sincronización dinámica de todo el contenido, tooltips y mensajes del sistema en español e inglés.

4. **Motor de Temas Cromáticos**:
   - Paletas integradas: **Obsidian** (por defecto), **Matrix**, **Cyberpunk**, **Dracula**, **Nord** y **Light**.

5. **Seguridad y Arquitectura del Motor (AppSec Compliant)**:
   - **Zero-Eval Deterministic Router:** Sin `eval()`, `Function()` ni ejecución de código dinámico.
   - **DOM TextContent Sanitization:** Todo el input y strings del usuario se escapan contra inyecciones DOM-based XSS.
   - **Fuzzy Levenshtein Suggestion Engine:** Corrección automática de errores tipográficos en comandos (*"Did you mean?"*).
   - **SEO & ATS Compliant:** Integración con Schema.org JSON-LD structured data (`ProfilePage`, `Person`), `sitemap.xml`, `robots.txt` y fallback semántico accesible sin JavaScript para indexación de Google y motores de reclutamiento ATS.
   - **Accesibilidad WCAG 2.1 AA:** Ratios de contraste calibrados (≥ 4.5:1) y touch targets móviles de más de 48px.

6. **Arquitectura Zero-Build / Zero-Dependencies**:
   - Desarrollado 100% en Vanilla HTML5, CSS3 moderno y JavaScript ESM. Despliegue nativo instantáneo en **GitHub Pages**.

---

## 🚀 Despliegue en GitHub Pages

Este repositorio está estructurado para publicarse automáticamente en GitHub Pages desde la rama `main`:

```bash
git add .
git commit -m "feat: Interactive Cybersecurity Portfolio & Terminal CV"
git push origin main
```

En GitHub: **Settings > Pages > Source: Deploy from a branch (`main` / root)**.  
El sitio estará en vivo en: **`https://joscalejo.github.io`**.

---

## 🛠️ Ejecución Local

```bash
# Servidor HTTP local nativo
python3 -m http.server 8000
```
Abre `http://localhost:8000` en tu navegador.
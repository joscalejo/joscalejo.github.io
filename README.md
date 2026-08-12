# 💻 Linux Terminal CV & Portfolio — joscalejo.github.io

¡Bienvenido a tu sitio web de Marca Personal y CV interactivo estilo **Terminal de Linux**, listo para ser desplegado en **GitHub Pages**!

![Preview](assets/favicon.svg)

---

## 🌟 Características Principales

1. **Experiencia Terminal Linux Interactiva (CLI)**:
   - Prompt Powerline personalizado (`joscalejo@github:~$`).
   - Comandos ejecutables por teclado: `whoami`, `cat bio.txt`, `skills`, `projects`, `experience`, `contact`, `gui`, `theme`, `lang`, `pdf`, `clear`, `help`.
   - Historial de comandos ejecutados con teclas `↑` (Arriba) y `↓` (Abajo).
   - Autocompletado con la tecla `Tab`.
   - **Botones de comando rápido**: Haz clic en cualquier etiqueta (`[whoami]`, `[skills]`, etc.) en la parte superior del terminal para ejecutar el comando al instante.

2. **Vista Gráfica Alternativa (CV GUI)**:
   - Botón selector en la barra superior para cambiar al instante entre el modo **Terminal** y una **Vista Gráfica Tradicional (CV)**.
   - Diseño limpio con tarjetas glassmorphism, badges de habilidades, línea de tiempo de experiencia y grilla de proyectos.

3. **Soporte Multilingüe (Español / Inglés)**:
   - Botón `EN / ES` para cambiar dinámicamente todo el contenido del sitio y respuestas del terminal.

4. **Variedad de Temas Cromáticos**:
   - Selector de temas: **Obsidian Dark** (predeterminado), **Matrix Green**, **Dracula** y **Crisp Light**.

5. **Exportación / Impresión a PDF**:
   - Soporte nativo para `Ctrl + P` o botón `PDF 🖨️` formateado especialmente para generar un CV en PDF limpio y profesional sin elementos de la interfaz innecesarios.

6. **Despliegue Instantáneo en GitHub Pages**:
   - 100% nativo (Vanilla HTML5, CSS3, JS ESM). Sin compiladores pesados ni dependencias externas.

---

## 🛠️ Cómo Personalizar Tu Información

Toda la información de tu perfil, redes sociales, habilidades, proyectos y trayectoria laboral se encuentra centralizada en **`js/data.js`**.

Para personalizar tu CV:
1. Abre el archivo [`js/data.js`](js/data.js).
2. Edita los campos en las secciones `es` (Español) y `en` (Inglés):
   - `personal`: Nombre, título, biografía, email, links a GitHub y LinkedIn.
   - `skills`: Categorías y tecnologías que dominas.
   - `experience`: Tu historia laboral y empresas.
   - `projects`: Proyectos con título, descripción, tecnologías usadas y enlaces.
   - `education`: Formación académica y certificaciones.
3. Guarda los cambios. ¡Eso es todo!

---

## 🚀 Despliegue en GitHub Pages

Dado que este sitio está creado en la raíz de tu repositorio `joscalejo.github.io`:

1. Haz un commit y sube los cambios a GitHub:
   ```bash
   git add .
   git commit -m "feat: Linux Terminal CV & Portfolio setup"
   git push origin main
   ```
2. En GitHub, ve a **Settings > Pages**.
3. En **Source**, selecciona `Deploy from a branch` y elige la rama `main` / carpeta `/ (root)`.
4. En 1-2 minutos, tu CV estará en vivo en:  
   👉 **`https://joscalejo.github.io`**

---

## 🖥️ Probar Localmente

Puedes abrir directamente el archivo `index.html` en cualquier navegador o correr un servidor web local sencillo:

```bash
python3 -m http.server 8080
```
Luego abre `http://localhost:8080` en tu navegador.
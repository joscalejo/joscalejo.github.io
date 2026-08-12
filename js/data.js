/**
 * CV Data Store (Bilingual Support ES / EN)
 * Central repository for profile, skills, experience, projects, and contact info.
 */

export const cvData = {
  es: {
    personal: {
      name: "José Callejo",
      handle: "joscalejo",
      title: "Desarrollador de Software & Entusiasta Tech",
      tagline: "Apasionado por construir soluciones de software elegantes, eficientes y escalables.",
      location: "América Latina",
      email: "jose.callejo@example.com",
      github: "https://github.com/joscalejo",
      linkedin: "https://linkedin.com/in/joscalejo",
      bio: "Desarrollador de software enfocado en crear aplicaciones web modernas, sistemas eficientes y herramientas interactivas. Con fuerte atención al detalle, buenas prácticas de desarrollo y arquitectura de software limpia."
    },
    skills: [
      {
        category: "Lenguajes & Frontend",
        items: ["JavaScript (ES6+)", "TypeScript", "HTML5 & CSS3", "React", "Vue.js", "Tailwind CSS"]
      },
      {
        category: "Backend & Bases de Datos",
        items: ["Node.js", "Python", "Express.js", "REST APIs", "PostgreSQL", "MongoDB"]
      },
      {
        category: "Herramientas & DevOps",
        items: ["Git & GitHub", "Docker", "Linux CLI / Bash", "CI/CD Pipelines", "Vite", "Jest / Testing"]
      }
    ],
    experience: [
      {
        role: "Desarrollador Full Stack Senior / Lead",
        company: "Innovación Tecnológica SpA",
        period: "2023 - Presente",
        description: "Liderazgo en el diseño e implementación de plataformas web escalables. Optimización de rendimiento de carga en un 40% y arquitectura de microservicios."
      },
      {
        role: "Desarrollador Frontend",
        company: "Estudio Digital",
        period: "2021 - 2023",
        description: "Desarrollo de interfaces dinámicas e interactivas utilizando React y JavaScript moderno. Integración de APIs RESTful y diseño responsive adaptativo."
      }
    ],
    projects: [
      {
        title: "Linux Terminal Portfolio",
        description: "Sitio web interactivo estilo consola Linux para CV personal con soporte i18n, temas y vista gráfica.",
        tags: ["Vanilla JS", "HTML5", "CSS3", "GitHub Pages"],
        github: "https://github.com/joscalejo/joscalejo.github.io",
        demo: "https://joscalejo.github.io"
      },
      {
        title: "System Monitor CLI Tool",
        description: "Herramienta de consola para monitoreo de recursos del sistema en tiempo real y alertas.",
        tags: ["Python", "Bash", "CLI"],
        github: "https://github.com/joscalejo/system-monitor",
        demo: "#"
      },
      {
        title: "E-Commerce REST API",
        description: "API de comercio electrónico con autenticación JWT, gestión de inventario y pasarela de pagos.",
        tags: ["Node.js", "Express", "PostgreSQL", "Docker"],
        github: "https://github.com/joscalejo/ecommerce-api",
        demo: "#"
      }
    ],
    education: [
      {
        degree: "Ingeniería / Licenciatura en Ciencias de la Computación",
        institution: "Universidad Tecnológica",
        period: "2017 - 2021"
      }
    ]
  },
  en: {
    personal: {
      name: "José Callejo",
      handle: "joscalejo",
      title: "Software Developer & Tech Enthusiast",
      tagline: "Passionate about building elegant, efficient, and scalable software solutions.",
      location: "Latin America",
      email: "jose.callejo@example.com",
      github: "https://github.com/joscalejo",
      linkedin: "https://linkedin.com/in/joscalejo",
      bio: "Software developer focused on building modern web applications, high-performance systems, and interactive tools. Driven by attention to detail, clean code architecture, and engineering best practices."
    },
    skills: [
      {
        category: "Languages & Frontend",
        items: ["JavaScript (ES6+)", "TypeScript", "HTML5 & CSS3", "React", "Vue.js", "Tailwind CSS"]
      },
      {
        category: "Backend & Databases",
        items: ["Node.js", "Python", "Express.js", "REST APIs", "PostgreSQL", "MongoDB"]
      },
      {
        category: "Tools & DevOps",
        items: ["Git & GitHub", "Docker", "Linux CLI / Bash", "CI/CD Pipelines", "Vite", "Jest / Testing"]
      }
    ],
    experience: [
      {
        role: "Senior Full Stack Developer",
        company: "Tech Innovation Corp",
        period: "2023 - Present",
        description: "Leading the architectural design and implementation of web platforms. Improved application performance by 40% using optimized microservices."
      },
      {
        role: "Frontend Developer",
        company: "Digital Studio",
        period: "2021 - 2023",
        description: "Developed dynamic, highly responsive web interfaces with React and modern JavaScript. Integrated complex REST APIs."
      }
    ],
    projects: [
      {
        title: "Linux Terminal Portfolio",
        description: "Interactive Linux console personal CV website with bilingual i18n, custom themes, and visual GUI view.",
        tags: ["Vanilla JS", "HTML5", "CSS3", "GitHub Pages"],
        github: "https://github.com/joscalejo/joscalejo.github.io",
        demo: "https://joscalejo.github.io"
      },
      {
        title: "System Monitor CLI Tool",
        description: "Command-line tool for real-time system resource monitoring and alerts.",
        tags: ["Python", "Bash", "CLI"],
        github: "https://github.com/joscalejo/system-monitor",
        demo: "#"
      },
      {
        title: "E-Commerce REST API",
        description: "Full-featured e-commerce API with JWT auth, inventory management, and payment processing.",
        tags: ["Node.js", "Express", "PostgreSQL", "Docker"],
        github: "https://github.com/joscalejo/ecommerce-api",
        demo: "#"
      }
    ],
    education: [
      {
        degree: "B.S. in Computer Science / Software Engineering",
        institution: "Tech University",
        period: "2017 - 2021"
      }
    ]
  }
};

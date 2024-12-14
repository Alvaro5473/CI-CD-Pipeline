# Introducción

# Estructura del proyecto

```
app
│
├── .github/
│   └── workflows
│       └── pipeline.yml
│
├── docker/
│   ├── docker-compose.yml
│   └── Dockerfile
│
├── public/
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   ├── App.css
│   ├── App.jsx
│   └── index.js
│
├── terraform/
│   ├── 0-main.tf
│   └── 1-s3.tf
│
├── testing/
│   │
│   ├── tests/
│   │   └── App.spec.js
│   │
│   └── playwright.config.js
│
├── .eslintrc.json
└── Makefile
```

## Public

En este directorio podemos encontrar el archivo `index.html` del proyecto. Este archivo no hace nada de forma independiente. Para que la aplicación funcione, es necesario instalar las dependencias con `npm install` y construir la aplicación con `npm run build`. Esto genera una versión lista para producción que enlaza el HTML con el código JavaScript generado por React.

## SRC

Este directorio contiene el código fuente de la aplicación. `App.jsx` es el componente principal de la aplicación, que define su estructura y lógica principal. `App.css` los estilos asociados a la aplicación, usados para dar formato visual a los componentes. `index.js` es el punto de entrada donde React renderiza el componente `App` en el DOM, iniciando la aplicación.

## Linter

El archivo `.eslintrc.json` configura **ESLint**, una herramienta para analizar y asegurar la calidad del código. Define reglas y estándares que el código debe seguir, ayudando a detectar errores, inconsistencias y malas prácticas de forma automática durante el desarrollo.

## Testing

**Playwright** permite realizar pruebas end-to-end confiables y rápidas en aplicaciones web, abarcando múltiples navegadores. Su capacidad para manejar interacciones complejas y simular entornos reales mejora la calidad del software, garantizando una experiencia consistente para los usuarios.

1. Test 1

## Docker

Esta carpeta permite simplificar el despliegue y la configuración del entorno del proyecto. El `Dockerfile` crea un contenedor portátil con todas las dependencias necesarias, mientras que el `docker-compose.yml` facilita la ejecución y orquestación del proyecto, agilizando tanto el desarrollo como la colaboración en equipo.

## Makefile

El archivo `Makefile` automatiza tareas y simplifica procesos repetitivos del desarrollo del proyecto. Estas tareas se explican en detalle más adelante.

## Pipeline

El archivo `pipeline.yml`, ubicado en `.github/workflows/`, configura un workflow para GitHub Actions que automatiza el ciclo CI/CD del proyecto. Permite ejecutar pruebas, construir la aplicación y desplegarla de forma continua, asegurando calidad y agilidad en cada cambio realizado en el repositorio. Los pasos que sigue el ciclo se explican en detalle más adelante.

# Comandos

Como hemos visto, este proyecto utiliza NodeJS y cuenta con un Makefile, lo que significa que disponemos de una gran variedad de comandos para ejecutar acciones en local.

- Instalar dependencias
  `make install` o `npm install && cd testing && npm install && cd ..`

- Ejecutar el linter
  `make lint` o `npm run lint` o `npx eslint src/*.jsx`

- Iniciar la aplicación en local para desarrollo
  `make start` o `npm start`

- Ejecutar los tests
  `make test` o `npm test` o `cd testing && npx playwright test && cd ..`

- Ejecutar el build de la aplicación
  `make build` o `npm run build`

- Ejecutar todos los comandos anteriores por orden
  `make all`

- También tenemos la opción de levantar la aplicación con Docker
  `make docker` o `docker-compose up -d`

# Ciclo CI/CD

1. Paso 1
2. Paso 2

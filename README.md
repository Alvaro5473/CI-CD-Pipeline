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

---

## Public

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

En este directorio podemos encontrar el archivo `index.html` del proyecto. Este archivo no hace nada de forma independiente. Para que la aplicación funcione, es necesario instalar las dependencias con `npm install` y construir la aplicación con `npm run build`. Esto genera una versión lista para producción que enlaza el HTML con el código JavaScript generado por React.

---

## SRC

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Este directorio contiene el código fuente de la aplicación. `App.jsx` es el componente principal de la aplicación, que define su estructura y lógica principal. `App.css` los estilos asociados a la aplicación, usados para dar formato visual a los componentes. `index.js` es el punto de entrada donde React renderiza el componente `App` en el DOM, iniciando la aplicación.

---

## Linter

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

El archivo `.eslintrc.json` configura **ESLint**, una herramienta para analizar y asegurar la calidad del código. Define reglas y estándares que el código debe seguir, ayudando a detectar errores, inconsistencias y malas prácticas de forma automática durante el desarrollo.

---

## Testing

![Playwright](https://img.shields.io/badge/-playwright-%232EAD33?style=for-the-badge&logo=playwright&logoColor=white)

**Playwright** permite realizar pruebas end-to-end confiables y rápidas en aplicaciones web, abarcando múltiples navegadores. Su capacidad para manejar interacciones complejas y simular entornos reales mejora la calidad del software, garantizando una experiencia consistente para los usuarios.

1. Test 1

---

## Docker

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Esta carpeta permite simplificar el despliegue y la configuración del entorno del proyecto. El `Dockerfile` crea un contenedor portátil con todas las dependencias necesarias, mientras que el `docker-compose.yml` facilita la ejecución y orquestación del proyecto, agilizando tanto el desarrollo como la colaboración en equipo.

---

## Terraform

![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)

Este contiene los scripts `0-main.tf` y `1-s3.tf`, necesarios para automatizar el despliegue de la aplicación en un bucket S3 de AWS. Con Terraform, se define la infraestructura como código, lo que garantiza un despliegue reproducible, escalable y fácil de gestionar.

---

## Makefile

![Makefile](https://img.shields.io/badge/Makefile-%23008FBA.svg?style=for-the-badge&logo=cmake&logoColor=white)

El archivo `Makefile` automatiza tareas y simplifica procesos repetitivos del desarrollo del proyecto. Estas tareas se explican en detalle más adelante.

---

## Pipeline

![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

El archivo `pipeline.yml`, ubicado en `.github/workflows/`, configura un workflow para GitHub Actions que automatiza el ciclo CI/CD del proyecto. Permite ejecutar pruebas, construir la aplicación y desplegarla de forma continua, asegurando calidad y agilidad en cada cambio realizado en el repositorio. Los pasos que sigue el ciclo se explican en detalle más adelante.

# Comandos

Como hemos visto, este proyecto utiliza NodeJS y cuenta con un Makefile, lo que significa que disponemos de una gran variedad de comandos para ejecutar acciones en local.

- Instalar dependencias<br>
  `make install` o `npm install && cd testing && npm install && cd ..`

---

- Ejecutar el linter<br>
  `make lint` o `npm run lint` o `npx eslint src/*.jsx`

---

- Iniciar la aplicación en local para desarrollo<br>
  `make start` o `npm start`

---

- Ejecutar los tests<br>
  `make test` o `npm test` o `cd testing && npx playwright test && cd ..`

---

- Ejecutar el build de la aplicación<br>
  `make build` o `npm run build`

---

- Ejecutar todos los comandos anteriores por orden<br>
  `make all`

---

- También tenemos la opción de levantar la aplicación con Docker<br>
  `make docker` o `docker-compose up -d`

# Ciclo CI/CD

A continuación, se explica paso a paso el comportamiento del flujo de trabajo.

---

### **1. Definición del pipeline y eventos que lo disparan**

```yaml
on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]
```

- Este flujo de trabajo se activa automáticamente en dos situaciones:
  - Cuando hay un `push` a la rama `main`.
  - Cuando se crea o actualiza un `pull request` hacia la rama `main`.

---

### **2. Permisos necesarios**

```yaml
permissions:
  contents: read
  id-token: write
```

- **`contents: read`**: Permite acceder al código fuente del repositorio.
- **`id-token: write`**: Habilita el uso de tokens de OpenID Connect (OIDC) para autenticarse en servicios externos como AWS.

---

### **3. Definición de trabajos (jobs)**

#### **Trabajo 1: `test`**

Este job realiza las pruebas automáticas. Detalles:

**Configuración básica:**

```yaml
runs-on: ubuntu-latest
```

- Se ejecuta en un contenedor Linux con la última versión de Ubuntu.

**Pasos del trabajo:**

1. **Clonar el repositorio:**

   ```yaml
   - uses: actions/checkout@v4
   ```

   Descarga el código del repositorio.

2. **Instalar dependencias del sistema necesarias para Playwright:**

   ```yaml
   run: |
     sudo apt-get update
     sudo apt-get install -y [paquetes]
   ```

   - Instala bibliotecas y dependencias necesarias para ejecutar tests con **Playwright** en navegadores.

3. **Configurar Node.js:**

   ```yaml
   - name: Configurar Node.js
     uses: actions/setup-node@v4
     with:
       node-version: "20"
       cache: "npm"
   ```

   - Configura Node.js versión 20 y habilita el caché para optimizar las instalaciones de paquetes.

4. **Instalar dependencias:**

   ```yaml
   run: npm ci
   ```

   - Instala dependencias del proyecto (con `npm ci` para un entorno reproducible).

5. **Ejecutar el linter:**

   ```yaml
   run: npm run lint
   ```

   - Verifica que el código siga las reglas de estilo definidas con **ESLint**.

6. **Preparar para pruebas con Playwright:**

   ```yaml
   working-directory: ./testing
   ```

   - Cambia al directorio `testing` y realiza:
     - Instalación de dependencias (`npm ci`).
     - Descarga de navegadores necesarios (`npx playwright install`).

7. **Iniciar la aplicación en segundo plano:**

   ```yaml
   run: npm start &
   ```

   - Lanza la aplicación en un proceso en segundo plano.

8. **Esperar a que la aplicación esté lista:**

   ```yaml
   run: sleep 10
   ```

   - Pausa por 10 segundos para garantizar que la aplicación haya arrancado.

9. **Ejecutar los tests:**
   ```yaml
   run: npm test
   ```
   - Ejecuta las pruebas definidas en el proyecto.

---

#### **Trabajo 2: `build-and-deploy`**

Este job construye y despliega la aplicación en un bucket S3 usando Terraform.

**Dependencia:**

```yaml
needs: test
```

- Este trabajo solo se ejecuta si el trabajo de pruebas (`test`) se completa exitosamente.

**Pasos del trabajo:**

1. **Clonar el repositorio:** Igual que en el trabajo `test`.

2. **Configurar Node.js:** Igual que en el trabajo `test`.

3. **Instalar dependencias:** Igual que en el trabajo `test`.

4. **Construir la aplicación:**

   ```yaml
   run: npm run build
   ```

   - Genera la versión optimizada de la aplicación para producción.

5. **Configurar credenciales de AWS:**

   ```yaml
   uses: aws-actions/configure-aws-credentials@v4
   ```

   - Configura las credenciales de AWS usando secretos definidos en el repositorio (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`).

6. **Configurar Terraform:**

   ```yaml
   uses: hashicorp/setup-terraform@v3
   ```

   - Configura Terraform en su versión `1.5.7`.

7. **Inicializar Terraform:**

   ```yaml
   run: terraform init
   working-directory: ./terraform
   ```

   - Inicializa Terraform en el directorio `./terraform`.

8. **Importar un bucket S3 existente:**

   ```yaml
   run: terraform import aws_s3_bucket.tasks-app ${{ secrets.S3_BUCKET_NAME }}
   working-directory: ./terraform
   ```

   - Asocia un bucket S3 existente a Terraform.

9. **Validar la configuración de Terraform:**

   ```yaml
   run: terraform validate
   working-directory: ./terraform
   ```

   - Verifica que la configuración de Terraform sea válida.

10. **Desplegar la infraestructura:**

    ```yaml
    run: terraform apply -auto-approve
    working-directory: ./terraform
    ```

    - Aplica los cambios de Terraform automáticamente.

11. **Subir artefactos al bucket S3:**
    ```yaml
    run: aws s3 sync ./build s3://${{ secrets.S3_BUCKET_NAME }}
    ```
    - Copia los archivos generados durante la construcción (`./build`) al bucket S3.

---

### **Resumen del flujo**

1. **Trabajo `test`:** Valida el código (linter) y ejecuta pruebas automáticas con Playwright.
2. **Trabajo `build-and-deploy`:**
   - Construye la aplicación si las pruebas pasan.
   - Despliega la aplicación en S3 usando AWS y Terraform.

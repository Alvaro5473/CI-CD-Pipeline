# CI-CD-Pipeline
## Estructura del proyecto
```
app
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
├── .eslintrc.json
├── docker-compose.yml
├── Dockerfile
├── Makefile
├── package-lock.json
└── package.json
```
## Comandos
Instalar dependencias<br>
`make install` `npm install`

Linter<br>
`make lint` `npm run lint` `npx eslint src/*.jsx`

Start<br>
`make start` `npm start`

Test<br>
`make test` `npm test` `npx playwright`

Build<br>
`make build` `npm run build`

All<br>
`make all`

Docker<br>
`npm docker` `docker-compose up -d`

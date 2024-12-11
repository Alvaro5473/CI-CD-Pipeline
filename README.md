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
Instalar dependencias
`make install` `npm install`
Linter
`make lint` `npm run lint` `npx eslint src/*.jsx`
Start
`make start` `npm start`
Test
`make test` `npm test` `npx playwright`
Build
`make build` `npm run build`
All
`make all`
Docker
`npm docker` `docker-compose up -d`

install:
	npm install && cd testing && npm install && cd ..

lint:
	npm run lint

start:
	npm start

test:
	npm test

build:
	npm run build

docker:
	docker-compose up -d

all: install lint start test build
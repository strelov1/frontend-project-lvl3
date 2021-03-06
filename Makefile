start:
	npx webpack serve

install:
	npm install

build:
	rm -rf dist
	NODE_ENV=production npx webpack

test:
	npm run test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

watch:
	npm run test:watch

publish:
	npm publish --dry-run

lint-fix:
	npx eslint . --fix

lint:
	npx eslint .
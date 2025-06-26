# app name should be overridden.
# ex) production-stage: make build APP_NAME=<APP_NAME>
# ex) development-stage: make build-dev APP_NAME=<APP_NAME>

APP_NAME = typescript-express-container
APP_NAME := $(APP_NAME)

.PHONY: build build-dev dev prod up down clean logs watch run install help

# Install dependencies
install:
	pnpm install

# Build the container image - Development
build-dev:
	docker build -t ${APP_NAME}-dev \
		--target development-build-stage \
		-f Dockerfile .

# Build the container image - Production
build:
	docker build -t ${APP_NAME} \
		--target production-build-stage \
		-f Dockerfile .

# Start development environment
dev:
	docker-compose -f docker-compose-dev.yml up --build

# Start production environment
prod:
	docker-compose up --build

# Start development environment in background
dev-daemon:
	docker-compose -f docker-compose-dev.yml up -d --build

# Start production environment in background
prod-daemon:
	docker-compose up -d --build

# Build and start the whole environment
up:
	docker-compose up --build --force-recreate

# Stop all services
down:
	docker-compose down
	docker-compose -f docker-compose-dev.yml down

# Stop and remove all containers, networks, and volumes
down-all:
	docker-compose down -v --remove-orphans
	docker-compose -f docker-compose-dev.yml down -v --remove-orphans

# View logs
logs:
	docker-compose logs -f

# View development logs
logs-dev:
	docker-compose -f docker-compose-dev.yml logs -f

# Watch current containers
watch:
	docker ps -a

# Clean the container images and containers
clean:
	docker-compose down --rmi all --volumes --remove-orphans
	docker-compose -f docker-compose-dev.yml down --rmi all --volumes --remove-orphans
	docker rmi -f ${APP_NAME} ${APP_NAME}-dev 2>/dev/null || true
	docker system prune -f

# Run the container image directly
run:
	docker run -d -it -p 3000:3000 --name ${APP_NAME}-instance ${APP_NAME}

# Run development container directly
run-dev:
	docker run -d -it -p 3000:3000 --name ${APP_NAME}-dev-instance ${APP_NAME}-dev

# Restart services
restart:
	docker-compose restart

# Restart development services
restart-dev:
	docker-compose -f docker-compose-dev.yml restart

# Show help
help:
	@echo "Available commands:"
	@echo "  install     - Install dependencies with pnpm"
	@echo "  build-dev   - Build development Docker image"
	@echo "  build       - Build production Docker image"
	@echo "  dev         - Start development environment"
	@echo "  prod        - Start production environment"
	@echo "  dev-daemon  - Start development environment in background"
	@echo "  prod-daemon - Start production environment in background"
	@echo "  up          - Build and start production environment"
	@echo "  down        - Stop all services"
	@echo "  down-all    - Stop and remove all containers, networks, and volumes"
	@echo "  logs        - View production logs"
	@echo "  logs-dev    - View development logs"
	@echo "  watch       - Show running containers"
	@echo "  clean       - Clean all containers and images"
	@echo "  run         - Run production container directly"
	@echo "  run-dev     - Run development container directly"
	@echo "  restart     - Restart production services"
	@echo "  restart-dev - Restart development services"
	@echo "  help        - Show this help message"

all: build

[![CI](https://github.com/vintasoftware/nextjs-fastapi-template/actions/workflows/ci.yml/badge.svg)](https://github.com/vintasoftware/nextjs-fastapi-template/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/vintasoftware/nextjs-fastapi-template/badge.svg)](https://coveralls.io/github/vintasoftware/nextjs-fastapi-template)

# nextjs-fastapi-template

## Table of Contents
* [About](#about)
* [Share your project!](#share-your-project)
* [Local Setup](#local-setup)
  * [Installing Required Tools](#installing-required-tools)
    * [1. Poetry](#1-poetry)
    * [2. Node.js, npm and pnpm](#2-nodejsm-npm-and-pnpm)
    * [3. Docker](#3-docker)
    * [4. Docker Compose](#4-docker-compose)
  * [Setting Up Environment Variables](#setting-up-environment-variables)
  * [If you are not using Docker](#if-you-are-not-using-docker)
    * [Backend](#backend)
    * [Frontend](#frontend)
  * [If you are using Docker](#if-you-are-using-docker)
* [Pre-Commit Setup](#pre-commit-setup)
  * [Installing and Activating Pre-Commit Hooks](#installing-and-activating-pre-commit-hooks)
  * [Running Pre-Commit Checks](#running-pre-commit-checks)
  * [Updating Pre-Commit Hooks](#updating-pre-commit-hooks)
* [Running the Application](#running-the-application)
* [Watchers](#watchers)
  * [Recommended Approach](#recommended-approach-run-both-watchers-and-servers-simultaneously)
  * [Manual Execution of Watcher Commands](#manual-execution-of-watcher-commands)
* [Testing](#testing)
* [Alembic migrations](#alembic-migrations)
* [Makefile](#makefile)
* [Important Considerations](#important-considerations)
* [Contributing](#contributing)
* [Commercial Support](#commercial-support)

## About
This template streamlines building APIs with [FastAPI](https://fastapi.tiangolo.com/) and dynamic frontends with [Next.js](https://nextjs.org/). It integrates the backend and frontend using [@hey-api/openapi-ts](https://github.com/hey-ai/openapi-ts) to generate a type-safe client, with automated watchers to keep the OpenAPI schema and client updated, ensuring a smooth and synchronized development workflow.  

- [Next.js](https://nextjs.org/): Fast, SEO-friendly frontend framework  
- [FastAPI](https://fastapi.tiangolo.com/): High-performance Python backend  
- [SQLAlchemy](https://www.sqlalchemy.org/): Powerful Python SQL toolkit and ORM
- [PostgreSQL](https://www.postgresql.org/): Advanced open-source relational database
- [Pydantic](https://docs.pydantic.dev/): Data validation and settings management using Python type annotations
- [Zod](https://zod.dev/) + [TypeScript](https://www.typescriptlang.org/): End-to-end type safety and schema validation  
- [fastapi-users](https://fastapi-users.github.io/fastapi-users/): Complete authentication system with:
  - Secure password hashing by default
  - JWT (JSON Web Token) authentication
  - Email-based password recovery
- [Shadcn/ui](https://ui.shadcn.com/): Beautiful and customizable React components
- [OpenAPI-fetch](https://github.com/Hey-AI/openapi-fetch): Fully typed client generation from OpenAPI schema  
- [fastapi-mail](https://sabuhish.github.io/fastapi-mail/): Efficient email handling for FastAPI applications
- [Poetry](https://python-poetry.org/): Dependency management and packaging made easy
- [Pytest](https://docs.pytest.org/): Powerful Python testing framework
- Code Quality Tools:
  - [Ruff](https://github.com/astral-sh/ruff): Fast Python linter
  - [ESLint](https://eslint.org/): JavaScript/TypeScript code quality
- Watchers:  
  - Backend: [Watchdog](https://github.com/gorakhargosh/watchdog) for monitoring file changes  
  - Frontend: [Chokidar](https://github.com/paulmillr/chokidar) for live updates  
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/): Consistent environments for development and production  
- [Pre-commit hooks](https://pre-commit.com/): Enforce code quality with automated checks  
- [OpenAPI JSON schema](https://swagger.io/specification/): Centralized API documentation and client generation  

With this setup, you'll save time and maintain a seamless connection between your backend and frontend, boosting productivity and reliability.  


## Share your project!

Several people have leveraged our template to start spinoffs or to boost their efforts in the challenging pursuit of securing funding. Starting with a solid foundation allows you to create more resilient products and focus on what really matters: discovering and delivering value to your customers. If you are one of those people, we're eager to help you even more! We can spread the word about your project across our social media platforms, giving you access to a broader audience.

Send us an email at contact@vintasoftware.com telling us a bit more about how our template helped you boost your project.


## Setup

### Installing Required Tools

#### 1. Poetry
Poetry is used to manage Python dependencies in the backend. Install Poetry by following the [official installation guide](https://python-poetry.org/docs/#installation).

#### 2. Node.jsm, npm and pnpm
Ensure Node.js and npm are installed for running the frontend. Follow the [Node.js installation guide](https://nodejs.org/en/download/).
After that install pnpm by running:
```bash
npm install -g pnpm
```

#### 3. Docker
Docker is needed to run the project in a containerized environment. Follow the appropriate installation guide:

- [Install Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
- [Install Docker for Windows](https://docs.docker.com/docker-for-windows/install/)
- [Get Docker CE for Linux](https://docs.docker.com/install/linux/docker-ce/)

#### 4. Docker Compose
Ensure `docker-compose` is installed. Refer to the [Docker Compose installation guide](https://docs.docker.com/compose/install/).

### Setting Up Environment Variables
Create or update the `.env` files in the `fastapi_backend` and `nextjs-frontend` directories with the following variables:

**Backend (`fastapi_backend/.env`):**

For local setup:
```
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/mydatabase
```
For Docker setup, replace localhost with db:
```
DATABASE_URL=postgresql+asyncpg://postgres:password@db:5432/mydatabase
```
Other environment variables remain unchanged:

```env
ACCESS_SECRET_KEY=<your-secret-key>
RESET_PASSWORD_SECRET_KEY=<your-secret-key>
VERIFICATION_SECRET_KEY=<your-secret-key>
OPENAPI_OUTPUT_FILE=../nextjs-frontend/openapi.json

MAIL_USERNAME=<your-username>
MAIL_PASSWORD=<your-password>
MAIL_FROM=<your-from>
MAIL_SERVER=<your-server>
```

**Frontend (`nextjs-frontend/.env.local`):**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
OPENAPI_OUTPUT_FILE=openapi.json
```

### If you are not using Docker:
To run the project locally, use the following commands:

#### Backend

1. Navigate to the `fastapi_backend` directory and run:
   ```bash
   poetry install
   ```
2. Use Docker to run the database to avoid local installation issues. Build and start the database container:
   ```bash
   docker compose build db
   docker compose up db
   ```
3. Run the following command to apply database migrations:
   ```bash
   make docker-migrate-db
   ```
4. Start the FastAPI server:
   ```bash
   make start-backend
   ```

#### Frontend
1. Navigate to the `nextjs-frontend` directory and run:
   ```bash
   pnpm install
   ```
2. Start the Next.js development server:
   ```bash
   make start-frontend
   ```

### If you are using Docker:
1. Ensure Docker is running.
2. Run the following command to build and start the backend, frontend, and database containers:
   ```bash
   make docker-up-backend
   make docker-up-frontend
   ```
   This command will automatically set up the database and other necessary containers.

3. To create the database schema for the first time, run:
   ```bash
   make docker-migrate-db
   ```

## Pre-Commit Setup
To maintain code quality and consistency, the project includes two separate pre-commit configuration files:
- `.pre-commit-config.yaml` for running pre-commit checks locally.
- `.pre-commit-config.docker.yaml` for running pre-commit checks within Docker.

### Installing and Activating Pre-Commit Hooks
To activate pre-commit hooks, run the following commands for each configuration file:

- **For the local configuration file**:
  ```bash
  pre-commit install -c .pre-commit-config.yaml
  ```

- **For the Docker configuration file**:
  ```bash
  pre-commit install -c .pre-commit-config.docker.yaml
  ```

### Running Pre-Commit Checks
To manually run the pre-commit checks on all files, use:

```bash
pre-commit run --all-files -c .pre-commit-config.yaml
```

or

```bash
pre-commit run --all-files -c .pre-commit-config.docker.yaml
```

### Updating Pre-Commit Hooks
To update the hooks to their latest versions, run:

```bash
pre-commit autoupdate
```

## Running the Application
- **Backend**: Access the API at `http://localhost:8000`.
- **Frontend**: Access the web application at `http://localhost:3000`.

## Watchers
The project includes two watchers, one for the backend and one for the frontend, which automatically restart when they detect changes.

- The **backend watcher** monitors changes to the API code.
- The **frontend watcher** monitors changes to the `openapi.json` schema generated by the backend.

### Recommended Approach: Run Both Watchers and Servers Simultaneously
To streamline development, it is recommended to run both the backend and frontend watchers at the same time. This approach will start both servers and their respective watchers, ensuring they are restarted automatically whenever changes are detected.

- Use the following commands:
    ```bash
    make watch-backend
    make watch-frontend
    ```
This will run both the backend and frontend servers, as well as the watchers, ensuring that the application is always up-to-date without needing manual restarts.  

### Manual Execution of Watcher Commands
You can manually execute the same commands that the watchers call when they detect a change:

1. To export the `openapi.json` schema:
   ```bash
   cd fastapi_backend && poetry run python -m app.commands.generate_openapi_schema
   ```
   or using Docker:
   ```bash
   docker compose run --rm --no-deps -T backend poetry run python -m app.commands.generate_openapi_schema
   ```

2. To generate the frontend client:
   ```bash
   cd nextjs-frontend && npm run generate-client
   ```
   or using Docker:
   ```bash
   docker compose run --rm --no-deps -T frontend npm run generate-client
   ```

## Testing
To run the tests, you need to run the test database container:
   ```bash
   make docker-up-test-db
   ```

Then run the tests locally:
   ```bash
   make test-backend
   make test-frontend
   ```

Or using Docker:
   ```bash
   make docker-test-backend
   make docker-test-frontend
   ```

## Alembic migrations
If you need to create a new migration, you can do it by running:
   ```bash
   make docker-db-schema migration_name="add users"
   ```
then apply the migration to the database:
   ```bash
   make docker-migrate-db
   ```

## Makefile

This project includes a `Makefile` that provides a set of commands to simplify common tasks such as starting the backend and frontend servers, running tests, building Docker containers, and more.

### Available Commands

You can see all available commands and their descriptions by running the following command in your terminal:

```bash
make help
```

## Important Considerations
- **Environment Variables**: Ensure your `.env` files are up-to-date.
- **Database Setup**: It is recommended to use Docker for running the database, even when running the backend and frontend locally, to simplify configuration and avoid potential conflicts.
- **Consistency**: It is **not recommended** to switch between running the project locally and using Docker, as this may cause permission issues or unexpected problems. Choose one method and stick with it.

## Contributing

If you wish to contribute to this project, please first discuss the change you wish to make via an [issue](https://github.com/vintasoftware/nextjs-fastapi-template/issues).

Check our [contributing guide](https://github.com/vintasoftware/nextjs-fastapi-template/blob/main/CONTRIBUTING.md) to learn more about our development process and how you can test your changes to the boilerplate.

## Commercial Support

[![alt text](https://avatars2.githubusercontent.com/u/5529080?s=80&v=4 "Vinta Logo")](https://www.vinta.com.br/)

This project is maintained by [Vinta Software](https://www.vinta.com.br/) and is used in products of Vinta's clients. We are always looking for exciting work! If you need any commercial support, feel free to get in touch: contact@vinta.com.br
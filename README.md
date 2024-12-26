[![CI](https://github.com/vintasoftware/nextjs-fastapi-template/actions/workflows/ci.yml/badge.svg)](https://github.com/vintasoftware/nextjs-fastapi-template/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/vintasoftware/nextjs-fastapi-template/badge.svg)](https://coveralls.io/github/vintasoftware/nextjs-fastapi-template)

# nextjs-fastapi-template

## Table of Contents
* [About](#about)
* [Production-Ready Authentication & Dashboard](#production-ready-authentication-and-dashboard)
* [Getting Started with This Template](#getting-started-with-this-template)
* [Setup](#local-setup)
  * [Installing Required Tools](#installing-required-tools)
    * [1. Poetry](#1-poetry)
    * [2. Node.js, npm and pnpm](#2-nodejsm-npm-and-pnpm)
    * [3. Docker](#3-docker)
    * [4. Docker Compose](#4-docker-compose)
  * [Setting Up Environment Variables](#setting-up-environment-variables)
  * [Running the Database](#running-the-database)
  * [Build the project (without Docker)](#build-the-project-without-docker)
    * [Backend](#backend)
    * [Frontend](#frontend)
  * [Build the project (with Docker)](#build-the-project-with-docker)
    * [Backend](#backend)
    * [Frontend](#frontend)
* [Running the Application](#running-the-application)
* [Hot Reload on development](#hot-reload-on-development)
  * [Manual Execution of Hot Reload Commands](#manual-execution-of-hot-reload-commands)
* [Testing](#testing)
* [Email Localhost Setup](#email-localhost-setup)
* [Pre-Commit Setup](#pre-commit-setup)
  * [Installing and Activating Pre-Commit Hooks](#installing-and-activating-pre-commit-hooks)
  * [Running Pre-Commit Checks](#running-pre-commit-checks)
  * [Updating Pre-Commit Hooks](#updating-pre-commit-hooks)
* [Alembic Database Migrations](#alembic-database-migrations)
* [GitHub Actions](#github-actions)
  * [Secrets Configuration](#secrets-configuration)
* [Makefile](#makefile)
* [Important Considerations](#important-considerations)
* [Contributing](#contributing)
* [Share your project!](#share-your-project)
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
- Hot reload watchers:  
  - Backend: [Watchdog](https://github.com/gorakhargosh/watchdog) for monitoring file changes  
  - Frontend: [Chokidar](https://github.com/paulmillr/chokidar) for live updates  
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/): Consistent environments for development and production
- [MailHog](https://github.com/mailhog/MailHog): Email server for development
- [Pre-commit hooks](https://pre-commit.com/): Enforce code quality with automated checks  
- [OpenAPI JSON schema](https://swagger.io/specification/): Centralized API documentation and client generation  

With this setup, you'll save time and maintain a seamless connection between your backend and frontend, boosting productivity and reliability.

## Production-Ready Authentication & Dashboard features
This template comes with a pre-configured authentication system and a simple dashboard interface, allowing you to start building your application with user management features right away.

## Getting Started with This Template

To use this template for your own project:

1. Create a new repository using this template by following GitHub's [template repository guide](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template)
2. Clone your new repository and navigate to it: `cd your-project-name`
3. Update this README:
   - Change the project name in the first line
   - Remove this "Getting Started with This Template" section
4. Make sure you have Python 3.12 installed

Once completed, proceed to the [Setup](#setup) section below.

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

**Backend (`fastapi_backend/.env`):**
Copy the `.env.example` files to `.env` and update the variables with your own values.
   ```bash
   cd fastapi_backend && cp .env.example .env
   ```
1. You will only need to update the secret keys. You can use the following command to generate a new secret key:
   ```bash
   python3 -c "import secrets; print(secrets.token_hex(32))"
   ```
2. The DATABASE, MAIL, OPENAPI, and FRONTEND_URL settings are ready to use locally.
3. You can check the .env.example file for more information about the variables.

**Frontend (`nextjs-frontend/.env.local`):**
Copy the `.env.example` files to `.env`. These values are unlikely to change, so you can leave them as they are.
   ```bash
   cd nextjs-frontend && cp .env.example .env
   ```

### Running the Database
1. Use Docker to run the database to avoid local installation issues. Build and start the database container:
   ```bash
   docker compose build db
   docker compose up db
   ```
2. Run the following command to apply database migrations:
   ```bash
   make docker-migrate-db
   ```

### Build the project (without Docker):
To setup the project environment locally, use the following commands:

#### Backend

1. Navigate to the `fastapi_backend` directory and run:
   ```bash
   poetry install
   ```

#### Frontend
1. Navigate to the `nextjs-frontend` directory and run:
   ```bash
   pnpm install
   ```

### Build the project (with Docker):

1. Build the backend and frontend containers:
   ```bash
   make docker-build-backend
   make docker-build-frontend
   ```

## Running the Application

If you are not using Docker:

1. Start the FastAPI server:
   ```bash
   make start-backend
   ```

2. Start the Next.js development server:
   ```bash
   make start-frontend
   ```

If you are using Docker:
1. Start the FastAPI server container:
   ```bash
   make docker-up-backend
   ```
2. Start the Next.js development server container:
   ```bash
   make docker-up-frontend
   ```

- **Backend**: Access the API at `http://localhost:8000`.
- **Frontend**: Access the web application at `http://localhost:3000`.

### Hot Reload on development
The project includes two hot reloads when running the application, one for the backend and one for the frontend, which automatically restart local servers when they detect changes. This ensures that the application is always up-to-date without needing manual restarts.

- The **backend hot reload** monitors changes to the backend code.
- The **frontend hot reload** monitors changes to the frontend code, as well as to the `openapi.json` schema generated by the backend.

### Manual Execution of Hot Reload Commands
You can manually execute the same commands that the hot reloads call when they detect a change:

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

### Email Localhost Setup

To setup the email locally, you need to start [MailHog](https://github.com/mailhog/MailHog) by running the following command:
   ```bash
   make docker-up-mailhog
   ```

- **Email client**: Access the email at `http://localhost:8025`.

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
## Alembic Database Migrations
If you need to create a new Database Migration:
   ```bash
   make docker-db-schema migration_name="add users"
   ```
then apply the migration to the database:
   ```bash
   make docker-migrate-db
   ```

## GitHub Actions
This project comes with a pre-configured GitHub Actions setup to enable CI/CD. You can find the workflow configuration files inside the .github/workflows directory. Feel free to customize these workflows to better suit your project's needs.

### Secrets Configuration
For the workflows to function correctly, make sure to add the necessary secret keys to your GitHub repository's settings. Navigate to Settings > Secrets and variables > Actions and add the following keys:
```
DATABASE_URL: The connection string for your primary database.
TEST_DATABASE_URL: The connection string for your test database.
ACCESS_SECRET_KEY: The secret key for access token generation.
RESET_PASSWORD_SECRET_KEY: The secret key for reset password functionality.
VERIFICATION_SECRET_KEY: The secret key for email or user verification.
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

## Share your project!

You can use our template to kick-start your project or streamline your efforts in securing funding. Starting with a strong foundation can make your product more resilient and allow you to focus on what matters most: delivering value to your customers.

If our template has been part of your journey, we'd love to hear about it! Share your story with us, and we’ll help spread the word about your project through our social media channels, giving it a broader reach.

Send us an email at contact@vintasoftware.com telling us a bit more about how our template helped you boost your project.

## Commercial Support

[![alt text](https://avatars2.githubusercontent.com/u/5529080?s=80&v=4 "Vinta Logo")](https://www.vinta.com.br/)

This project is maintained by [Vinta Software](https://www.vinta.com.br/) and is used in products of Vinta's clients. We are always looking for exciting work! If you need any commercial support, feel free to get in touch: contact@vinta.com.br

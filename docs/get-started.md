To use this template for your own project:

1. Create a new repository using this template by following GitHub's [template repository guide](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template)
2. Clone your new repository and navigate to it: `cd your-project-name`
3. Make sure you have Python 3.12 installed

Once completed, proceed to the [Setup](#setup) section below.

## Setup

### Installing Required Tools

#### 1. uv
uv is used to manage Python dependencies in the backend. Install uv by following the [official installation guide](https://docs.astral.sh/uv/getting-started/installation/).

#### 2. Node.js, npm, and pnpm
To run the frontend, ensure Node.js and npm are installed. Follow the [Node.js installation guide](https://nodejs.org/en/download/).
After that, install pnpm by running:
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
You will only need to update the secret keys. You can use the following command to generate a new secret key:
   ```bash
   python3 -c "import secrets; print(secrets.token_hex(32))"
   ```

- The DATABASE, MAIL, OPENAPI, CORS, and FRONTEND_URL settings are ready to use locally.

- The DATABASE and MAIL settings are already configured in Docker Compose if you're using Docker.

- The OPENAPI_URL setting is commented out. Uncommenting it will hide the /docs and openapi.json URLs, which is ideal for production.

You can check the .env.example file for more information about the variables.

**Frontend (`nextjs-frontend/.env.local`):**

Copy the `.env.example` files to `.env.local`. These values are unlikely to change, so you can leave them as they are.
   ```bash
   cd nextjs-frontend && cp .env.example .env.local
   ```

### Running the Database
Use Docker to run the database to avoid local installation issues. Build and start the database container:
   ```bash
   docker compose build db
   docker compose up -d db
   ```
Run the following command to apply database migrations:
   ```bash
   make docker-migrate-db
   ```

### Build the project (without Docker):
To set the project environment locally, use the following commands:

#### Backend

Navigate to the `fastapi_backend` directory and run:
   ```bash
   uv sync
   ```

#### Frontend
Navigate to the `nextjs-frontend` directory and run:
   ```bash
   pnpm install
   ```

### Build the project (with Docker):

Build the backend and frontend containers:
   ```bash
   make docker-build
   ```

## Running the Application

**If you are not using Docker:**

Start the FastAPI server:
   ```bash
   make start-backend
   ```

Start the Next.js development server:
   ```bash
   make start-frontend
   ```

**If you are using Docker:**

Start the FastAPI server container:
   ```bash
   make docker-start-backend
   ```
Start the Next.js development server container:
   ```bash
   make docker-start-frontend
   ```

- **Backend**: Access the API at `http://localhost:8000`.
- **Frontend**: Access the web application at `http://localhost:3000`.

## Important Considerations
- **Environment Variables**: Ensure your `.env` files are up-to-date.
- **Database Setup**: It is recommended to use Docker to run the database, even when running the backend and frontend locally, to simplify configuration and avoid potential conflicts.
- **Consistency**: It is **not recommended** to switch between running the project locally and using Docker, as this may cause permission issues or unexpected problems. You can choose one method and stick with it.

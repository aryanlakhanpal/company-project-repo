# company-project-repo
# Conversational AI - Full Stack E-Commerce Agent

This repository contains the source code for a full-stack conversational AI application, including a React frontend, a Node.js backend, and a MongoDB database, all containerized with Docker.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Directory Structure

```
/
├── backend/        # Node.js backend service
│   ├── Dockerfile
│   └── ...
├── frontend/       # React frontend application
│   ├── Dockerfile
│   ├── nginx.conf
│   └── ...
├── data/           # CSV data for ingestion
├── docker-compose.yml # Orchestration file
└── README.md
```

## Running the Application

The entire application stack can be launched with a single command from the root of the repository.

1.  **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Run the data ingestion script (First time only)**:
    Before starting the services, populate the database with the e-commerce product data.
    ```bash
    cd backend
    npm install
    node scripts/load_data.js
    cd ..
    ```

3.  **Build and start the services**:
    This command will build the Docker images for the frontend and backend and start all three services (frontend, backend, database).
    ```bash
    docker-compose up --build
    ```

4.  **Access the Application**:
    - **Frontend Chat**: [http://localhost:3000](http://localhost:3000)
    - **Backend API**: [http://localhost:3001](http://localhost:3001)

## Stopping the Application

To stop and remove the containers, networks, and volumes, run the following command from the root directory:
```bash
docker-compose down
```
To stop without removing the database volume, use:
```bash
docker-compose stop
```
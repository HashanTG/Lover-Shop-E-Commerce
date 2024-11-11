# Lover Shop E-Commerce Application

Lover Shop is a full-stack e-commerce web application built using React with Vite for the frontend, Spring Boot for the backend, and MongoDB as the database. This setup leverages Docker to containerize each service, simplifying deployment and development with isolated environments.

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Configure Environment Variables](#2-configure-environment-variables)
  - [3. Build and Run with Docker Compose](#3-build-and-run-with-docker-compose)
- [Docker Configuration](#docker-configuration)
- [Common Docker Commands](#common-docker-commands)
- [Troubleshooting](#troubleshooting)


---

## Project Overview

Lover Shop provides a user-friendly platform for users to browse and purchase products. It utilizes Docker for streamlined development and deployment, ensuring that all services are containerized and can be run in any environment that supports Docker.

## Tech Stack

- **Frontend**: React with Vite (development server and hot-reloading).
- **Backend**: Spring Boot (Java) for REST APIs.
- **Database**: MongoDB (hosted).
- **Containerization**: Docker and Docker Compose.

---

## Prerequisites

Make sure the following tools are installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```


### 2. configure-environment-variables

Create a .env file in the root directory of the project to store sensitive information and required configurations.

##### MongoDB configuration

```bash
SPRING_DATA_MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net
```

```bash
-SPRING_DATA_MONGODB_DATABASE=LoverShop
```


### 3. Build with Docker

Use Docker Compose to build and start all services in detached mode:

```bash
docker-compose up --build -d
```

The frontend service will be accessible at: http://localhost:5173
The backend service will be accessible at: http://localhost:8080

---

### Common Docker Commands

Start the Containers
```bash
docker-compose up
```
Build the Containers
```bash
docker-compose up --build
```

---

## Troubleshooting

- **MongoDB Connection Errors**:Ensure your MongoDB URI and credentials in the .env file are correct.
Verify that MongoDB Atlas allows connections from your IP address.

- **Frontend Not Loading**:
Make sure the frontend service is running on http://localhost:5173.
Check for any network issues or blocked ports.

- **Backend API Not Responding**:
Ensure the backend service is running and reachable on http://localhost:8080.
Check Docker logs for any error messages in the backend container.



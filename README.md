# Summative DevOps for Fullstack

This project is a Node.js backend API for a blog application with authentication and CRUD operations for blog posts. The project includes a comprehensive DevOps pipeline for CI/CD, containerization, and deployment to an Azure server.

## Features

- Node.js backend API
- User authentication
- CRUD operations for blog posts
- CI/CD pipeline using GitHub Actions
- Docker containerization
- Deployment to Azure server
- Infrastructure as Code with Terraform
- Monitoring with Prometheus and Grafana

## Prerequisites

- Node.js and npm
- Docker
- Azure account
- GitHub repository with the following secrets:
  - `DOCKER_USERNAME`
  - `DOCKER_PASSWORD`
  - `SYNK_TOKEN`

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/Nmesoma01/summative-DevOps-for-Fullstack.git
    cd summative-DevOps-for-Fullstack
    ```

2. Apply Terraform configuration:

    ```bash
    terraform apply
    ```

## Deployment

The deployment to the Azure server is handled through the GitHub Actions workflow. Ensure that the necessary secrets are added to your GitHub repository.

The deployment steps are:

1. SSH into the Azure server
2. Install Docker (if not already installed)
3. Pull the latest Docker image
4. Stop and remove any existing Docker containers
5. Run the new Docker container

## CI/CD Pipeline

The GitHub Actions workflow for this project automates the following tasks:

- Checking out the code
- Setting up Node.js
- Installing dependencies
- Running code linting
- Running tests
- Authenticating Snyk for security scanning
- Building the Docker image
- Logging in to Docker Hub
- Pushing the Docker image to Docker Hub

Here is the GitHub Actions workflow configuration:

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    - name: Install Snyk CLI
      run: npm install -g snyk

    - name: Lint code
      run: npm run lint

    - name: Run tests
      run: npm test

    - name: Authenticate Snyk
      run: snyk auth ${{ secrets.SYNK_TOKEN }}

    - name: Run security scan
      run: npm run security

    - name: Build Docker image
      run: docker build -t nmesoma01/nodejs-blogging-api .

    - name: Log in to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Push Docker image
      run: docker push nmesoma01/nodejs-blogging-api
...


## Monitoring and Logging

### Monitoring

We use Prometheus to track application performance and health metrics. The metrics are exposed at the `/metrics` endpoint.

#### Configuration

- **Prometheus**: Make sure you configure Prometheus to scrape the `/metrics` endpoint of your application.

### Setting Up Prometheus and Grafana

1. Install Prometheus and Grafana on your server.
2. Configure Prometheus to scrape your application’s metrics endpoint.
3. Integrate Grafana with Prometheus to visualize the metrics.

## Author

Nmesoma - [GitHub Profile](https://github.com/Nmesoma01)

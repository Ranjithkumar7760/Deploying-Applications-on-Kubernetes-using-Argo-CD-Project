#!/bin/bash

# Configuration
REGISTRY="your-registry"  # Replace with your ECR registry URL
REGION="us-west-2"       # Replace with your AWS region
BACKEND_IMAGE="$REGISTRY/expense-backend"
FRONTEND_IMAGE="$REGISTRY/expense-frontend"
TAG="latest"

# Login to ECR
echo "Logging in to ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $REGISTRY

# Build and push backend
echo "Building backend image..."
docker build -t $BACKEND_IMAGE:$TAG ./Application-Code/backend/
echo "Pushing backend image..."
docker push $BACKEND_IMAGE:$TAG

# Build and push frontend
echo "Building frontend image..."
docker build -t $FRONTEND_IMAGE:$TAG ./Application-Code/frontend/
echo "Pushing frontend image..."
docker push $FRONTEND_IMAGE:$TAG

echo "Images pushed successfully!"
echo "Backend: $BACKEND_IMAGE:$TAG"
echo "Frontend: $FRONTEND_IMAGE:$TAG"
#!/bin/bash

# Configuration
REGISTRY="126623035052.dkr.ecr.us-east-1.amazonaws.com"  # Your ECR registry URL
REGION="us-east-1"       # Your AWS region
BACKEND_IMAGE="$REGISTRY/argocd-ecr"
FRONTEND_IMAGE="$REGISTRY/argocd-ecr"
TAG="latest"

# Login to ECR
echo "Logging in to ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $REGISTRY

# Build and push backend
echo "Building backend image..."
docker build -t $BACKEND_IMAGE:backend-$TAG ./Application-Code/backend/
echo "Pushing backend image..."
docker push $BACKEND_IMAGE:backend-$TAG

# Build and push frontend
echo "Building frontend image..."
docker build -t $FRONTEND_IMAGE:frontend-$TAG ./Application-Code/frontend/
echo "Pushing frontend image..."
docker push $FRONTEND_IMAGE:frontend-$TAG

echo "Images pushed successfully!"
echo "Backend: $BACKEND_IMAGE:$TAG"
echo "Frontend: $FRONTEND_IMAGE:$TAG"
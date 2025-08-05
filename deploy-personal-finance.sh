#!/bin/bash

echo "🚀 Deploying Personal Finance Application..."

# Apply the deployment file
kubectl apply -f personal-finance-app.yaml

echo "✅ Deployment applied successfully!"
echo ""
echo "📋 Checking deployment status..."

# Wait a moment for resources to be created
sleep 5

# Check namespace
echo "🔍 Checking namespace..."
kubectl get namespace personal-finance-app

# Check deployments
echo "🔍 Checking deployments..."
kubectl get deployments -n personal-finance-app

# Check pods
echo "🔍 Checking pods..."
kubectl get pods -n personal-finance-app

# Check services
echo "🔍 Checking services..."
kubectl get services -n personal-finance-app

# Check ingress
echo "🔍 Checking ingress..."
kubectl get ingress -n personal-finance-app

echo ""
echo "🎉 Deployment completed!"
echo "📝 Use the following commands to monitor your application:"
echo "   kubectl get pods -n personal-finance-app -w"
echo "   kubectl logs -f deployment/backend -n personal-finance-app"
echo "   kubectl logs -f deployment/frontend -n personal-finance-app"
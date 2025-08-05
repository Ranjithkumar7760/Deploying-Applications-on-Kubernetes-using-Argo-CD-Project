#!/bin/bash

echo "🚀 Deploying Expense Tracker Application..."

# Apply the single deployment file
kubectl apply -f expense-tracker-all-in-one.yaml

echo "✅ Deployment applied successfully!"
echo ""
echo "📋 Checking deployment status..."

# Wait a moment for resources to be created
sleep 5

# Check namespace
echo "🔍 Checking namespace..."
kubectl get namespace expense-tracker

# Check deployments
echo "🔍 Checking deployments..."
kubectl get deployments -n expense-tracker

# Check pods
echo "🔍 Checking pods..."
kubectl get pods -n expense-tracker

# Check services
echo "🔍 Checking services..."
kubectl get services -n expense-tracker

# Check PVC
echo "🔍 Checking persistent volume claims..."
kubectl get pvc -n expense-tracker

# Check ingress
echo "🔍 Checking ingress..."
kubectl get ingress -n expense-tracker

echo ""
echo "🎉 Deployment completed!"
echo "📝 Use the following commands to monitor your application:"
echo "   kubectl get pods -n expense-tracker -w"
echo "   kubectl logs -f deployment/backend -n expense-tracker"
echo "   kubectl logs -f deployment/frontend -n expense-tracker"
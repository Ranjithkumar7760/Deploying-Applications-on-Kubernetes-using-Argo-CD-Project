# Expense Tracker - Kubernetes Deployment with ArgoCD

## 🚀 Deployment Architecture

This expense tracker application is deployed on AWS EKS using ArgoCD for GitOps-based continuous deployment.

### Components:
- **Frontend**: React.js application (2 replicas)
- **Backend**: Node.js API server (2 replicas)  
- **Database**: MongoDB with persistent storage
- **Ingress**: AWS ALB for external access

## 📋 Prerequisites

1. **AWS EKS Cluster** - Running and accessible
2. **ArgoCD** - Installed on the cluster
3. **AWS ECR** - Container registry for images
4. **kubectl** - Configured to access your EKS cluster
5. **Docker** - For building images

## 🛠️ Setup Instructions

### 1. Create ECR Repositories

```bash
# Create ECR repositories
aws ecr create-repository --repository-name expense-backend --region us-west-2
aws ecr create-repository --repository-name expense-frontend --region us-west-2
```

### 2. Build and Push Images

```bash
# Make the script executable
chmod +x build-and-push.sh

# Update the script with your ECR registry URL
# Edit build-and-push.sh and replace:
# - REGISTRY with your ECR URL
# - REGION with your AWS region

# Run the build script
./build-and-push.sh
```

### 3. Update Kubernetes Manifests

Update the image references in the deployment files:
- `k8s/backend-deployment.yaml` - Replace `your-registry/expense-backend:latest`
- `k8s/frontend-deployment.yaml` - Replace `your-registry/expense-frontend:latest`

### 4. Push to Git Repository

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial Kubernetes deployment"

# Add your remote repository
git remote add origin https://github.com/your-username/expense-tracker.git
git push -u origin main
```

### 5. Deploy with ArgoCD

#### Option A: Using ArgoCD UI
1. Access ArgoCD UI
2. Click "New App"
3. Fill in the application details:
   - **Application Name**: expense-tracker
   - **Project**: default
   - **Repository URL**: Your Git repository URL
   - **Path**: k8s
   - **Destination**: Your EKS cluster
   - **Namespace**: expense-tracker

#### Option B: Using kubectl
```bash
# Update argocd-application.yaml with your repository URL
kubectl apply -f argocd-application.yaml
```

### 6. Verify Deployment

```bash
# Check ArgoCD application status
kubectl get applications -n argocd

# Check pods in expense-tracker namespace
kubectl get pods -n expense-tracker

# Check services
kubectl get svc -n expense-tracker

# Check ingress
kubectl get ingress -n expense-tracker
```

## 🔧 Configuration

### Environment Variables

**Backend**:
- `MONGO_CONN_STR`: MongoDB connection string
- `PORT`: Server port (3500)

**Frontend**:
- `REACT_APP_BACKEND_URL`: Backend API URL

### Resource Limits

Each component has defined resource requests and limits:
- **MongoDB**: 256Mi-512Mi memory, 250m-500m CPU
- **Backend**: 128Mi-256Mi memory, 100m-200m CPU  
- **Frontend**: 128Mi-256Mi memory, 100m-200m CPU

## 🌐 Access the Application

### Via LoadBalancer (if using LoadBalancer service)
```bash
kubectl get svc frontend-service -n expense-tracker
# Use the EXTERNAL-IP to access the application
```

### Via Ingress (recommended for production)
1. Update `k8s/ingress.yaml` with your domain
2. Configure DNS to point to the ALB
3. Access via your domain: `https://expense-tracker.yourdomain.com`

## 🔄 GitOps Workflow

1. **Make Changes**: Update code or Kubernetes manifests
2. **Commit & Push**: Push changes to Git repository
3. **ArgoCD Sync**: ArgoCD automatically detects changes and syncs
4. **Deployment**: Application is updated in the cluster

## 📊 Monitoring

### Health Checks
- Backend has liveness and readiness probes on `/ok` endpoint
- MongoDB health is monitored by Kubernetes

### Logs
```bash
# View backend logs
kubectl logs -f deployment/backend -n expense-tracker

# View frontend logs  
kubectl logs -f deployment/frontend -n expense-tracker

# View MongoDB logs
kubectl logs -f deployment/mongodb -n expense-tracker
```

## 🔒 Security Considerations

1. **Network Policies**: Implement network policies for pod-to-pod communication
2. **RBAC**: Configure proper RBAC for ArgoCD
3. **Secrets**: Use Kubernetes secrets for sensitive data
4. **Image Security**: Scan images for vulnerabilities
5. **TLS**: Enable TLS termination at ALB/Ingress level

## 🚨 Troubleshooting

### Common Issues

1. **Image Pull Errors**
   ```bash
   # Check if ECR repositories exist and images are pushed
   aws ecr describe-repositories --region us-west-2
   ```

2. **Pod Startup Issues**
   ```bash
   # Check pod events
   kubectl describe pod <pod-name> -n expense-tracker
   ```

3. **Service Connection Issues**
   ```bash
   # Test service connectivity
   kubectl exec -it <backend-pod> -n expense-tracker -- curl mongodb-service:27017
   ```

4. **ArgoCD Sync Issues**
   ```bash
   # Check ArgoCD application status
   kubectl describe application expense-tracker -n argocd
   ```

## 📈 Scaling

### Manual Scaling
```bash
# Scale backend
kubectl scale deployment backend --replicas=3 -n expense-tracker

# Scale frontend  
kubectl scale deployment frontend --replicas=3 -n expense-tracker
```

### Auto Scaling (HPA)
```bash
# Enable HPA for backend
kubectl autoscale deployment backend --cpu-percent=70 --min=2 --max=10 -n expense-tracker
```

This setup provides a production-ready deployment of your expense tracker application with GitOps-based continuous deployment using ArgoCD.
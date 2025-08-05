# Personal Finance Tracker - Kubernetes Deployment with ArgoCD

A comprehensive three-tier web application for personal expense tracking, deployed on AWS EKS using GitOps principles with ArgoCD for continuous deployment.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React.js      │    │   Node.js       │    │   MongoDB       │
│   Frontend      │◄──►│   Backend       │◄──►│   Database      │
│   (Port 3000)   │    │   (Port 3500)   │    │   (Port 27017)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Kubernetes    │
                    │   + ArgoCD      │
                    │   GitOps        │
                    └─────────────────┘
```

## 🚀 Features

- **Modern UI**: React.js with Material-UI components and glass-morphism design
- **RESTful API**: Node.js/Express backend with comprehensive expense management
- **Database**: MongoDB for persistent data storage
- **Containerized**: Docker containers for all components
- **Kubernetes Native**: Deployed on AWS EKS with proper resource management
- **GitOps**: ArgoCD for automated deployment and synchronization
- **High Availability**: Multiple replicas with load balancing
- **Monitoring**: Health checks and resource monitoring

## 📋 Prerequisites

### Required Tools
- **AWS CLI** (configured with appropriate permissions)
- **kubectl** (Kubernetes command-line tool)
- **Docker** (for local development)
- **Git** (for version control)


### AWS Resources
- **EKS Cluster** (Kubernetes 1.24+)
- **ECR Repository** (for Docker images)

- **Application Load Balancer Controller** (for ingress)

## 🛠️ Installation Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/Ranjithkumar7760/Deploying-Applications-on-Kubernetes-using-Argo-CD-Project.git
cd Deploying-Applications-on-Kubernetes-using-Argo-CD-Project
```

### Step 2: Build and Push Docker Images
```bash
# Configure AWS CLI and login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <YOUR-ECR-REGISTRY>

# Build backend image
cd Application-Code/backend
docker build -t <YOUR-ECR-REGISTRY>:backend-latest .
docker push <YOUR-ECR-REGISTRY>:backend-latest

# Build frontend image
cd ../frontend
docker build -t <YOUR-ECR-REGISTRY>:frontend-latest .
docker push <YOUR-ECR-REGISTRY>:frontend-latest
```

### Step 3: Install EBS CSI Driver (if not already installed)
```bash
kubectl apply -k "github.com/kubernetes-sigs/aws-ebs-csi-driver/deploy/kubernetes/overlays/stable/?ref=release-1.19"
```

### Step 4: Deploy the Application

#### Option A: Direct Kubernetes Deployment
```bash
kubectl apply -f personal-finance-app.yaml
```

#### Option B: ArgoCD GitOps Deployment
```bash
# Install ArgoCD (if not already installed)
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Deploy the ArgoCD application
kubectl apply -f argocd-application.yaml
```

### Step 5: Access the Application
```bash
# Get the LoadBalancer URL
kubectl get svc frontend-service -n personal-finance-app

# Access the application
# http://<EXTERNAL-IP>
```

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD pipeline
├── Application-Code/
│   ├── backend/                # Node.js Express API
│   │   ├── models/
│   │   │   └── expense.js      # MongoDB expense schema
│   │   ├── routes/
│   │   │   └── expenses.js     # API routes for CRUD operations
│   │   ├── .dockerignore       # Docker ignore file
│   │   ├── db.js               # Database connection
│   │   ├── Dockerfile          # Backend container image
│   │   ├── index.js            # Express server setup
│   │   ├── package-lock.json   # NPM lock file
│   │   └── package.json        # Node.js dependencies
│   └── frontend/               # React.js application
│       ├── public/             # Static assets
│       │   ├── favicon.ico
│       │   ├── index.html
│       │   ├── logo192.png
│       │   ├── logo512.png
│       │   ├── manifest.json
│       │   └── robots.txt
│       ├── src/
│       │   ├── components/
│       │   │   └── CategoryIcon.js  # Category icons component
│       │   ├── services/
│       │   │   └── expenseService.js # API service layer
│       │   ├── App.css         # Styling with glass-morphism
│       │   ├── App.js          # Main React component
│       │   ├── index.css       # Global styles
│       │   └── index.js        # React entry point
│       ├── .dockerignore       # Docker ignore file
│       ├── Dockerfile          # Frontend container image
│       ├── package-lock.json   # NPM lock file
│       └── package.json        # React dependencies
├── argocd-application.yaml     # ArgoCD application configuration
├── docker-compose.yml          # Local development setup
├── personal-finance-app.yaml   # Complete Kubernetes deployment
├── README-K8S.md              # Kubernetes specific documentation
└── README.md                  # This file
```

## 🔧 Configuration

### Environment Variables

#### Backend Configuration
- `MONGO_CONN_STR`: MongoDB connection string
- `PORT`: Backend server port (default: 3500)

#### Frontend Configuration
- `REACT_APP_BACKEND_URL`: Backend API endpoint
- `NODE_OPTIONS`: Node.js memory optimization

### Resource Requirements

| Component | CPU Request | Memory Request | CPU Limit | Memory Limit |
|-----------|-------------|----------------|-----------|--------------|
| Frontend  | 500m        | 1Gi           | 1000m     | 2Gi          |
| Backend   | 100m        | 128Mi         | 200m      | 256Mi        |
| MongoDB   | 250m        | 256Mi         | 500m      | 512Mi        |

## 🎯 API Endpoints

### Expense Management
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/stats` - Get expense statistics
- `GET /api/expenses/category/:category` - Filter by category

### Health Check
- `GET /ok` - Backend health check endpoint

## 🐳 Local Development

### Using Docker Compose
```bash
# Start all services locally
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:3500
# MongoDB: localhost:27017
```

### Manual Setup
```bash
# Start MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:5.0

# Start Backend
cd Application-Code/backend
npm install
npm start

# Start Frontend
cd Application-Code/frontend
npm install
npm start
```

## 🔍 Monitoring and Troubleshooting

### Check Application Status
```bash
# Check all pods
kubectl get pods -n personal-finance-app

# Check services
kubectl get svc -n personal-finance-app

# Check ArgoCD sync status
kubectl get applications -n argocd
```

### View Logs
```bash
# Backend logs
kubectl logs -f deployment/backend -n personal-finance-app

# Frontend logs
kubectl logs -f deployment/frontend -n personal-finance-app

# MongoDB logs
kubectl logs -f deployment/mongodb -n personal-finance-app
```

### Common Issues and Solutions

#### Frontend OOMKilled
- **Issue**: Frontend pods getting killed due to memory limits
- **Solution**: Increase memory limits in `personal-finance-app.yaml`

#### EBS CSI Driver Missing
- **Issue**: PVC stuck in pending state
- **Solution**: Install EBS CSI driver as shown in Step 3

#### ArgoCD Out of Sync
- **Issue**: Application not updating after git push
- **Solution**: Check ArgoCD application status and manually sync if needed

## 🔐 Security Considerations

- **Network Policies**: Implement network segmentation
- **RBAC**: Configure proper role-based access control
- **Secrets Management**: Use Kubernetes secrets for sensitive data
- **Image Security**: Scan container images for vulnerabilities
- **TLS**: Enable HTTPS with proper certificates

## 🚀 Production Deployment

### Recommended Enhancements
1. **Persistent Storage**: Replace EmptyDir with EBS volumes for MongoDB
2. **Ingress Controller**: Configure ALB ingress with custom domain
3. **Monitoring**: Add Prometheus and Grafana for metrics
4. **Logging**: Implement centralized logging with ELK stack
5. **Backup**: Set up automated MongoDB backups
6. **Auto-scaling**: Configure HPA for dynamic scaling

### Performance Optimization
- Enable resource quotas and limits
- Implement caching strategies
- Use CDN for static assets
- Optimize database queries and indexing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Ranjith Kumar** - *Initial work* - [GitHub Profile](https://github.com/Ranjithkumar7760)

## 🙏 Acknowledgments

- AWS EKS team for excellent Kubernetes service
- ArgoCD community for GitOps best practices
- React and Node.js communities for robust frameworks
- MongoDB team for reliable database solution

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review AWS EKS and ArgoCD documentation

---

**Happy Coding! 🚀💰**
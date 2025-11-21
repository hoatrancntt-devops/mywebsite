pipeline {
    agent any
    environment {
        // User Docker Hub chính xác của bạn
        DOCKER_USER = 'hoatrancntt'
        DOCKER_CRED = 'docker-hub-login'
        K8S_CRED    = 'kubeconfig-k8s' 
    }
    stages {
        stage('1. Lấy Code') {
            steps { checkout scm }
        }
        stage('2. Build & Push Docker') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CRED) {
                        // Build & Push Backend
                        sh "docker build -t ${DOCKER_USER}/mywebsite-backend:latest ./backend"
                        sh "docker push ${DOCKER_USER}/mywebsite-backend:latest"
                        
                        // Build & Push Frontend
                        sh "docker build -t ${DOCKER_USER}/mywebsite-frontend:latest ./frontend"
                        sh "docker push ${DOCKER_USER}/mywebsite-frontend:latest"
                    }
                }
            }
        }
        stage('3. Deploy to K8s') {
            steps {
                withKubeConfig([credentialsId: K8S_CRED]) {
                    // Jenkins sẽ chạy tất cả file trong thư mục k8s (01, 02, 03...)
                    sh "kubectl apply -f k8s/"
                    
                    // Restart deployment để nhận image mới
                    sh "kubectl rollout restart deployment/backend -n mywebsite-prod"
                    sh "kubectl rollout restart deployment/frontend -n mywebsite-prod"
                }
            }
        }
    }
}

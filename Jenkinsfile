pipeline {
    agent any
    stages {
        stage('Build Frontend') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}
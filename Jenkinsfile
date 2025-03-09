pipeline {
    agent any

    environment {
        PATH = "C:\\Program Files\\nodejs;${env.PATH}"
    }

    stage('Install Dependencies') {
    steps {
        bat 'npm install'
    }
}

    stages {
        stage('Checkout Código') {
            steps {
            git branch: 'main', url: 'https://github.com/jalfaro16/Playwright.git'
    }
}

        stage('Ejecutar Pruebas') {
            steps {
                bat 'npx playwright test --project=firefox'
            }
        }

        stage('Publicar Reporte de Playwright') {
            steps {
                echo "Publicando Reporte..."
            }
        }
    }
}


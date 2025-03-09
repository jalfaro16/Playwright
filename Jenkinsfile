pipeline {
    apipeline {
    agent any

    environment {
        PATH = "C:\\Program Files\\nodejs;${env.PATH}"
    }

    stages {
        stage('Checkout Código') {
            steps {
                git 'https://github.com/jalfaro16/Playwright.git'
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

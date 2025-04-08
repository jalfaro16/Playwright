pipeline {
    agent any

    environment {
        PATH = "C:\\Program Files\\nodejs;${env.PATH}"
    }

    

    stages {
        stage('Checkout Código') {
            steps {
            git branch: 'main', url: 'https://github.com/jalfaro16/Playwright.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
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
                bat 'npx playwright show-report'
            }
        }
    }
}


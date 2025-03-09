pipeline {
    agent any

    environment {
        NODE_VERSION = '22.13.1'  // Ajusta según tu versión de Node.js
    }

    stages {
        stage('Checkout Código') {
            steps {
                git branch: 'main', url: 'https://github.com/jalfaro16/Playwright.git'
            }
        }

        stage('Instalar Node.js y Dependencias') {
            steps {
                script {
                    def nodeHome = tool name: 'NodeJS', type: 'NodeJSInstallation'
                    env.PATH = "${nodeHome}\\bin;${env.PATH}"

                }
                bat 'node -v'   // Verifica versión de Node.js
                bat 'npm ci'    // Instala dependencias del proyecto
            }
        }
        
        stage('Instalar Playwright') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }
        
        stage('Ejecutar Pruebas') {
            steps {
                bat 'npx playwright test --project=firefox'
            }
        }

        stage('Publicar Reporte de Playwright') {
            steps {
                bat 'npx playwright show-report'
            }
        }
    }
}

pipeline {
    agent any

    environment {
        PATH = "C:\\Program Files\\nodejs;${env.PATH}"
    }
    stages {
        stage('Verificar Instalación') {
            steps {
                bat 'where node'
                bat 'node -v'
                bat 'npm -v'
            }
        }


    stages {
        stage('Checkout Código') {
            steps {
                git branch: 'main', url: 'https://github.com/jalfaro16/Playwright.git'
            }
        }

       /* stage('Instalar Node.js y Dependencias') {
            steps {
                script {
                    def nodeHome = tool name: 'NodeJS', type: 'NodeJSInstallation'
                    env.PATH = "${nodeHome}\\bin;${env.PATH}"

                }
                bat 'node -v'   // Verifica versión de Node.js
                bat 'npm ci'    // Instala dependencias del proyecto
            }
        }
        */
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

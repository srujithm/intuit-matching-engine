pipeline {
    agent any

    stages {
        stage('install') {
            steps {
                script {
                    currentBuild.displayName = BRANCH_NAME
                    def packageJSON = readJSON file: 'package.json'
                    VERSION = packageJSON.version

                    // install packages
                    sh "npm ci"
                }
            }
        }

        stage('test') {
            steps {
                script {
                    sh "npm test -- --coverage --watchAll=false"
                }
            }
        }

        // can add stage for linting here

        stage('audit') {
            steps {
                script {
                    sh "npm audit --production"
                }
            }
        }

        // can also use packer + ansible (separate this  to different job which can be triggered as child job)
        stage('build docker image') {
            steps {
                script {
                    dockerImage = docker.build("smallidi/intuit-matching-engine:${VERSION}_${env.BUILD_NUMBER}")
                }
            }
        }

        stage('image upload') {
            steps {
                script {
                    docker.withRegistry('https://registry.example.com', 'docker-hub-credentials') {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }
}

// deploy to dev environment
// deploy to qa environment, run qa tests here
// deploy to staging
// deploy to prod

// deployment using terraform 
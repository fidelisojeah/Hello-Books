node{
  checkout scm
  try{
    sh 'docker stop $(docker ps -aq)'
    sh 'docker rm $(docker ps -aq)'
  }catch(e){
    sh 'echo "That Failed But all is OK! anyways"'
  }
  env.npm_config_cache = 'npm-cache'
  env.CI = 'true'
  env.NODE_ENV = 'test'
  env.JSONWEB_SECRET = credentials('jenkins-json-secret')
  env.COOKIE_SECRET_KEY = credentials('jenkins-cookie-secret')
  env.SESSION_SECRET_KEY = credentials('jenkins-cookie-secret')
  env.EMAIL_HOST = 'smtp.ethereal.email'
  env.EMAIL_PORT = 587
  env.EMAIL_USER = credentials('jenkins-ethereal-email')
  env.EMAIL_PASSWORD = credentials('jenkins-ethereal-password')
  env.APP_URL = 'http://localhost:3000'
  
  docker.image('postgres:9.6.2-alpine').withRun('-p 5432:5432 -P --name db -e POSTGRES_USER=usrhello -e POSTGRES_DB=dbhellobooks_test -e POSTGRES_PASSWORD=HelloBooksPassword$') { db ->
    docker.image('postgres:9.6.2-alpine').inside('--link db:db') {
        /* Wait until postgres service is up */
        sh 'echo "Loading postgres server"'
        sh 'ip addr show'
    }
    docker.image('node:9.8.0').inside('--link db:db -u root:root'){
      stage 'Setup Images'
        sh 'ip addr show'
        sh 'ping -c 4 172.17.0.2'
        sh 'echo "Loading Node"'
      stage 'Build'
        sh 'npm install'
        sh 'npm run pretest'
      stage 'Tests'
        withEnv(["MOCHA_FILE=./jenkins-test-results.xml"]) {
          sh './node_modules/.bin/mocha test/index.js --reporter mocha-junit-reporter --compilers js:babel-core/register'
        }
        junit 'jenkins-test-results.xml'
    }
  }
}

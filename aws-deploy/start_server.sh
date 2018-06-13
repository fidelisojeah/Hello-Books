# aws-deploy/start_server
#!/bin/bash
source /home/ec2-user/.bash_profile
cd /home/ec2-user/hello-books
pm2 start /home/ec2-user/hello-books/server/index.js --interpreter /home/ec2-user/hello-books/node_modules/.bin/babel-node --name "Hello-Books"
sudo service nginx start

# aws-deploy/start_server
#!/bin/bash
source /home/ec2-user/.bash_profile
cd /home/ec2-user/hello-books/Hello-Books
pm2 start server/index.js --interpreter ./node_modules/.bin/babel-node --name "Hello-Books"
sudo service nginx start

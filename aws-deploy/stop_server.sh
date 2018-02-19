# deploy/stop_server
#!/bin/bash
source /home/ec2-user/.bash_profile
cd /home/ec2-user/hello-books/Hello-Books
pm2 stop all
sudo service nginx stop

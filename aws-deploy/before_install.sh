# aws-deploy/before_install
#!/bin/bash
source /home/ec2-user/.bash_profile

sudo rm -r /home/ec2-user/hello-books/dist

export NODE_ENV=production

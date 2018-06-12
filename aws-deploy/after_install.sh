# aws-deploy/after_install
#!/bin/bash
source /home/ec2-user/.bash_profile
cd /home/ec2-user/hello-books

npm install
npm install pm2 -g
npm update request --depth 8

chmod a+x /home/ec2-user/local-configuration/deploy.sh

/bin/bash /home/ec2-user/local-configuration/deploy.sh

npm run build:webpack
npm run build:docs

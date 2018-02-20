# aws-deploy/after_install
#!/bin/bash
source /home/ec2-user/.bash_profile
cd /home/ec2-user/hello-books

npm install

npm install pm2 -g

npm run build:webpack
npm run build:docs

chmod a+x /home/ec2-user/local-configurations/deploy.sh

/bin/bash /home/ec2-user/local-configurations/deploy.sh

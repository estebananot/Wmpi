#!/bin/bash
yum update -y
yum install -y docker git
systemctl start docker
systemctl enable docker
usermod -aG docker ec2-user

# Install docker-compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Clone repo
cd /home/ec2-user
git clone https://github.com/estebananot/Wmpi.git app
cd app

# Build backend first
cd backend
npm install
npm run build
cd ..

# Run with docker-compose
docker-compose -f docker-compose.prod.yml up -d --build

chown -R ec2-user:ec2-user /home/ec2-user/app

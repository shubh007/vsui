# README #

### What is this repository for? ###

* Quick summary : Service is responsible for shop creation and management
* Version : 0.1

### How do I get set up? ###


### Setup
$HOME/znoLogins/pems chmod 400 *

sudo apt-get update
sudo apt-get upgrade

### Login to host
ssh -o IdentitiesOnly=yes -i $HOME/znoLogins/pems/vsui.pem ubuntu@16.171.38.47

### Config structure
mkdir -p /home/ubuntu/deployment/vsui/code/vsui

### Ip and port
host: 16.171.38.47 , port : 7600

sudo apt update
sudo apt install nginx

systemctl status nginx

sudo nginx -t
sudo nginx -s reload

sudo apt install npm

cd /etc/nginx/conf.d
   sudo touch vsui.conf
   sudo vi vsui.conf
    server{
        listen 80;
        listen [::]:80; 
        server_name www.varshasingh.app varshasingh.app www.varsha.love varsha.love www.varshasingh.love varshasingh.love;
        location / {
                proxy_pass http://localhost:8080/;

        }
    }
cd /etc/nginx/conf.d
sudo vi vsui.conf
client_max_body_size 15M;


sudo nginx -t
sudo nginx -s reload    

sudo npm install --global http-server

sudo lsof -i:8080


npm install bootstrap


npm install ngx-image-cropper --save
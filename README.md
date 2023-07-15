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
mkdir -p zno/vsui/deployment/lib/ zno/vsui/deployment/bin/ zno/vsui/deployment/config/ zno/vsui/deployment/logs/

### Ip and port
host: 16.171.38.47 , port : 4200

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

sudo nginx -t
sudo nginx -s reload
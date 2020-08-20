

# Configure Nginx as a web server and reverse proxy for Nodejs application

Nginx server block should look something like this:-

     server {
        listen 80;
        server_name your_domain.com;
        location / {
            proxy_pass http://private_ip_address:8080;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }



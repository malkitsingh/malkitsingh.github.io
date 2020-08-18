

# Install & config NGINX with Virtual Hosts

## Step 1 – Installing Nginx
Because Nginx is available in Ubuntu’s default repositories, it is possible to install it from these repositories using the `apt` packaging system.

     sudo apt-get update
     sudo apt install -y nginx

## Step 2 – Checking your Web Server
At the end of the installation process, Ubuntu 18.04 starts Nginx. The web server should already be up and running.

We can check with the `systemd` init system to make sure the service is running by typing:

    systemctl status nginx

## Step 3 — Managing the Nginx Process
Now that you have your web server up and running, let’s review some basic management commands.

To stop your web server, type:
    
    sudo systemctl stop nginx

To start the web server when it is stopped, type:
    
    sudo systemctl start nginx

To stop and then start the service again, type:
    
    sudo systemctl restart nginx

If you are simply making configuration changes, Nginx can often reload without dropping connections. To do this, type:
    
    sudo systemctl reload nginx

By default, Nginx is configured to start automatically when the server boots. If this is not what you want, you can disable this behavior by typing:
    
    sudo systemctl disable nginx

To re-enable the service to start up at boot, you can type:
    
    sudo systemctl enable nginx

## Step 4 — Setting Up Server Blocks (Recommended)
When using the Nginx web server, server blocks (similar to virtual hosts in Apache) can be used to encapsulate configuration details and host more than one domain from a single server. We will set up a domain called *example.com*, but you should replace this with your own *domain name*.

Create the directory for example.com as follows, using the -p flag to create any necessary parent directories:
    
    sudo mkdir -p /var/www/example.com/html

Next, assign ownership of the directory with the $USER environment variable:

    sudo chown -R $USER:$USER /var/www/example.com/html

The permissions of your web roots should be correct if you haven’t modified your umask value, but you can make sure by typing:

    sudo chmod -R 755 /var/www/example.com

Next, create a sample index.html page using nano or your favorite editor:

    nano /var/www/example.com/html/index.html

In order for Nginx to serve this content, it’s necessary to create a server block with the correct directives. Instead of modifying the default configuration file directly, let’s make a new one at /etc/nginx/sites-available/example.com

    sudo nano /etc/nginx/sites-available/example.com

Paste in the following configuration block, which is similar to the default, but updated for our new directory and domain name:

    server {
        listen 80;
        listen [::]:80;

        root /var/www/example.com/html;
        index index.html index.htm index.nginx-debian.html;

        server_name example.com www.example.com;

        location / {
                try_files $uri $uri/ =404;
        }
    }

Next, let’s enable the file by creating a link from it to the sites-enabled directory, which Nginx reads from during startup:

    sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/

Next, test to make sure that there are no syntax errors in any of your Nginx files:

    sudo nginx -t

If there aren’t any problems, restart Nginx to enable your changes:

    sudo systemctl restart nginx

## Step 5 — Logs location 
* `/var/log/nginx/access.log` : Every request to your web server is recorded in this log file unless Nginx is configured to do otherwise.
* `/var/log/nginx/error.log` : Any Nginx errors will be recorded in this log.


# Install & config ODOO CRM with NGINX with Virtual Hosts

## Step 1: Update Ubuntu system
Start by updating your Ubuntu Linux.

     sudo apt-get update
     sudo apt -y upgrade

A reboot is necessary after an upgrade.

    sudo reboot

## Step 2: Install PostgreSQL Database
Odoo recommends using PostgreSQL database server for data storage, install PostgreSQL database server on Ubuntu:

## Step 3: Install wkhtmltopdf
wkhtmltopdf is required for printing reports as it does the conversion of html to pdf. The recommended version of wkhtmltopdf to install is 0.12.5 and is available on the wkhtmltopdf download page, in the archive section.

Download the package using the following wget command:
  
    wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.5/wkhtmltox_0.12.5-1.bionic_amd64.deb

Once the download is complete, install the package by typing:

    sudo apt install ./wkhtmltox_0.12.5-1.bionic_amd64.deb

## Step 4: Install Odoo 13 on Ubuntu 20.04/18.04 LTS
Add Odoo deb repository so that you can install Odoo 13 on Ubuntu 18.04.

    wget -O - https://nightly.odoo.com/odoo.key | sudo apt-key add -
    echo "deb http://nightly.odoo.com/13.0/nightly/deb/ ./" | sudo tee /etc/apt/sources.list.d/odoo.list

Update Apt cache and install Odoo 13 on Ubuntu 18.04.

    sudo apt update
    sudo apt install odoo

The service is started automatically after the installation of Odoo on Ubuntu 18.04 Linux.

Set the service to start on every system reboot.

    sudo systemctl enable --now odoo

The service is started on port 8069. This can be confirmed using the command below.
    
    ss -tunelp | grep 8069

## Step 5: Configure Nginx Proxy for Odoo 13

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



https://computingforgeeks.com/how-to-install-odoo-on-ubuntu-linux/
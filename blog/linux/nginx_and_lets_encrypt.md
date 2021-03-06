

# Secure Nginx with Let's Encrypt

## Step 1 – Installing Certbot
Certbot is in very active development, so the Certbot packages provided by Ubuntu tend to be outdated. However, the Certbot developers maintain a Ubuntu software repository with up-to-date versions, so we’ll use that repository instead.

First, add the repository.

     sudo add-apt-repository ppa:certbot/certbot
You’ll need to press `ENTER` to accept. Then, update the package list to pick up the new repository’s package information.

    sudo apt-get update

And finally, install Certbot’s Nginx package with `apt-get`.

    sudo apt-get install -y python-certbot-nginx


# Ubuntu 20 updates

Above mentioned steps work well with Ubuntu 18 but on Ubuntu 20 there are slight changes in the commands and here's how one can install the certbot on Ubuntu 20

    sudo apt install certbot python3-certbot-apache  # for apache
    sudo apt install certbot python3-certbot-nginx   # for nginx

## Step 2 – Obtaining an SSL Certificate
Certbot provides a variety of ways to obtain SSL certificates, through various plugins. The Nginx plugin will take care of reconfiguring Nginx and reloading the config whenever necessary:

    sudo certbot --nginx -d example.com -d www.example.com

This runs certbot with the `--nginx` plugin, using `-d` to specify the names we’d like the certificate to be valid for.

# Ubuntu 20 updates

Once certbot is installed, this is how we can obtain a SSL certificate

    sudo certbot --apache # for apache
    sudo certbot --nginx # for nginx

## Step 3 — Verifying Certbot Auto-Renewal
Let’s Encrypt’s certificates are only valid for ninety days. This is to encourage users to automate their certificate renewal process. The `certbot` package we installed takes care of this for us by running ‘certbot renew’ twice a day via a systemd timer. On non-systemd distributions this functionality is provided by a script placed in `/etc/cron.d`. This task runs twice a day and will renew any certificate that’s within thirty days of expiration.

To test the renewal process, you can do a dry run with `certbot`:
    
    sudo certbot renew --dry-run



https://gist.github.com/hypervtechnics/9cb28e67aea93cb9b87af5141bc3aa25


# Ubuntu 20 updates

To check the status of this service and make sure it’s active and running, you can use:

    sudo systemctl status certbot.timer

To test the renewal process, you can do a dry run with `certbot`:

    sudo certbot renew --dry-run
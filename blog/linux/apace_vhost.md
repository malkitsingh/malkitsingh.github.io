

# How To Set Up Apache Virtual Hosts on Ubuntu

## Prerequisites
You will also need to have Apache installed in order to work through these steps. If you haven’t already done so, you can get Apache installed on your server through the `apt` package manner:

    sudo apt update
    sudo apt install apache2
## Step One — Create the Directory Structure
Our  `document root`  (the top-level directory that Apache looks at to find content to serve) will be set to individual directories under the  `/var/www`  directory. We will create a directory here for both of the virtual hosts we plan on making.

Within each of  _these_  directories, we will create a  `public_html`  folder that will hold our actual files. This gives us some flexibility in our hosting.

For instance, for our sites, we’re going to make our directories as follows. If you are using actual domains or alternate values, swap out the highlighted text for these.

     sudo mkdir -p /var/www/example.com/public_html
     sudo mkdir -p /var/www/test.com/public_html
## Step Two — Grant Permissions
Now we have the directory structure for our files, but they are owned by our root user. If we want our regular user to be able to modify files in our web directories, we can change the ownership by doing this:

    sudo chown -R $USER:$USER /var/www/example.com/public_html
    sudo chown -R $USER:$USER /var/www/test.com/public_html

The  `$USER`  variable will take the value of the user you are currently logged in as when you press  `ENTER`. By doing this, our regular user now owns the  `public_html`  subdirectories where we will be storing our content.

We should also modify our permissions to ensure that read access is permitted to the general web directory and all of the files and folders it contains so that pages can be served correctly:

    sudo chmod -R 755 /var/www
## Step Three — Create Demo Pages for Each Virtual Host
We now have our directory structure in place. Let’s create some content to serve.

For demonstration purposes, we’ll make an  `index.html`  page for each site.

Let’s begin with  `example.com`. We can open up an  `index.html`  file in a text editor, in this case we’ll use nano:

    nano /var/www/example.com/public_html/index.html


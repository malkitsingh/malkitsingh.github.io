

# How To Install and Use Docker on Ubuntu

## Step 1 — Installing Docker

First, update your existing list of packages:

    sudo apt update

Next, install a few prerequisite packages which let apt use packages over HTTPS:

    sudo apt install apt-transport-https ca-certificates curl software-properties-common

Then add the GPG key for the official Docker repository to your system:

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

Add the Docker repository to APT sources:

    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

Next, update the package database with the Docker packages from the newly added repo:

    sudo apt update

Make sure you are about to install from the Docker repo instead of the default Ubuntu repo:
    
    apt-cache policy docker-ce

Finally, install Docker:

    sudo apt install docker-ce

Docker should now be installed, the daemon started, and the process enabled to start on boot. Check that it’s running:

    sudo systemctl status docker


## Step 2 — Executing the Docker Command Without Sudo (Optional)

By default, the `docker` command can only be run the **root** user or by a user in the **docker** group, which is automatically created during Docker’s installation process. If you attempt to run the `docker` command without prefixing it with `sudo` or without being in the **docker** group, you’ll get an output like this:

    docker: Cannot connect to the Docker daemon. Is the docker daemon running on this host?.
See 'docker run --help'.


If you want to avoid typing `sudo` whenever you run the `docker` command, add your username to the `docker` group:

    sudo usermod -aG docker ${USER}

To apply the new group membership, log out of the server and back in, or type the following:

    su - ${USER}

You will be prompted to enter your user’s password to continue.
Confirm that your user is now added to the docker group by typing:
    
    id -nG
    **Output**
    sammy sudo docker

If you need to add a user to the docker group that you’re not logged in as, declare that username explicitly using:

    sudo usermod -aG docker username

